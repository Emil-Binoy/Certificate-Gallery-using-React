import React, { useState } from 'react';

// Hooks
import { useCertificateNavigation } from '../../hooks/certificateNavigation';
import { useZoomControls } from '../../hooks/zoomControls';
import { useTiltEffect } from '../../hooks/tiltEffect';

// Components
import Viewer from './Viewer';
import MetaPanel from './MetaPanel';

// FIX 1: Changed "{ certificate }" to "{ cert }" to match Gallery.jsx
const CertificateDetails = ({ cert, certificates, onClose, onChange }) => {
  // State
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Custom Hooks
  // FIX 2: Pass 'cert' to your hooks instead of 'certificate'
  const nav = useCertificateNavigation(cert, certificates, onClose, onChange);
  const zoomControls = useZoomControls(cert);
  const tiltEffect = useTiltEffect(isFullscreen);

  // Handlers
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    tiltEffect.resetTilt();
    zoomControls.setZoom(1);
  };

  // FIX 3: Safety check on 'cert'
  if (!cert) return null;

  return (
    // Backdrop
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isFullscreen ? 'bg-black p-0' : 'bg-black/80 backdrop-blur-sm p-0 md:p-8'
      }`}
      onClick={onClose}
    >
      {/* Modal Container */}
      <div 
        className={`bg-[#0f172a] shadow-2xl overflow-hidden flex flex-col md:flex-row relative transition-all duration-300 ease-in-out
          ${isFullscreen 
            ? 'w-full h-full rounded-none max-w-none border-0' 
            : 'w-full h-full md:max-w-6xl md:h-[85vh] md:rounded-2xl border-0 md:border border-gray-700/50'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Left Side: Image Viewer */}
        <Viewer 
          // FIX 4: Pass 'cert' into the 'certificate' prop of the child component
          certificate={cert}
          zoom={zoomControls.zoom}
          tilt={tiltEffect.tilt}
          isFullscreen={isFullscreen}
          onClose={onClose}
          nav={{ ...nav, total: certificates.length }}
          zoomControls={zoomControls}
          mouseEvents={tiltEffect}
          onToggleFullscreen={toggleFullscreen}
        />

        {/* Right Side: Metadata Panel (Hidden in Fullscreen) */}
        {!isFullscreen && (
          <MetaPanel 
            // FIX 5: Pass 'cert' here too
            certificate={cert} 
            onClose={onClose} 
          />
        )}

      </div>
    </div>
  );
};

export default CertificateDetails;