import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, Edit2, Trash2, ChevronRight } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('calistenia_user') || '{}');
    setUser(userData);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('isAuthenticated');
      navigate('/login');
    } catch (err) {
      console.error('Erro ao deslogar:', err);
    }
  };

  const handleReset = () => {
    if(window.confirm('Tem certeza que deseja resetar seu progresso?')) {
      // Add logic to clear progress if needed later
      alert('Progresso resetado.');
    }
  };

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] pb-24 px-6 pt-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Perfil</h1>
        <p className="text-[11px] text-gray-500">Suas informações e configurações</p>
      </div>

      <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 mb-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <div className="w-[60px] h-[60px] bg-[#cf5c76] rounded-full flex items-center justify-center text-white">
              <User size={30} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-[22px] h-[22px] bg-[#a84459] rounded-full flex items-center justify-center text-white border-2 border-white">
              <Edit2 size={10} />
            </div>
          </div>
          <div>
            <h2 className="text-[17px] font-bold text-gray-900 tracking-tight">{user.nome || user.name || 'Atleta'}</h2>
            <button className="text-[12px] text-[#cf5c76] font-medium mt-0.5">Editar nome</button>
          </div>
        </div>

        <div className="flex justify-between items-end px-2">
          <div className="flex flex-col items-center">
            <div className="w-[60px] h-[60px] rounded-full border-4 border-[#f6ebed] flex items-center justify-center mb-2">
              <span className="font-bold text-gray-900 text-sm">0%</span>
            </div>
            <span className="text-[12px] text-gray-500">Progresso</span>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-[26px] font-bold text-gray-900 leading-none mb-1">0</span>
            <span className="text-[12px] text-gray-500">Treinos</span>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-[26px] font-bold text-gray-900 leading-none mb-1">21</span>
            <span className="text-[12px] text-gray-500">Restantes</span>
          </div>
        </div>
      </div>

      <button className="w-full bg-white rounded-2xl p-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#f9e9ec] rounded-full flex items-center justify-center text-[#cf5c76]">
            <Settings size={18} />
          </div>
          <div className="text-left">
            <h3 className="text-[14px] font-bold text-gray-900">Preferências</h3>
            <p className="text-[12px] text-gray-500">Configure seu app</p>
          </div>
        </div>
        <ChevronRight size={18} className="text-gray-400" />
      </button>

      <button 
        onClick={handleLogout}
        className="w-full bg-transparent border border-gray-200 rounded-full py-3.5 flex items-center justify-center gap-2 text-[13px] font-medium text-gray-800 mb-4 hover:bg-gray-50 transition-colors"
      >
        <LogOut size={16} />
        Sair da Conta
      </button>

      <button 
        onClick={handleReset}
        className="w-full bg-transparent py-2 flex items-center justify-center gap-2 text-[13px] font-medium text-[#c04a60] hover:opacity-80 transition-opacity"
      >
        <Trash2 size={16} />
        Resetar Progresso
      </button>
    </div>
  );
}
