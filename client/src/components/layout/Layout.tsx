import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t bg-white py-6 text-center text-sm text-gray-500">
        CarDekho Assignment &mdash; Car Recommendation Platform
      </footer>
    </div>
  );
}
