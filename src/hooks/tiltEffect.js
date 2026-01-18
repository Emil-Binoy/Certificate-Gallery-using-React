import { useState } from 'react';

export const useTiltEffect = (isFullscreen) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!isFullscreen) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (max 20 degrees)
    const xRotation = -((y - rect.height / 2) / rect.height * 20);
    const yRotation = ((x - rect.width / 2) / rect.width * 20);

    setTilt({ x: xRotation, y: yRotation });
  };

  const handleMouseLeave = () => {
    if (!isFullscreen) return;
    setTilt({ x: 0, y: 0 });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return { tilt, handleMouseMove, handleMouseLeave, resetTilt };
};