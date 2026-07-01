import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Find Your Car' },
    { to: '/recommendations', label: 'Recommendations' },
    { to: '/compare', label: 'Compare' },
  ];

  return (
    <header className="bg-brand-900 text-white shadow-lg">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" className="flex items-center justify-center gap-2 sm:justify-start">
          <span className="text-xl font-bold tracking-tight sm:text-2xl">
            Car<span className="text-brand-500">Dekho</span>
          </span>
        </Link>
        <nav className="grid w-full grid-cols-3 gap-2 sm:flex sm:w-auto sm:gap-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`truncate rounded-lg px-2 py-2 text-center text-xs font-medium transition-colors sm:px-3 sm:text-sm ${
                location.pathname === link.to
                  ? 'bg-brand-700 text-white'
                  : 'text-gray-300 hover:bg-brand-700/50 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
