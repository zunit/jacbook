import ProfilePicture from "../../../../assets/top-navigation/about-me/Jack-Profile.jpg";
interface AboutMeProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutMe({ isOpen, onClose }: AboutMeProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-md mx-4 rounded-2xl bg-slate-950 border border-slate-700/80 shadow-[0_18px_60px_rgba(0,0,0,0.85)] overflow-hidden">
        {/* Header with close button */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-700/50 bg-slate-900/50">
          <div className="flex items-center gap-2">
            {/* Red close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="h-3 w-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
              aria-label="Close"
            >
              <span className="text-[0.6rem] text-red-900 opacity-0 group-hover:opacity-100 transition-opacity">
                ✕
              </span>
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-6 flex flex-col items-center justify-center bg-slate-800">
          <div className="h-32 w-32 border-4 border-slate-700/80 border-solid border-white shadow-lg rounded-full bg-gradient-to-br from-sky-500/60 via-indigo-500/60 to-purple-500/60 flex items-center justify-center text-2xl">
            <img
              src={ProfilePicture}
              alt="Profile Picture"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex items-start gap-3 mb-4">
            <div className="flex items-center gap-3">
              {/* Picture placeholder */}

              <div className="flex flex-col items-center justify-center pt-4">
                <h2 className="text-sm sm:text-base font-semibold flex items-center gap-2">
                  Jacbook Pro
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                👷 Builder • 🙋🏻‍♂️ Entrepreneur • 🥐 Cafès Explorer • 🤖 Tech Enthusiast
                </p>
              </div>
            </div>
          </div>
              

  <div className="rounded-2xl border border-neutral-700 bg-slate-800 px-4 py-4 shadow-lg">
    <div className="divide-y divide-slate-700 text-xs">
      
      <div className="flex items-center py-2">
        <div className="w-40 text-neutral-400">Name</div>
        <div className="flex-1 text-right text-neutral-100">Jack Z</div>
      </div>

      <div className="flex items-center py-3">
        <div className="w-40 text-neutral-400">Chip</div>
        <div className="flex-1 text-right text-neutral-100">Fueled by Curiosity and Good Wi‑Fi</div>
      </div>

      <div className="flex items-center py-3">
        <div className="w-40 text-neutral-400">Memory</div>
        <div className="flex-1 text-right text-neutral-100">Selective and deteriorating</div>
      </div>
    </div>
  </div>

        </div>
      </div>
    </div>
  );
}
