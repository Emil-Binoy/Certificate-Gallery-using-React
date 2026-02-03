import React from 'react';
import { Upload, Loader2, XCircle, LogOut } from 'lucide-react';

const CertificateForm = ({ 
  formData, setFormData, handleSubmit, handleFileChange, 
  loading, editingId, cancelEditing, handleLogout 
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{editingId ? "Edit Certificate" : "Add Certificate"}</h1>
        {editingId ? (
          <button onClick={cancelEditing} className="flex items-center gap-2 bg-gray-700 text-gray-300 px-3 py-1.5 rounded hover:bg-gray-600 transition text-sm">
            <XCircle size={16} /> Cancel
          </button>
        ) : (
          <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600/20 text-red-400 px-3 py-1.5 rounded hover:bg-red-600/30 transition text-sm">
            <LogOut size={16} /> Logout
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className={`p-6 rounded-2xl border shadow-xl space-y-4 transition-colors ${editingId ? 'bg-blue-900/20 border-blue-500/50' : 'bg-gray-800 border-gray-700'}`}>
        <div>
          <label className="block text-gray-400 mb-1 text-sm">Title</label>
          <input 
            value={formData.title} 
            onChange={e => setFormData({ ...formData, title: e.target.value })} 
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2" 
            placeholder="React Mastery" required 
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 mb-1 text-sm">Issuer</label>
            <input 
              value={formData.issuer} 
              onChange={e => setFormData({ ...formData, issuer: e.target.value })} 
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2" 
              placeholder="Udemy" required 
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1 text-sm">Date</label>
            <input 
              type="text" value={formData.date} 
              onChange={e => setFormData({ ...formData, date: e.target.value })} 
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2" 
              placeholder="2024" required 
            />
          </div>
        </div>

        {/* PRIORITY ORDER INPUT */}
        <div>
          <label className="block text-gray-400 mb-1 text-sm">
             Display Priority (1 = Top, Empty = Bottom)
          </label>
          <input 
            type="number" 
            value={formData.order} 
            onChange={e => setFormData({ ...formData, order: e.target.value })} 
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 focus:border-yellow-500 transition-colors" 
            placeholder="e.g. 1 for Top Priority" 
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-1 text-sm">Tags</label>
          <input 
            value={formData.tags} 
            onChange={e => setFormData({ ...formData, tags: e.target.value })} 
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2" 
            placeholder="Design, Tech" 
          />
        </div>

        {/* File Upload Area */}
        <div>
          <label className="block text-gray-400 mb-1 text-sm">Certificate Image</label>
          <div className="border-2 border-dashed border-gray-600 rounded-xl p-4 text-center hover:border-blue-500 transition-colors relative bg-gray-900/50">
            <input 
              type="file" 
              onChange={handleFileChange} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              accept="image/*" 
            />
            <div className="flex flex-col items-center gap-2">
              {formData.previewUrl ? (
                <img src={formData.previewUrl} alt="Preview" className="h-32 object-contain rounded shadow-lg" />
              ) : (
                <>
                  <Upload size={24} className="text-gray-400" />
                  <p className="text-xs text-gray-400">Click to upload image</p>
                </>
              )}
            </div>
          </div>
        </div>

        <button disabled={loading} type="submit" className={`w-full text-white py-3 rounded-xl font-bold transition-all flex justify-center items-center gap-2 ${editingId ? 'bg-green-600 hover:bg-green-500' : 'bg-blue-600 hover:bg-blue-500'}`}>
          {loading ? <Loader2 className="animate-spin" /> : (editingId ? "Update Certificate" : "Save Certificate")}
        </button>
      </form>
    </div>
  );
};

export default CertificateForm;