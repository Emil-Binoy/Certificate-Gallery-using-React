import React from 'react';
import { useAdminLogic } from '../hooks/useAdminLogic';
import AdminLoginForm from './admin/AdminLoginForm';
import CertificateForm from './admin/CertificateForm';
import CertificateList from './admin/CertificateList';

const AdminPanel = () => {
  const {
    user, email, setEmail, password, setPassword, handleLogin, handleLogout,
    certificates, loading, formData, setFormData, handleFileChange,
    handleSubmit, startEditing, cancelEditing, handleDelete, editingId
  } = useAdminLogic();

  if (!user) {
    return (
      <AdminLoginForm 
        handleLogin={handleLogin} 
        email={email} setEmail={setEmail} 
        password={password} setPassword={setPassword} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Form */}
        <CertificateForm 
          formData={formData} setFormData={setFormData}
          handleSubmit={handleSubmit} handleFileChange={handleFileChange}
          loading={loading} editingId={editingId}
          cancelEditing={cancelEditing} handleLogout={handleLogout}
        />

        {/* Right Column: List */}
        <CertificateList 
          certificates={certificates}
          startEditing={startEditing}
          handleDelete={handleDelete}
          editingId={editingId}
        />

      </div>
    </div>
  );
};

export default AdminPanel;