import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Moon, Play, Flame, TrendingUp, Clock, Scale, ChevronRight, Activity, BookOpen, Gift, Lock } from 'lucide-react';
import { weeks } from '../data/workouts';

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated');
    if (!isAuth) {
      navigate('/login');
      return;
    }
    const userData = JSON.parse(localStorage.getItem('calistenia_user') || '{}');
    if (!userData.metaPeso) {
      navigate('/onboarding');
      return;
    }
    setUser(userData);
  }, [navigate]);

  if (!user) return null;

  const diasConcluidos = user.diasConcluidos?.length || 0;
  const progresso = Math.round((diasConcluidos / 21) * 100);
  const diaAtual = diasConcluidos + 1;
  const minutosTreinados = user.minutosTreinados || 0;
  
  // Encontrar o treino de hoje baseado no diaAtual
  let treinoHoje = null;
  let semanaAtual = null;
  for (const week of weeks) {
    const day = week.days.find(d => d.id === diaAtual);
    if (day) {
      treinoHoje = day;
      semanaAtual = week;
      break;
    }
  }

  const base = import.meta.env.BASE_URL;

  const quickUpsells = [
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

  return (
    <div className="flex flex-col min-h-screen pb-6">
      {/* Header */}
      <div className="flex justify-between items-center px-6 pt-8 pb-4">
        <div>
          <div className="flex items-center gap-1">
            <span className="font-brand text-primary uppercase text-xl">Calistenia</span>
            <span className="text-[10px] text-gray-500 mt-1">by Atlas</span>
          </div>
        </div>
        <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
          <Moon size={16} />
        </button>
      </div>

      {/* Greeting Card */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-medium">
            <UserIcon />
          </div>
          <div>
            <p className="text-xs text-gray-500">¡Hola,</p>
            <h2 className="text-xl font-bold">{user.nome || "Atleta"} 🌸</h2>
          </div>
          <ChevronRight className="ml-auto text-gray-400" size={20} />
        </div>
        
        <div className="bg-pink-50 text-primary-dark px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-medium">
          <span>✨</span>
          ¡Cada día es una nueva conquista! 🌸
        </div>
      </div>

      {/* Progress Card */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="relative w-20 h-20 flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#F3F4F6"
                strokeWidth="2"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="2"
                strokeDasharray={`${progresso}, 100`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold leading-none">{diasConcluidos}</span>
              <span className="text-[10px] text-gray-400">/21</span>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Programa 21 Días</h3>
            <p className="text-xs text-gray-500 mb-2">¡Comienza tu jornada hoy!</p>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full transition-all duration-1000" 
                style={{ width: `${progresso}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Workout */}
      {treinoHoje && semanaAtual && (
        <div className="px-6 mb-8">
          <div className="bg-primary rounded-3xl overflow-hidden shadow-md">
            <div className="p-5 text-white">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold tracking-wider uppercase opacity-80">ENTRENAMIENTO DE HOY</span>
                <span className="text-[10px] bg-white/20 px-2 py-1 rounded-md font-medium">Día {treinoHoje.id}</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">{semanaAtual.title} — {semanaAtual.subtitle}</h3>
              <p className="text-sm opacity-90 mb-4">{semanaAtual.description}</p>
              
              <div className="flex items-center gap-4 text-xs opacity-90 mb-4">
                <div className="flex items-center gap-1">
                  <Clock size={14} /> {treinoHoje.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Flame size={14} /> {treinoHoje.exercisesCount} ejercicios
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-t-3xl mt-[-10px]">
              <div className="space-y-3 mb-4">
                {treinoHoje.exercises.slice(0, 3).map((ex, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-pink-100 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{ex.name}</span>
                  </div>
                ))}
                {treinoHoje.exercises.length > 3 && (
                  <p className="text-xs text-gray-400 text-center mt-2">+{(treinoHoje.exercises.length - 3)} ejercicios...</p>
                )}
              </div>
              
              <Link to={`/workout/${treinoHoje.id}`} className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-2xl font-medium flex items-center justify-center gap-2 transition-colors">
                <Play size={18} fill="currentColor" /> Iniciar Entrenamiento
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Order Bumps Section */}
      <div className="px-6 mb-8">
        <h3 className="font-bold text-gray-800 mb-3 text-sm">🔥 Acelera Tus Resultados</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              id: 1,
              title: 'Soporte en Whatsapp 24 Hrs',
              description: 'Soporte exclusivo 24hrs de lun. a dom. Nunca estarás sola en este camino.',
              oldPrice: null,
              price: 'US$ 9,90',
              image: `${import.meta.env.BASE_URL}images/wpp.png`,
              badge: '🔥 Más popular',
              badgeColor: 'bg-blue-500',
              bgColor: 'from-green-700 to-green-950',
              checkoutUrl: 'https://checkout.payt.com.br/261594c911c886be3205204978d1387c',
            },
            {
              id: 2,
              title: 'Acceso Vitalicio',
              description: 'Paga 1 Vez, Usa para Siempre. Acceso vitalicio y actualizaciones futuras.',
              oldPrice: 'US$ 9,90',
              price: 'US$ 9,97',
              image: `${import.meta.env.BASE_URL}images/vitalicio.png`,
              badge: '⚡ Precio especial',
              badgeColor: 'bg-green-500',
              bgColor: 'from-yellow-600 to-yellow-950',
              checkoutUrl: 'https://checkout.payt.com.br/261594c911c886be3205204978d1387c',
            },
            {
              id: 3,
              title: 'Consulta Particular por Video',
              description: 'Protocolo ajustado a tu cuerpo y rutina. Una especialista solo para ti.',
              oldPrice: 'US$ 37,97',
              price: 'US$ 19,97',
              image: `${import.meta.env.BASE_URL}images/consulta.png`,
              badge: '⭐ Recomendado',
              badgeColor: 'bg-purple-500',
              bgColor: 'from-purple-600 to-purple-950',
              checkoutUrl: 'https://checkout.payt.com.br/261594c911c886be3205204978d1387c',
            },
            {
              id: 4,
              title: 'Combo Exclusivo',
              description: 'Lleva los 3 por el precio de 1: Soporte + Vitalicio + Consulta. Por separado: US$39,97.',
              oldPrice: 'US$ 39,97',
              price: 'US$ 29,97',
              image: `${import.meta.env.BASE_URL}images/todospor1.png`,
              badge: '⚡ Precio especial',
              badgeColor: 'bg-green-500',
              bgColor: 'from-pink-600 to-pink-950',
              checkoutUrl: 'https://checkout.payt.com.br/261594c911c886be3205204978d1387c',
            },
            {
              id: 5,
              title: 'Acelerador Detox',
              description: 'Desblóquealo ahora y turbina tus resultados con el protocolo detox exclusivo.',
              oldPrice: null,
              price: 'US$ 9,90',
              image: `${import.meta.env.BASE_URL}aceleradorDetox.png`,
              badge: '🌿 Exclusivo',
              badgeColor: 'bg-emerald-500',
              bgColor: 'from-emerald-600 to-emerald-950',
              checkoutUrl: 'https://checkout.payt.com.br/261594c911c886be3205204978d1387c',
            },
            {
              id: 6,
              title: 'Truco de la Cuchara Coreana',
              description: 'Secreto asiático para adelgazar más rápido. Método comprobado.',
              oldPrice: null,
              price: 'US$ 9,90',
              image: `${import.meta.env.BASE_URL}colherCoreana.png`,
              badge: '🌸 Secreto asiático',
              badgeColor: 'bg-pink-500',
              bgColor: 'from-pink-500 to-rose-900',
              checkoutUrl: 'https://checkout.payt.com.br/261594c911c886be3205204978d1387c',
            },
          ].map((item) => (
            <div key={item.id} className="flex flex-col">
              <button
                onClick={() => window.open(item.checkoutUrl, '_blank')}
                className={`w-full aspect-[9/16] rounded-2xl relative overflow-hidden shadow-md text-left transition-transform hover:scale-[1.02] active:scale-[0.98] flex flex-col justify-end bg-gradient-to-b ${item.bgColor}`}
              >
                <div className="absolute inset-0 flex items-center justify-center pb-24">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto max-h-full object-contain"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <div className="absolute top-3 left-3 z-10">
                  <span className={`${item.badgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>{item.badge}</span>
                </div>

                {/* Lock overlay - centered on image */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pb-24">
                  <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </div>
                </div>

                <div className="relative z-10 p-3 w-full">
                  <h4 className="text-white font-bold text-xs leading-tight mb-1">{item.title}</h4>
                  <p className="text-white/70 text-[10px] leading-tight mb-2 line-clamp-2">{item.description}</p>
                  <div className="flex flex-col gap-0.5">
                    {item.oldPrice && (
                      <span className="text-white/60 text-[10px] line-through">De {item.oldPrice} por</span>
                    )}
                    <span className="text-white font-bold text-lg leading-none">{item.price}</span>
                  </div>
                </div>
              </button>

              {/* Checkout button below card */}
              <a
                href={item.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-primary hover:bg-primary-dark text-white text-[11px] font-bold py-2 px-3 rounded-xl text-center transition-colors mt-2"
              >
                Desbloquear
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 mb-6">
        <h3 className="font-bold text-gray-800 mb-4">Mis Estadísticas</h3>
        <div className="grid grid-cols-2 gap-3">
          <StatCard color="red" title="ENTRENAM." value={diasConcluidos} subtitle="Completados" icon={<Flame size={20} />} />
          <StatCard color="green" title="PROGRESO" value={`${progresso}%`} subtitle="Del programa" icon={<TrendingUp size={20} />} />
          <StatCard color="blue" title="TIEMPO" value={minutosTreinados} subtitle="Minutos entrenados" icon={<Clock size={20} />} />
          <StatCard color="yellow" title="META" value={`${user.metaPeso}kg`} subtitle="Peso deseado" icon={<Scale size={20} />} />
        </div>
      </div>

      {/* Quick Links */}
      <div className="px-6 space-y-3 mb-6">
        <QuickLink icon={<Activity size={20} className="text-orange-500" />} title="Actividad Extra" subtitle="Acelera tus resultados (opcional)" />
        <QuickLink icon={<BookOpen size={20} className="text-primary" />} title="Filosofía del Entrenamiento" subtitle="Entiende nuestra metodología" />
        <QuickLink icon={<Gift size={20} className="text-pink-500" />} title="Bonos y Contenidos" subtitle="Materiales extra exclusivos" />
      </div>

      {/* Mini Upsells at bottom */}
      <div className="px-6 pb-24">
        <h3 className="font-bold text-gray-800 mb-4">Recomendaciones para ti</h3>
        <div className="grid grid-cols-2 gap-2">
          {quickUpsells.map((item) => (
            <div key={item.id} className="flex flex-col">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full h-[140px] rounded-2xl relative overflow-hidden shadow-sm transition-transform active:scale-[0.98] bg-gradient-to-b ${item.bgColor}`}
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
      </div>
    </div>
  );
}

function UserIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}

function StatCard({ color, title, value, subtitle, icon }) {
  const colorMap = {
    red: "bg-[#E05252]",
    green: "bg-[#3DBD7A]",
    blue: "bg-[#4AABDB]",
    yellow: "bg-[#E8A83E]",
  };
  
  return (
    <div className={`${colorMap[color]} text-white p-4 rounded-2xl relative overflow-hidden`}>
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-bold tracking-wider uppercase opacity-90">{title}</span>
        <div className="opacity-50">{icon}</div>
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-[10px] opacity-90">{subtitle}</div>
    </div>
  );
}

function QuickLink({ icon, title, subtitle }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-bold text-gray-800">{title}</h4>
        <p className="text-[11px] text-gray-500">{subtitle}</p>
      </div>
      <ChevronRight size={18} className="text-gray-400" />
    </div>
  );
}
