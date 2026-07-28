import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      localStorage.setItem('isAuthenticated', 'true');
      const user = JSON.parse(localStorage.getItem('calistenia_user'));
      
      // Navigate based on onboarding completion
      if (user && user.metaPeso) {
        navigate('/home');
      } else {
        navigate('/onboarding');
      }
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('E-mail ou senha incorretos. Verifique suas credenciais.');
      } else {
        setError('Ocorreu um erro ao fazer login. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await signInWithPopup(auth, googleProvider);
      
      localStorage.setItem('isAuthenticated', 'true');
      const user = JSON.parse(localStorage.getItem('calistenia_user') || '{}');
      
      if (user && user.metaPeso) {
        navigate('/home');
      } else {
        navigate('/onboarding');
      }
    } catch (err) {
      console.error(err);
      setError('Ocorreu um erro ao fazer login com o Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-brand text-primary uppercase mb-1">Calistenia</h1>
        <p className="text-sm text-gray-500">by Atlas</p>
      </div>

      <div className="w-full bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-[15px] font-bold text-center mb-6 text-gray-800">Entrar</h2>
        
        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          type="button"
          className="w-full flex items-center justify-center gap-3 bg-[#f9f9f9] border border-gray-100 text-[13px] text-gray-700 py-3.5 rounded-full mb-6 font-medium hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            <path fill="none" d="M1 1h22v22H1z" />
          </svg>
          Continuar com Google
        </button>

        <div className="relative flex items-center py-2 mb-4">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase">ou</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-1">E-mail</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </span>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com" 
                className="w-full pl-10 pr-4 py-3 rounded-[14px] border border-gray-100 bg-[#f9f9f9] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-[13px]"
                required
              />
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">Senha</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              </span>
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full pl-10 pr-10 py-3 rounded-[14px] border border-gray-100 bg-[#f9f9f9] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-[13px]"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="text-right mb-6">
            <a href="#" className="text-xs text-primary hover:underline">Esqueci minha senha</a>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`w-full text-white py-[14px] rounded-full text-[15px] font-medium shadow-[0_8px_20px_rgba(204,74,107,0.3)] transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'} bg-gradient-to-r from-[#cc4a6b] to-[#e06277]`}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 mb-1">Ainda não tem conta?</p>
          <Link to="/register" className="text-sm text-primary font-medium hover:underline">Criar conta</Link>
        </div>
      </div>

      <div className="mt-8 text-center px-4">
        <p className="text-[10px] text-gray-400 leading-tight">
          Ao continuar, você concorda com nossos Termos de Uso<br/>e Política de Privacidade.
        </p>
      </div>
    </div>
  );
}
