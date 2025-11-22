/**
 * Mobile message component displayed when screen is too small for desktop view
 */
export default function MobileDesktop() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[radial-gradient(circle_at_bottom,_#16a34a_0,_#15803d_30%,#052e16_55%),radial-gradient(circle_at_top,_#fb7185_0,_#fb923c_30%,#3b82f6_60%,#1e293b_90%)]">
      <div className="text-center px-4">
        <p className="text-4xl mb-4">🥺</p>
        <p className="text-xl sm:text-2xl font-semibold text-slate-50 mb-2">
          This is a desktop app
        </p>
        <p className="text-sm sm:text-base text-slate-200/80">
          Please view on a larger screen
        </p>
      </div>
    </div>
  );
}

