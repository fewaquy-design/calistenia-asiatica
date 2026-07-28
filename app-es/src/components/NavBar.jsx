import { Link, useLocation } from 'react-router-dom';
import { Home, Dumbbell, Utensils, MessageCircle, User } from 'lucide-react';

const CHECKOUT_URL = 'https://checkout.payt.com.br/261594c911c886be3205204978d1387c';

export default function NavBar() {
  const location = useLocation();
  const base = import.meta.env.BASE_URL;

  const navItems = [
    { path: '/home', icon: Home, label: 'Inicio' },
    { path: '/workouts', icon: Dumbbell, label: 'Entrenam.' },
    { path: '/diet', icon: Utensils, label: 'Dieta' },
    { path: '/support', icon: MessageCircle, label: 'Soporte' },
    { path: '/profile', icon: User, label: 'Perfil' }
  ];

  const hiddenPaths = ['/login', '/register', '/onboarding', '/'];
  if (hiddenPaths.includes(location.pathname) || location.pathname.startsWith('/workout/')) return null;

  return (
    <div className="fixed bottom-0 w-full z-50">

      {/* Nav Bar */}
      <div className="bg-white border-t border-gray-100">
        <div className="flex justify-between sm:justify-center sm:gap-20 items-center px-6 py-3 max-w-lg mx-auto">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-gray-400'}`}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
