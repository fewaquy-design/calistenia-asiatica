import { Link, useLocation } from 'react-router-dom';
import { Home, Dumbbell, Utensils, MessageCircle, User, Lock } from 'lucide-react';

const CHECKOUT_URL = 'https://checkout.payt.com.br/261594c911c886be3205204978d1387c';

export default function NavBar() {
  const location = useLocation();
  const base = import.meta.env.BASE_URL;

  const upsells = [
    {
      id: 1,
      image: `${base}images/aceleradorDetox.png`,
      title: 'Acelerador Detox',
      subtitle: 'Desbloquea ahora y acelera tus resultados',
      badge: '🌿 Exclusivo',
      badgeColor: 'bg-emerald-500',
      bgColor: 'from-emerald-600 to-emerald-950',
      url: 'https://huggy-dialogue-flow.lovable.app/',
    },
    {
      id: 2,
      image: `${base}images/truqueColher.png`,
      title: 'Truco de la Cuchara Coreana',
      subtitle: 'Secreto asiático para adelgazar más rápido',
      badge: '🌸 Asiático',
      badgeColor: 'bg-pink-500',
      bgColor: 'from-pink-500 to-rose-900',
      url: '/es/pages/truquedacolher.html',
    },
  ];

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
      {/* Upsell Story Cards */}
      <div className="w-full max-w-md mx-auto px-3 pb-1 grid grid-cols-2 gap-2">
        {upsells.map((item) => (
          <div key={item.id} className="flex flex-col">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full h-[140px] rounded-2xl relative overflow-hidden shadow-lg transition-transform active:scale-[0.98] bg-gradient-to-b ${item.bgColor}`}
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              {/* Badge */}
              <div className="absolute top-1.5 left-1.5 z-10">
                <span className={`${item.badgeColor} text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full`}>{item.badge}</span>
              </div>
              {/* Lock icon */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pb-8">
                <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Lock size={14} className="text-white" />
                </div>
              </div>
              {/* Content bottom */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-2">
                <p className="text-white font-bold text-[10px] leading-tight">{item.title}</p>
                <p className="text-white/70 text-[8px] leading-tight line-clamp-1">{item.subtitle}</p>
              </div>
            </a>
          </div>
        ))}
      </div>

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
