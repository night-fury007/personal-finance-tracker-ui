export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-4 px-8 text-center text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>
          © {new Date().getFullYear()} Wealth Engine. Enterprise Financial
          Protocol.
        </span>
        <span className="text-slate-400">
          Multi-Currency Polyglot Architecture Active
        </span>
      </div>
    </footer>
  );
}
