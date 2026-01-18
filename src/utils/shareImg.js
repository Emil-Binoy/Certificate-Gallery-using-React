export const shareCertificate = async (certificate) => {
  // 1. Define what we want to share
  const shareData = {
    title: certificate.title,
    text: `Check out this certificate: ${certificate.title} issued by ${certificate.issuer}`,
    // Sharing the image URL directly since we don't have individual pages yet
    url: certificate.image 
  };

  try {
    // 2. Try using the native Share API (Mobile/Modern Browsers)
    if (navigator.share) {
      await navigator.share(shareData);
      return 'shared';
    } 
    // 3. Fallback: Copy to clipboard (Desktop)
    else {
      await navigator.clipboard.writeText(shareData.url);
      return 'copied';
    }
  } catch (error) {
    console.error('Error sharing:', error);
    return 'error';
  }
};