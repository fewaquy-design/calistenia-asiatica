import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Sparkles, Leaf } from 'lucide-react';

export default function CustomDiet() {
  const navigate = useNavigate();
  
  const [dados, setDados] = useState({
    idade: '',
    altura: '',
    pesoAtual: '',
    pesoMeta: '',
    prazo: ''
  });

  const [restricoes, setRestricoes] = useState([]);
  
  // Array of selected food items
  const [selectedFoods, setSelectedFoods] = useState([]);

  const restricoesOptions = [
    'Vegetariano', 'Vegano', 'Sem Glúten', 'Sem Lactose', 'Low Carb', 'Diabético'
  ];

  const foodGroups = [
    {
      id: 'carnes',
      title: 'Carnes',
      icon: '🥩',
      items: ['Frango', 'Carne Bovina', 'Carne Suína', 'Peixe', 'Camarão', 'Peru', 'Pato', 'Cordeiro']
    },
    {
      id: 'ovos_laticinios',
      title: 'Ovos e Laticínios',
      icon: '🥚',
      items: ['Ovos', 'Leite', 'Queijo', 'Iogurte', 'Manteiga', 'Requeijão']
    },
    {
      id: 'leguminosas',
      title: 'Leguminosas',
      icon: '🫘',
      items: ['Feijão Preto', 'Feijão Carioca', 'Lentilha', 'Grão de Bico', 'Ervilha', 'Soja', 'Fava']
    },
    {
      id: 'cereais',
      title: 'Cereais e Grãos',
      icon: '🌾',
      items: ['Arroz Branco', 'Arroz Integral', 'Aveia', 'Quinoa', 'Milho', 'Trigo', 'Cevada', 'Centeio']
    },
    {
      id: 'legumes',
      title: 'Legumes e Verduras',
      icon: '🥦',
      items: ['Alface', 'Rúcula', 'Espinafre', 'Couve', 'Brócolis', 'Couve-flor', 'Cenoura', 'Beterraba', 'Tomate', 'Pepino', 'Abobrinha', 'Berinjela', 'Pimentão', 'Cebola', 'Alho']
    },
    {
      id: 'frutas',
      title: 'Frutas',
      icon: '🍎',
      items: ['Banana', 'Maçã', 'Laranja', 'Limão', 'Morango', 'Uva', 'Manga', 'Abacaxi', 'Melancia', 'Melão', 'Mamão', 'Pera', 'Kiwi', 'Abacate', 'Goiaba', 'Acerola']
    },
    {
      id: 'oleaginosas',
      title: 'Oleaginosas',
      icon: '🥜',
      items: ['Castanha do Pará', 'Castanha de Caju', 'Amendoim', 'Amêndoas', 'Nozes', 'Pistache']
    },
    {
      id: 'tuberculos',
      title: 'Tubérculos',
      icon: '🥔',
      items: ['Batata Inglesa', 'Batata Doce', 'Mandioca', 'Inhame', 'Cará']
    }
  ];

  const handleRestricaoToggle = (res) => {
    if (restricoes.includes(res)) {
      setRestricoes(restricoes.filter(r => r !== res));
    } else {
      setRestricoes([...restricoes, res]);
    }
  };

  const handleFoodToggle = (item) => {
    if (selectedFoods.includes(item)) {
      setSelectedFoods(selectedFoods.filter(f => f !== item));
    } else {
      setSelectedFoods([...selectedFoods, item]);
    }
  };

  const handleSelectAll = (groupItems) => {
    const allSelected = groupItems.every(item => selectedFoods.includes(item));
    if (allSelected) {
      // Remove all
      setSelectedFoods(selectedFoods.filter(f => !groupItems.includes(f)));
    } else {
      // Add all missing
      const newSelections = [...selectedFoods];
      groupItems.forEach(item => {
        if (!newSelections.includes(item)) newSelections.push(item);
      });
      setSelectedFoods(newSelections);
    }
  };

  const handleChangeDados = (e) => {
    setDados({...dados, [e.target.name]: e.target.value});
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] pb-24">
      {/* Header */}
      <div className="bg-[#fafafa] sticky top-0 z-30 px-6 py-4 flex items-center gap-4">
        <button onClick={() => navigate('/diet')} className="text-gray-600 p-1">
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Dieta Personalizada</h1>
          <p className="text-[11px] text-gray-500">Alimentação gerada por IA para seus objetivos</p>
        </div>
      </div>

      <div className="px-6 space-y-6 mt-2">
        
        {/* Banner Plano */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 shrink-0">
            <Leaf size={20} />
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-1">
              <span role="img" aria-label="leaf">🌿</span> Plano Light
            </h3>
            <p className="text-xs text-gray-500">Você pode gerar mais 2 dietas</p>
          </div>
        </div>

        {/* Seus Dados */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <h2 className="font-bold text-gray-800 text-[15px] mb-4">Seus Dados</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">Idade</label>
              <input 
                type="number" 
                name="idade"
                value={dados.idade}
                onChange={handleChangeDados}
                placeholder="Ex: 30"
                className="w-full bg-[#f9f9f9] border border-gray-100 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-primary/50 placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">Altura (cm)</label>
              <input 
                type="number" 
                name="altura"
                value={dados.altura}
                onChange={handleChangeDados}
                placeholder="Ex: 165"
                className="w-full bg-[#f9f9f9] border border-gray-100 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-primary/50 placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">Peso Atual (kg)</label>
              <input 
                type="number" 
                name="pesoAtual"
                value={dados.pesoAtual}
                onChange={handleChangeDados}
                placeholder="Ex: 70"
                className="w-full bg-[#f9f9f9] border border-gray-100 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-primary/50 placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">Peso Meta (kg)</label>
              <input 
                type="number" 
                name="pesoMeta"
                value={dados.pesoMeta}
                onChange={handleChangeDados}
                placeholder="Ex: 60"
                className="w-full bg-[#f9f9f9] border border-gray-100 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-primary/50 placeholder:text-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-gray-500 mb-1">Prazo desejado (dias)</label>
            <input 
              type="number" 
              name="prazo"
              value={dados.prazo}
              onChange={handleChangeDados}
              placeholder="Ex: 30"
              className="w-full bg-[#f9f9f9] border border-gray-100 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-primary/50 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Restrições Alimentares */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <h2 className="font-bold text-gray-800 text-[15px] mb-4">Restrições Alimentares</h2>
          <div className="grid grid-cols-2 gap-3">
            {restricoesOptions.map((res) => {
              const isSelected = restricoes.includes(res);
              return (
                <button
                  key={res}
                  onClick={() => handleRestricaoToggle(res)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all ${
                    isSelected 
                      ? 'border-primary bg-primary/5 text-primary' 
                      : 'border-gray-100 bg-white text-gray-600'
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-primary' : 'border-gray-300'
                  }`}>
                    {isSelected && <div className="w-2 h-2 bg-primary rounded-full" />}
                  </div>
                  <span className="text-xs font-medium">{res}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grupos Alimentares */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <h2 className="font-bold text-gray-800 text-[15px] mb-1">Grupos Alimentares</h2>
          <p className="text-[11px] text-gray-500 mb-6">Selecione os alimentos que você gosta e quer incluir na sua dieta</p>

          <div className="space-y-6">
            {foodGroups.map((group) => {
              const selectedInGroup = group.items.filter(item => selectedFoods.includes(item)).length;
              return (
                <div key={group.id} className="bg-[#fafafa] border border-gray-100 rounded-2xl overflow-hidden">
                  {/* Group Header */}
                  <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{group.icon}</span>
                      <div>
                        <h3 className="text-sm font-bold text-gray-900">{group.title}</h3>
                        <p className="text-[10px] text-gray-500">{selectedInGroup} de {group.items.length} selecionados</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleSelectAll(group.items)}
                      className="text-[10px] font-bold text-primary"
                    >
                      Marcar todos
                    </button>
                  </div>

                  {/* Group Items */}
                  <div className="p-4 grid grid-cols-2 gap-2">
                    {group.items.map(item => {
                      const isSelected = selectedFoods.includes(item);
                      return (
                        <button
                          key={item}
                          onClick={() => handleFoodToggle(item)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                            isSelected 
                              ? 'border-primary bg-primary/5 text-primary' 
                              : 'border-gray-100 bg-white text-gray-600'
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-primary' : 'border-gray-300'
                          }`}>
                            {isSelected && <div className="w-2 h-2 bg-primary rounded-full" />}
                          </div>
                          <span className="text-[11px] font-medium truncate">{item}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Action Button */}
        <div className="pt-4 pb-6">
          <button className="w-full py-4 rounded-2xl bg-primary text-white flex items-center justify-center gap-2 font-bold shadow-sm hover:bg-primary-dark transition-colors">
            <Sparkles size={18} />
            Gerar Dieta Personalizada
          </button>
        </div>

      </div>
    </div>
  );
}
