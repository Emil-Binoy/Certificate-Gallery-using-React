import React, { useState } from 'react';
import { X, Award, Calendar, Tag, Download, Share2 } from 'lucide-react';
import { downloadImage } from '../../utils/downloadFunction'; 
import { shareCertificate } from '../../utils/shareImg'; 

const MetaPanel = ({ certificate, onClose }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleDownload = (e) => {
    e.stopPropagation();
    downloadImage(certificate.image, certificate.title);
  };

  const handleShare = async () => {
    const result = await shareCertificate(certificate);
    if (result === 'copied') {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="w-full flex-1 md:h-full md:w-80 lg:w-96 bg-[#1e293b] border-t md:border-t-0 md:border-l border-gray-700/50 flex flex-col z-30 transition-all duration-300 min-h-0">
      
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-700/50 flex justify-between items-start">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-white leading-tight mb-1">{certificate.title}</h2>
          <p className="text-xs md:text-sm text-blue-400 font-medium">Verified Certificate</p>
        </div>
        <button onClick={onClose} className="hidden md:block text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors">
          <X size={24} />
        </button>
      </div>

      {/* Details List */}
      <div className="flex-1 p-4 md:p-6 space-y-4 md:space-y-6 overflow-y-auto custom-scrollbar">
        <div className="space-y-1 md:space-y-2">
          <div className="flex items-center gap-2 text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <Award size={12} className="md:w-3.5 md:h-3.5" /> Issuer
          </div>
          <p className="text-gray-200 font-medium text-base md:text-lg">{certificate.issuer}</p>
        </div>

        <div className="space-y-1 md:space-y-2">
          <div className="flex items-center gap-2 text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <Calendar size={12} className="md:w-3.5 md:h-3.5" /> Date Issued
          </div>
          <p className="text-gray-200 font-medium text-sm md:text-base">{certificate.date}</p>
        </div>

        <div className="space-y-1 md:space-y-2">
          <div className="flex items-center gap-2 text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <Tag size={12} className="md:w-3.5 md:h-3.5" /> Tags
          </div>
          <div className="flex flex-wrap gap-2">
            {certificate.tags && certificate.tags.map(tag => (
              <span key={tag} className="px-2 py-1 md:px-3 md:py-1 bg-blue-500/10 text-blue-300 text-[10px] md:text-xs font-medium rounded-full border border-blue-500/20">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 md:p-6 border-t border-gray-700/50 bg-[#1e293b] space-y-3">
        <button onClick={handleDownload} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-2.5 md:py-3 rounded-xl font-semibold transition-all shadow-lg shadow-blue-900/20 text-sm md:text-base">
          <Download size={16} className="md:w-5 md:h-5" />
          Download
        </button>
        
        <button onClick={handleShare} className="w-full flex items-center justify-center gap-2 bg-gray-700/50 hover:bg-gray-700 text-gray-200 py-2.5 md:py-3 rounded-xl font-medium transition-all border border-gray-600 text-sm md:text-base">
          {isCopied ? (
            <span className="text-green-400 font-bold">Link Copied!</span>
          ) : (
            <>
              <Share2 size={16} className="md:w-5 md:h-5" />
              Share Certificate
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MetaPanel;