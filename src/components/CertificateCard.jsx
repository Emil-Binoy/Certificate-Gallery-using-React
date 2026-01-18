import React from 'react'
import { Eye, Download } from 'lucide-react';
import { downloadImage } from '../utils/downloadFunction';

const CertificateCard = ({certificate, onClick}) => {
  const handleDownload = (e) => {
    e.stopPropagation();
    downloadImage(certificate.image, certificate.title); // <--- ONE LINE CALL
  };
  return (
    <div 
      className='group relative bg-gray-900/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/20 hover:border-blue-500/30 transition-all duration-500 ease-out'
      onClick={onClick}
    >
      <div className="aspect-4/3 w-full overflow-hidden relative p-3 z-10 ">
        <img 
          src={certificate.image} 
          alt={certificate.title}
          className='w-full h-full rounded-t-lg  object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500' 
        />
        <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
      </div>
        <div className='absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-gray-900 via-gray-900/80 to-transparent translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20'>
            <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{certificate.title}</h3>
        <p className="text-gray-300 text-sm font-medium mb-4">Issuer: <span className="text-blue-200">{certificate.issuer}</span></p>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors">
            <Eye size={14} /> View
          </button>
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
            <Download size={14} /> Save
          </button>
        </div>
        </div>
    </div>
  )
}

export default CertificateCard