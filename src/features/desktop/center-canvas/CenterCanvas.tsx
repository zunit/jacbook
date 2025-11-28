
export default function CenterCanvas() {
  return (
    <div className="flex items-center justify-center min-h-screen pt-9 pb-20">
      <div className="text-center max-w-xl px-4">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-200/80 mb-3">
          UofT • Software Engineering
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
          Welcome to my macOS-style profile desktop.
        </h1>
        <p className="text-sm sm:text-base text-slate-100/90 mb-4">
          Use the <span className="font-semibold">Me</span> button in the top-left to learn more about me,
          or explore the 5 apps in the dock below to see projects, teaching, and links.
        </p>
      </div>
    </div>
  );
}

