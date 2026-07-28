import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
  const [idade, setIdade] = useState('');
  const [altura, setAltura] = useState('');
  const [pesoAtual, setPesoAtual] = useState('');
  const [metaPeso, setMetaPeso] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const isAuth = localStorage.getItem('isAuthenticated');
    if (!isAuth) {
      navigate('/login');
    }
  }, [navigate]);

  const handleStart = (e) => {
    e.preventDefault();
    const existingUser = JSON.parse(localStorage.getItem('calistenia_user') || '{}');
    const updatedUser = {
      ...existingUser,
      idade: parseInt(idade),
      altura: parseInt(altura),
      pesoAtual: parseFloat(pesoAtual),
      metaPeso: parseFloat(metaPeso),
      diasConcluidos: [],
      minutosTreinados: 0
    };
    localStorage.setItem('calistenia_user', JSON.stringify(updatedUser));
    navigate('/home');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-brand text-primary uppercase tracking-wider mb-1">Calistenia</h1>
        <p className="text-xs text-gray-500">by Atlas</p>
      </div>

      <div className="w-full bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-center mb-2 text-gray-800">Antes de começarmos...</h2>
        <p className="text-center text-sm text-gray-500 mb-6 px-4">
          Precisamos de alguns dados para personalizar sua experiência
        </p>
        
        <form onSubmit={handleStart}>
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-1">Idade</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </span>
              <input 
                type="number" 
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                placeholder="Sua idade" 
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-1">Altura (cm)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
              </span>
              <input 
                type="number" 
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                placeholder="Ex: 165" 
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-1">Peso Atual (kg)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg>
              </span>
              <input 
                type="number" 
                step="0.1"
                value={pesoAtual}
                onChange={(e) => setPesoAtual(e.target.value)}
                placeholder="Ex: 70" 
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-medium text-gray-700 mb-1">Meta de Peso (kg)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2"></circle><circle cx="12" cy="12" r="4" strokeWidth="2"></circle></svg>
              </span>
              <input 
                type="number" 
                step="0.1"
                value={metaPeso}
                onChange={(e) => setMetaPeso(e.target.value)}
                placeholder="Ex: 60" 
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-full font-medium transition-colors flex items-center justify-center gap-2"
          >
            Começar 
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </form>
      </div>

      <div className="mt-6 text-center px-4">
        <p className="text-[11px] text-gray-400 leading-tight max-w-[250px] mx-auto">
          Esses dados serão usados para personalizar seus treinos e dieta
        </p>
      </div>
    </div>
  );
}
