export default function Footer() {
  return (
    <footer className="border-t border-[#181920] bg-[#0b0c0e] py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <div className="flex items-center gap-2 font-display font-bold text-white tracking-wider text-sm">
          <img
            src="/logo.png"
            alt="FitLog Logo"
            className="w-6 h-6 object-contain"
          />
          <span>FITLOG</span>
        </div>
        <p>© 2026 FitLog - Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
