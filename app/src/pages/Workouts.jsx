import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, ChevronDown, ChevronRight, Clock, Flame } from 'lucide-react';
import { weeks } from '../data/workouts';

export default function Workouts() {
  const [expandedWeek, setExpandedWeek] = useState(1);
  const user = JSON.parse(localStorage.getItem('calistenia_user') || '{}');
  const diasConcluidos = user.diasConcluidos || [];
  const diaAtual = diasConcluidos.length + 1;

  return (
    <div className="flex flex-col min-h-screen pb-6 bg-[#FAFAFA]">
      <div className="px-6 pt-10 pb-6">
        <h1 className="text-2xl font-bold text-gray-800">Treinos</h1>
        <p className="text-sm text-gray-500 mb-6">Programa completo de 21 dias</p>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button className="bg-white border border-gray-200 shadow-sm px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap flex items-center gap-2">
            📅 Ver Programa
          </button>
          <button className="bg-white border border-gray-100 px-4 py-2 rounded-full text-xs font-medium text-gray-500 whitespace-nowrap flex items-center gap-2">
            💪 Todos Exercícios
          </button>
          <button className="bg-white border border-gray-100 px-4 py-2 rounded-full text-xs font-medium text-gray-500 whitespace-nowrap flex items-center gap-2">
            🧘 Filosofia
          </button>
        </div>
      </div>

      <div className="px-6 space-y-4">
        {weeks.map((week) => (
          <div key={week.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
            <button 
              className="w-full flex items-center p-4 gap-4"
              onClick={() => setExpandedWeek(expandedWeek === week.id ? null : week.id)}
            >
              <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center font-bold text-primary flex-shrink-0">
                {week.id}
              </div>
              <div className="text-left flex-1">
                <h3 className="font-bold text-gray-800">Semana {week.id}</h3>
                <p className="text-xs text-gray-500">{week.subtitle}</p>
              </div>
              {expandedWeek === week.id ? (
                <ChevronDown className="text-gray-400" />
              ) : (
                <ChevronRight className="text-gray-400" />
              )}
            </button>

            {expandedWeek === week.id && (
              <div className="p-4 pt-0 space-y-3 bg-gray-50 rounded-b-3xl mx-2 mb-2">
                {week.days.map((day) => {
                  const isHoje = day.id === diaAtual;
                  const isConcluido = diasConcluidos.includes(day.id);

                  return (
                    <div 
                      key={day.id} 
                      className={`p-4 rounded-2xl border ${isHoje ? 'border-primary bg-white shadow-sm' : 'border-gray-100 bg-white'}`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
                            SEMANA {week.id} — {week.subtitle.toUpperCase()}
                          </p>
                          <h4 className="font-bold text-gray-800 text-lg">Dia {day.id}</h4>
                        </div>
                        
                        {isHoje ? (
                          <Link to={`/workout/${day.id}`} className="bg-primary text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                            <Play size={12} fill="currentColor" /> Iniciar
                          </Link>
                        ) : (
                          <Link to={`/workout/${day.id}`} className="text-gray-500 border border-gray-200 px-4 py-2 rounded-full text-xs font-medium flex items-center gap-1">
                            {isConcluido ? 'Refazer' : 'Ver'} <Play size={12} />
                          </Link>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
                        <div className="flex items-center gap-1">
                          <Clock size={12} /> {day.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Flame size={12} /> {day.exercisesCount} exercícios
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
        
        {/* Placeholder for the last item fading out slightly as shown in print */}
        <div className="h-10 bg-gradient-to-t from-orange-50 to-transparent w-full rounded-b-3xl opacity-50"></div>
      </div>
    </div>
  );
}
