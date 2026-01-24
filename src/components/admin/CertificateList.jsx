import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const CertificateList = ({ certificates, startEditing, handleDelete, editingId }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Gallery</h2>
      <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
        {certificates.map(cert => (
          <div key={cert.id} className={`p-4 rounded-xl border flex gap-4 items-center group transition-colors ${editingId === cert.id ? 'bg-blue-900/20 border-blue-500' : 'bg-gray-800 border-gray-700 hover:border-blue-500/50'}`}>
            <div className="w-16 h-12 bg-black/50 rounded overflow-hidden shrink-0">
              <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white truncate">{cert.title}</h3>
              <p className="text-sm text-gray-400 truncate">{cert.issuer}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEditing(cert)} className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg">
                <Edit2 size={18} />
              </button>
              <button onClick={() => handleDelete(cert.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificateList;