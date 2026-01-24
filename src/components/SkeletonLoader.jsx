import React from 'react';

const SkeletonLoader = () => {
  return (
    // Used a darker background to match your site theme
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto w-full">
        
        {/* Create 6 placeholder cards */}
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div 
            key={item} 
            className="relative bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 aspect-4/3 flex flex-col shadow-xl"
          >
            {/* THE SHIMMER OVERLAY */}
            {/* We use our new .animate-shimmer class here */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent z-10 animate-shimmer"></div>

            {/* Top Image Placeholder */}
            <div className="w-full h-full bg-gray-700/50"></div>

            {/* Bottom Text Placeholder */}
            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3 bg-gray-900/60 backdrop-blur-sm border-t border-gray-700">
              {/* Title Line */}
              <div className="h-6 bg-gray-600/60 rounded-md w-3/4"></div>
              {/* Date/Issuer Line */}
              <div className="h-4 bg-gray-600/40 rounded-md w-1/2"></div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default SkeletonLoader;