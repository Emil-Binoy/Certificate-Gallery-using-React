import React from 'react';
import { ZoomIn, ZoomOut, Maximize2, Minimize2 } from 'lucide-react';

const Toolbar = ({ 
  zoom, 
  onZoomIn, 
  onZoomOut, 
  currentIndex, 
  total, 
  isFullscreen, 
  onToggleFullscreen 
}) => {
  return (
    <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 bg-gray-900/90 backdrop-blur-md border border-white/10 rounded-full shadow-xl opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 z-50 w-max max-w-[90%]">
      
      {/* Zoom Controls */}
      <div className="flex items-center gap-1 md:gap-2">
        <button onClick={onZoomOut} className="p-1.5 md:p-2 text-gray-400 hover:text-white rounded-full transition-colors">
          <ZoomOut size={16} className="md:w-5 md:h-5"/>
        </button>
        <span className="text-[10px] md:text-xs font-mono text-gray-400 w-8 md:w-10 text-center">
          {Math.round(zoom * 100)}%
        </span>
        <button onClick={onZoomIn} className="p-1.5 md:p-2 text-gray-400 hover:text-white rounded-full transition-colors">
          <ZoomIn size={16} className="md:w-5 md:h-5"/>
        </button>
      </div>

      <div className="w-px h-4 bg-gray-700"></div>

      {/* Counter */}
      <span className="text-[10px] md:text-xs font-mono text-gray-300 font-medium whitespace-nowrap">
        {currentIndex + 1} / {total}
      </span>

      <div className="w-px h-4 bg-gray-700"></div>

      {/* Fullscreen Toggle */}
      <button 
        onClick={onToggleFullscreen} 
        className="p-1.5 md:p-2 text-gray-400 hover:text-blue-400 rounded-full transition-colors"
      >
        {isFullscreen ? (
          <Minimize2 size={16} className="md:w-5 md:h-5" />
        ) : (
          <Maximize2 size={16} className="md:w-5 md:h-5" />
        )}
      </button>
    </div>
  );
};

export default Toolbar;