import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase'; 
import { collection, getDocs, query, orderBy } from 'firebase/firestore'; 
import CertificateCard from './CertificateCard';
import CertificateDetails from './CertificateDetails/CertificateDetails'; // Import Modal Here
import SkeletonLoader from './SkeletonLoader';

const Gallery = () => {
  const [certificates, setCertificates] = useState([]); 
  const [loading, setLoading] = useState(true);
  
  // State for the modal (Moved from App.jsx)
  const [selectedCert, setSelectedCert] = useState(null);

  // Fetch Data from Firebase
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        // CHANGED: Create a query that sorts by 'createdAt' in ascending order
        const q = query(collection(db, "certificates"), orderBy("createdAt", "asc"));
        
        const querySnapshot = await getDocs(q); // Fetch using the query 'q'
        const certsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCertificates(certsData);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const title = "Certificate Gallery";

  if (loading) return <SkeletonLoader />;

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed relative font-sans antialiased"
      style={{ backgroundImage: "url('/images/bg-pattern.png')" }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-gray-900/30 via-gray-900/90 to-gray-950/95"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4 drop-shadow-lg cursor-default flex flex-wrap justify-center gap-4">
            {/* 1. Split by words first to keep them together */}
            {title.split(" ").map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block whitespace-nowrap">
                {/* 2. Then split each word into characters for the hover effect */}
                {word.split("").map((char, charIndex) => (
                  <span
                    key={charIndex}
                    className="inline-block transition-transform duration-200 hover:scale-125 hover:text-blue-400"
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h1>
        </header>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          {certificates.map(certificate => (
            <CertificateCard 
              key={certificate.id} 
              certificate={certificate}
              onClick={() => setSelectedCert(certificate)} // Set state directly
            />
          ))}
        </div>
      </div>

      {/* Render Modal if a certificate is selected */}
      {selectedCert && (
        <CertificateDetails 
          certificate={selectedCert}
          certificates={certificates} // Pass the LIVE data from Firebase
          onClose={() => setSelectedCert(null)}
          onChange={setSelectedCert}
        />
      )}
    </div>
  )
}

export default Gallery;