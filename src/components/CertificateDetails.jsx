  import React, { useState, useEffect } from 'react';
  import { 
    X, 
    ChevronLeft, 
    ChevronRight, 
    Download, 
    Share2, 
    ZoomIn, 
    ZoomOut, 
    Maximize2,
    Tag,
    Calendar,
    Hash,
    Award
  } from 'lucide-react';

  const CertificateDetails = ({ certificate, certificates, onClose, onChange }) => {
    // === 1. Navigation Logic ===
    const currentIndex = certificates.findIndex((c) => c.id === certificate.id);
    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < certificates.length - 1;

    const goPrev = (e) => {
      e?.stopPropagation();
      if (hasPrev) onChange(certificates[currentIndex - 1]);
    };

    const goNext = (e) => {
      e?.stopPropagation();
      if (hasNext) onChange(certificates[currentIndex + 1]);
    };

    // Keyboard navigation
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') goPrev();
        if (e.key === 'ArrowRight') goNext();
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, hasPrev, hasNext]);

    // === 2. Zoom State ===
    const [zoom, setZoom] = useState(1);
    const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
    const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));

    useEffect(() => {
      setZoom(1);
    }, [certificate]);

    if (!certificate) return null;

    return (
      // Backdrop - Using fixed inset-0 to cover the whole screen
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-0 md:p-8"
        onClick={onClose}
      >
        {/* Modal Container - Responsive Flex Direction */}
        <div 
          className="bg-[#0f172a] w-full h-full md:max-w-6xl md:h-[85vh] md:rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border-0 md:border border-gray-700/50 relative"
          onClick={(e) => e.stopPropagation()}
        >
          
          {/* === LEFT/TOP SIDE: Image Viewer === */}
          {/* On mobile: h-[50vh], On desktop: flex-1 (auto width) */}
          <div className="w-full h-[50vh] md:h-full md:flex-1 relative bg-black/40 flex items-center justify-center overflow-hidden group">
            
            {/* Mobile Close Button (Visible only on mobile/tablet) */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full backdrop-blur-md md:hidden"
            >
              <X size={24} />
            </button>

            {/* Main Image */}
            <div 
              className="relative w-full h-full flex items-center justify-center p-4 md:p-8 transition-transform duration-200 ease-out"
              style={{ transform: `scale(${zoom})` }}
            >
              <img 
                src={certificate.image} 
                alt={certificate.title} 
                className="max-w-full max-h-full object-contain shadow-2xl"
              />
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={goPrev}
              disabled={!hasPrev}
              className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-gray-800/80 text-white backdrop-blur-m  d border border-white/10 transition-all hover:bg-blue-600 disabled:opacity-0 disabled:pointer-events-none z-20 ${!hasPrev ? 'hidden' : ''}`}
            >
              <ChevronLeft size={20} className="md:w-6 md:h-6" />
            </button>

            <button 
              onClick={goNext}
              disabled={!hasNext}
              className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-gray-800/80 text-white backdrop-blur-md border border-white/10 transition-all hover:bg-blue-600 disabled:opacity-0 disabled:pointer-events-none z-20 ${!hasNext ? 'hidden' : ''}`}
            >
              <ChevronRight size={20} className="md:w-6 md:h-6" />
            </button>

            {/* Bottom Toolbar (Zoom) - Hidden on very small screens if needed, or scaled down */}
            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-gray-900/90 backdrop-blur-md border border-white/10 rounded-full shadow-xl opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
              <button onClick={handleZoomOut} className="p-1.5 md:p-2 text-gray-400 hover:text-white rounded-full">
                <ZoomOut size={16} className="md:w-5 md:h-5"/>
              </button>
              <span className="text-[10px] md:text-xs font-mono text-gray-400 w-8 md:w-12 text-center">{Math.round(zoom * 100)}%</span>
              <button onClick={handleZoomIn} className="p-1.5 md:p-2 text-gray-400 hover:text-white rounded-full">
                <ZoomIn size={16} className="md:w-5 md:h-5"/>
              </button>
            </div>
          </div>

          {/* === RIGHT/BOTTOM SIDE: Metadata Panel === */}
          {/* On mobile: Flex-1 (takes remaining height), scrollable */}
          <div className="w-full h-full md:w-[350px] lg:w-[400px] bg-[#1e293b] border-t md:border-t-0 md:border-l border-gray-700/50 flex flex-col z-30">
            
            {/* Header */}
            <div className="p-4 md:p-6 border-b border-gray-700/50 flex justify-between items-start">
              <div>
                <h2 className="text-lg md:text-xl font-bold text-white leading-tight mb-1">{certificate.title}</h2>
                <p className="text-xs md:text-sm text-blue-400 font-medium">Verified Certificate</p>
              </div>
              {/* Desktop Close Button (Hidden on mobile) */}
              <button 
                onClick={onClose}
                className="hidden md:block text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Details Area */}
            <div className="flex-1 p-4 md:p-6 space-y-4 md:space-y-6 overflow-y-auto custom-scrollbar">
              
              {/* Issuer */}
              <div className="space-y-1 md:space-y-2">
                <div className="flex items-center gap-2 text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  <Award size={12} className="md:w-3.5 md:h-3.5" /> Issuer
                </div>
                <p className="text-gray-200 font-medium text-base md:text-lg">{certificate.issuer}</p>
              </div>

              {/* Date */}
              <div className="space-y-1 md:space-y-2">
                <div className="flex items-center gap-2 text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  <Calendar size={12} className="md:w-3.5 md:h-3.5" /> Date Issued
                </div>
                <p className="text-gray-200 font-medium text-sm md:text-base">{certificate.date}</p>
              </div>

              

              {/* Tags */}
              <div className="space-y-1 md:space-y-2">
                <div className="flex items-center gap-2 text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  <Tag size={12} className="md:w-3.5 md:h-3.5" /> Tags
                </div>
                <div className="flex flex-wrap gap-2">
                  {certificate.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 md:px-3 md:py-1 bg-blue-500/10 text-blue-300 text-[10px] md:text-xs font-medium rounded-full border border-blue-500/20">
                      {tag}
                    </span>
                  ))} 
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 md:p-6 border-t border-gray-700/50 bg-[#1e293b] space-y-3">
              <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-2.5 md:py-3 rounded-xl font-semibold transition-all shadow-lg shadow-blue-900/20 text-sm md:text-base">
                <Download size={16} className="md:w-[18px] md:h-[18px]" />
                Download
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-gray-700/50 hover:bg-gray-700 text-gray-200 py-2.5 md:py-3 rounded-xl font-medium transition-all border border-gray-600 text-sm md:text-base">
                <Share2 size={16} className="md:w-[18px] md:h-[18px]" />
                Share Certificate
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  };

  export default CertificateDetails;