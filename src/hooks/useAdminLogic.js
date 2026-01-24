import { useState, useEffect } from 'react';
import { db, auth } from '../config/firebase'; 
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc, query, orderBy } from 'firebase/firestore'; 
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

// === CONFIGURATION ===
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; 
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const useAdminLogic = () => {
  const [user, setUser] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: '', issuer: '', date: '', tags: '',
    imageFile: null, previewUrl: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) fetchCertificates();
    });
    return () => unsubscribe();
  }, []);

  const fetchCertificates = async () => {
    const q = query(collection(db, "certificates"), orderBy("createdAt", "asc"));
    const querySnapshot = await getDocs(q);
    setCertificates(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Login Failed: " + error.message);
    }
  };

  const handleLogout = () => signOut(auth);

  // Helper: Cloudinary Upload
  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: "POST", body: data });
    const json = await res.json();
    return json.secure_url;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file, previewUrl: URL.createObjectURL(file) }));
    }
  };

  const startEditing = (cert) => {
    setFormData({
      title: cert.title,
      issuer: cert.issuer,
      date: cert.date,
      tags: cert.tags.join(', '),
      previewUrl: cert.image,
      imageFile: null
    });
    setEditingId(cert.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditing = () => {
    setFormData({ title: '', issuer: '', date: '', tags: '', imageFile: null, previewUrl: '' });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, issuer, date, tags, imageFile, previewUrl } = formData;
    
    if ((!imageFile && !previewUrl) || !title || !issuer) return alert("Please fill all fields");

    setLoading(true);
    try {
      let finalImageUrl = previewUrl;
      if (imageFile) finalImageUrl = await uploadToCloudinary(imageFile);

      const certData = {
        title, issuer, date,
        tags: tags.split(',').map(tag => tag.trim()), 
        image: finalImageUrl, 
      };

      if (editingId) {
        await updateDoc(doc(db, "certificates", editingId), certData);
        alert("Updated!");
        setEditingId(null);
      } else {
        await addDoc(collection(db, "certificates"), { ...certData, createdAt: new Date() });
        alert("Added!");
      }

      // Reset Form
      setFormData({ title: '', issuer: '', date: '', tags: '', imageFile: null, previewUrl: '' });
      fetchCertificates(); 

    } catch (error) {
      console.error(error);
      alert("Error saving data");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this certificate?")) {
      await deleteDoc(doc(db, "certificates", id));
      setCertificates(prev => prev.filter(c => c.id !== id));
    }
  };

  return {
    user, email, setEmail, password, setPassword, handleLogin, handleLogout,
    certificates, loading, formData, setFormData, handleFileChange,
    handleSubmit, startEditing, cancelEditing, handleDelete, editingId
  };
};