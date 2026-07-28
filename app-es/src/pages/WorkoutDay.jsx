import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Play, Pause, CheckCircle2, SkipForward, SkipBack } from 'lucide-react';
import { weeks } from '../data/workouts';

export default function WorkoutDay() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dayData, setDayData] = useState(null);
  const [completed, setCompleted] = useState(false);
  
  // Player State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  const videoRef = useRef(null);

  useEffect(() => {
    const dayId = parseInt(id);
    let found = null;
    for (const week of weeks) {
      const day = week.days.find(d => d.id === dayId);
      if (day) {
        found = day;
        break;
      }
    }
    
    if (found) {
      setDayData(found);
      const userData = JSON.parse(localStorage.getItem('calistenia_user') || '{}');
      const diasConcluidos = userData.diasConcluidos || [];
      if (diasConcluidos.includes(dayId)) {
        setCompleted(true);
      }
    } else {
      navigate('/workouts');
    }
  }, [id, navigate]);

  // Set initial time for current exercise
  useEffect(() => {
    if (!dayData || isFinished) return;
    
    const ex = dayData.exercises[currentIndex];
    let seconds = ex.duration || 30;
    if (!ex.duration) {
      if (ex.reps.includes('s')) {
        seconds = parseInt(ex.reps.replace('s', ''));
      } else if (ex.reps.includes('x')) {
        seconds = parseInt(ex.reps.replace('x', '')) * 3;
      }
    }
    
    setTimeLeft(seconds);
    setIsPlaying(true);
  }, [currentIndex, dayData, isFinished]);

  // Timer logic
  useEffect(() => {
    if (!isPlaying || isFinished || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, isFinished, timeLeft]);

  const handleNext = () => {
    if (!dayData) return;
    if (currentIndex < dayData.exercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    const userData = JSON.parse(localStorage.getItem('calistenia_user') || '{}');
    const diasConcluidos = userData.diasConcluidos || [];
    
    if (!diasConcluidos.includes(dayData.id)) {
      diasConcluidos.push(dayData.id);
      userData.diasConcluidos = diasConcluidos;
      
      const durationMatch = dayData.duration.match(/\d+/);
      const minutes = durationMatch ? parseInt(durationMatch[0]) : 0;
      userData.minutosTreinados = (userData.minutosTreinados || 0) + minutes;
      
      localStorage.setItem('calistenia_user', JSON.stringify(userData));
      setCompleted(true);
      
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    } else {
      navigate('/home');
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!dayData) return <div className="p-6 text-center">Cargando...</div>;

  // Finished Screen
  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
        <CheckCircle2 size={80} className="text-green-500 mb-6" />
        <h1 className="text-3xl font-bold mb-2 text-center">¡Entrenamiento Finalizado!</h1>
        <p className="text-gray-400 mb-10 text-center">¡Muy bien! Completaste los {dayData.exercisesCount} ejercicios del {dayData.title}.</p>
        
        <button 
          onClick={handleComplete}
          className="w-full max-w-md py-4 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all"
        >
          {completed ? (
             <>
               <CheckCircle2 size={24} />
               Entrenamiento Completado
             </>
          ) : 'Marcar como Completado'}
        </button>
      </div>
    );
  }

  const currentEx = dayData.exercises[currentIndex];

  return (
    <div className="flex flex-col bg-black text-white relative min-h-[calc(100vh-4rem)] h-full overflow-hidden">
      
      {/* Top Bar */}
      <div className="w-full p-4 pt-6 flex flex-col gap-4 bg-black shrink-0 relative z-20">
        <div className="flex justify-between items-center px-2">
          <button 
            onClick={() => navigate('/workouts')}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white transition-transform hover:scale-105"
          >
            <ChevronLeft size={24} />
          </button>
          <span className="font-bold font-mono tracking-widest text-sm text-gray-200">
            {currentIndex + 1} / {dayData.exercises.length}
          </span>
        </div>
        
        {/* Progress Dashes */}
        <div className="flex gap-1 px-2">
          {dayData.exercises.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                idx < currentIndex ? 'bg-white' : 
                idx === currentIndex ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Video Section */}
      <div className="flex-1 relative w-full flex flex-col justify-end bg-gray-900">
        {currentEx.video ? (
          <video 
            ref={videoRef}
            src={currentEx.video} 
            className="absolute inset-0 w-full h-full object-contain" 
            autoPlay 
            loop
            muted 
            playsInline
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gray-800 flex items-center justify-center">
            <span className="text-gray-500">Video no disponible</span>
          </div>
        )}
        {/* Gradient Overlay for Text */}
        <div className="relative z-10 w-full bg-gradient-to-t from-black via-black/80 to-transparent pt-32 pb-6 text-center pointer-events-none">
           <h2 className="text-2xl font-bold mb-1 text-white drop-shadow-md">{currentEx.name}</h2>
           <p className="text-gray-300 font-bold text-[14px] uppercase tracking-widest">
             {currentEx.reps} {currentEx.reps.includes('x') ? 'REPETICIONES' : 'SEGUNDOS'}
             {currentEx.duration && currentEx.reps.includes('x') ? ` • ${currentEx.duration} SEG` : ''}
           </p>
           <p className="text-primary font-bold text-[11px] uppercase tracking-widest mt-0.5">
             TRANSCURRIDO
           </p>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="w-full bg-black p-6 flex flex-col items-center pb-8 shrink-0 relative z-20">
        <div className="text-6xl sm:text-7xl leading-none font-bold font-mono text-white tracking-widest mb-8 drop-shadow-sm">
          {formatTime(timeLeft)}
        </div>
        
        <div className="flex justify-center items-center gap-8 w-full max-w-sm">
          <button 
            onClick={handlePrev}
            className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center transition-all ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:scale-105'}`}
          >
            <SkipBack size={20} className="text-gray-300" />
          </button>
          
          <button 
            onClick={() => {
              setIsPlaying(!isPlaying);
              if (videoRef.current) {
                if (isPlaying) videoRef.current.pause();
                else videoRef.current.play();
              }
            }}
            className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(214,77,122,0.4)] transition-all transform hover:scale-105 active:scale-95"
          >
            {isPlaying ? <Pause size={32} fill="currentColor" className="text-white" /> : <Play size={32} fill="currentColor" className="ml-1 text-white" />}
          </button>

          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center transition-all hover:scale-105"
          >
             <SkipForward size={20} className="text-gray-300" />
          </button>
        </div>
      </div>
      
    </div>
  );
}
