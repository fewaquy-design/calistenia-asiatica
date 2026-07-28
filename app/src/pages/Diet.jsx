import { Droplet, Info, Clock, CheckCircle, Sparkles } from 'lucide-react';
import { dietPlan } from '../data/diet';
import { useNavigate } from 'react-router-dom';

export default function Diet() {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-50 min-h-screen pb-24">
      <div className="mb-6 pt-4">
        <h1 className="text-3xl font-brand text-primary uppercase">{dietPlan.title}</h1>
        <p className="text-gray-600 mt-2 text-sm">{dietPlan.description}</p>
      </div>

      <div className="mb-6">
        <button 
          onClick={() => navigate('/custom-diet')}
          className="w-full py-4 rounded-2xl bg-primary text-white flex items-center justify-center gap-2 font-bold shadow-sm hover:bg-primary-dark transition-colors"
        >
          <Sparkles size={20} />
          Criar Dieta Personalizada
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-6 flex gap-3 items-start">
        <Droplet className="text-blue-500 shrink-0 mt-0.5" size={20} />
        <p className="text-sm text-blue-900 font-medium">
          {dietPlan.hydration}
        </p>
      </div>

      <div className="space-y-6">
        {dietPlan.meals.map((meal) => (
          <div key={meal.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gray-900 px-4 py-3 flex justify-between items-center text-white">
              <h2 className="font-semibold">{meal.name}</h2>
              <div className="flex items-center gap-1 text-xs text-gray-300">
                <Clock size={14} />
                <span>{meal.time}</span>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {meal.options.map((opt, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <CheckCircle className="text-primary mt-0.5 shrink-0" size={16} />
                    <p className="text-sm text-gray-700">{opt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button 
          onClick={() => navigate('/custom-diet')}
          className="w-full py-4 rounded-2xl bg-primary text-white flex items-center justify-center gap-2 font-bold shadow-sm hover:bg-primary-dark transition-colors"
        >
          <Sparkles size={20} />
          Criar Dieta Personalizada
        </button>
      </div>
    </div>
  );
}
