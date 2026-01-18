import { useEffect } from 'react';

export const useCertificateNavigation = (certificate, certificates, onClose, onChange) => {
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, hasPrev, hasNext]);

  return { currentIndex, hasPrev, hasNext, goPrev, goNext };
};