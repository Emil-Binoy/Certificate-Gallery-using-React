import { useState, useEffect } from 'react';

export const useZoomControls = (certificate) => {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  
  // Reset zoom when the certificate changes
  useEffect(() => {
    setZoom(1);
  }, [certificate]);

  return { zoom, setZoom, handleZoomIn, handleZoomOut };
};