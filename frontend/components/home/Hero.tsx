export default function Hero() {
  return (
    <div className="relative w-full h-[80vh] lg:h-[90vh] min-h-[500px] overflow-hidden">
      {/* Background Videos */}
      <div className="absolute inset-0 w-full h-full">
        {/* Desktop Video */}
        <video
          className="hidden lg:block absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://studyindiafair.com/wp-content/uploads/2025/12/study-in-india-homepage-video.mp4"
            type="video/mp4"
          />
        </video>

        {/* Mobile/Tablet Video */}
        <video
          className="block lg:hidden absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://studyindiafair.com/wp-content/uploads/2025/12/study-in-india-homepage-video-for-mobile.mp4"
            type="video/mp4"
          />
        </video>
        
        {/* Dark overlay for better button visibility */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full h-full flex flex-col justify-end lg:justify-center items-center pb-24 lg:pb-0">
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-auto lg:mt-64">
            <button className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold text-lg uppercase tracking-wide transition-all shadow-lg hover:shadow-red-600/30 hover:-translate-y-1">
              Visitors Registration
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/95 hover:bg-white text-gray-900 rounded-full font-bold text-lg uppercase tracking-wide transition-all shadow-lg hover:shadow-white/30 hover:-translate-y-1">
              Exhibitors Registration
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
