import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Toolbar from './Toolbar';

const Viewer = ({ 
  certificate, 
  zoom, 
  tilt, 
  isFullscreen, 
  onClose, 
  nav, // contains hasPrev, hasNext, goPrev, goNext, currentIndex, total
  zoomControls, // contains onZoomIn, onZoomOut
  mouseEvents, // contains onMouseMove, onMouseLeave
  onToggleFullscreen 
}) => {
  return (
    <div className="w-full h-[45vh] md:h-full md:flex-1 relative bg-black/40 flex items-center justify-center overflow-hidden group perspective-container">
      
      {/* Mobile/Fullscreen Close Button */}
      <button 
        onClick={onClose}
        className={`absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full backdrop-blur-md hover:bg-red-500/80 transition-colors ${
          isFullscreen ? 'block' : 'md:hidden'
        }`}
      >
        <X size={24} />
      </button>

      {/* Main Image Container */}
      <div 
        className={`relative w-full h-full flex items-center justify-center transition-transform duration-100 ease-out ${
          isFullscreen ? 'p-0' : 'p-4 md:p-8'
        }`}
        onMouseMove={mouseEvents.handleMouseMove}
        onMouseLeave={mouseEvents.handleMouseLeave}
        style={{ perspective: isFullscreen ? '1000px' : 'none' }}
      >
        <img 
          src={certificate.image} 
          alt={certificate.title} 
          className={`max-w-full max-h-full object-contain shadow-2xl transition-all duration-100 ease-out will-change-transform ${
            isFullscreen ? 'rounded-lg' : '' 
          }`}
          style={{ 
            transform: `scale(${zoom}) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            boxShadow: isFullscreen 
              ? `${-tilt.y * 2}px ${tilt.x * 2}px 30px rgba(0,0,0,0.5)` 
              : '0 25px 50px -12px rgba(0, 0, 0, 0.25)' 
          }}
        />
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={nav.goPrev}
        disabled={!nav.hasPrev}
        className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-gray-800/80 text-white backdrop-blur-md border border-white/10 transition-all hover:bg-blue-600 disabled:opacity-0 disabled:pointer-events-none z-20 ${!nav.hasPrev ? 'hidden' : ''}`}
      >
        <ChevronLeft size={20} className="md:w-6 md:h-6" />
      </button>

      <button 
        onClick={nav.goNext}
        disabled={!nav.hasNext}
        className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-gray-800/80 text-white backdrop-blur-md border border-white/10 transition-all hover:bg-blue-600 disabled:opacity-0 disabled:pointer-events-none z-20 ${!nav.hasNext ? 'hidden' : ''}`}
      >
        <ChevronRight size={20} className="md:w-6 md:h-6" />
      </button>

      <Toolbar 
        zoom={zoom}
        onZoomIn={zoomControls.handleZoomIn}
        onZoomOut={zoomControls.handleZoomOut}
        currentIndex={nav.currentIndex}
        total={nav.total}
        isFullscreen={isFullscreen}
        onToggleFullscreen={onToggleFullscreen}
      />
    </div>
  );
};

export default Viewer;