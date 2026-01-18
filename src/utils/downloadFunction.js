export const downloadImage = async (imageUrl, title) => {
  try {
    // 1. Fetch the image
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    
    // 2. Create object URL
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    // 3. Generate clean filename
    const filename = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`;
    link.download = filename;
    
    // 4. Trigger download
    document.body.appendChild(link);
    link.click();
    
    // 5. Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed:', error);
    // Fallback: Open in new tab
    window.open(imageUrl, '_blank');
  }
};