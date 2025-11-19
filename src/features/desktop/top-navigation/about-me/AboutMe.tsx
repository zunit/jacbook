interface AboutMeProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutMe({ isOpen, onClose }: AboutMeProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-md mx-4 rounded-2xl bg-slate-950 border border-slate-700/80 shadow-[0_18px_60px_rgba(0,0,0,0.85)] p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            {/* Picture placeholder */}
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-sky-500/60 via-indigo-500/60 to-purple-500/60 flex items-center justify-center text-2xl">
              👤
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-semibold flex items-center gap-2">
                Me
                <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/40 text-sky-200">
                  Instructor mode
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Human in the loop • Builder • Teacher
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-100 text-xs border border-slate-700/70 rounded-full px-2 py-1"
          >
            ✕
          </button>
        </div>

        <div className="text-xs sm:text-sm text-slate-200 space-y-2 mb-4">
          <p>
            I enjoy designing systems that feel elegant under the hood and approachable on the surface—
            from microservices and AI-powered tooling to project-based curricula that help students ship real things.
          </p>
          <p>
            In the classroom, I like to connect abstract concepts (like architecture, protocols, or parsing)
            to tangible artifacts students can build, debug, and be proud of.
          </p>
          <p>
            Outside of code, I mentor robotics teams, experiment with AI-augmented learning tools, and
            look for ways to make complex ideas feel less intimidating and more like an invitation.
          </p>
        </div>

        <div className="flex justify-end gap-2 text-[0.7rem]">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-full border border-slate-700/80 text-slate-200 hover:bg-slate-800/80"
          >
            Close
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-medium"
          >
            Nice to meet you 👋
          </button>
        </div>
      </div>
    </div>
  );
}

