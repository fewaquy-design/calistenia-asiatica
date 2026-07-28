import { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, Leaf } from 'lucide-react';

export default function Support() {
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'agent',
      text: 'Olá! Sou a assistente Atlas. 🌿 Estou aqui para ajudar com qualquer dúvida sobre treinos, dieta, bem-estar ou o aplicativo. Pode me perguntar o que quiser! Como posso te ajudar hoje?'
    },
    {
      id: 2,
      type: 'user',
      text: 'Como acelerar o emagrecimento?'
    },
    {
      id: 3,
      type: 'agent',
      text: 'Para acelerar o emagrecimento, mantenha um déficit calórico moderado, priorizando proteínas magras em cada refeição 🍽️. Combine treinos de calistenia (ex.: circuitos de 3 x 15 repetições) com atividades aeróbicas como caminhada ou bike. Beba pelo menos 2L de água por dia e durma 7-8 h para otimizar a recuperação. Use as dietas personalizadas do app para ajustar os alimentos que você realmente gosta. Lembre-se de acompanhar seu progresso e celebrar cada conquista! 🌟'
    }
  ]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: 'user',
      text: input.trim()
    };

    setMessages([...messages, newMessage]);
    setInput('');
    
    // Simulate agent typing
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'agent',
        text: 'No momento eu sou uma demonstração de interface! Em breve terei respostas reais baseadas em inteligência artificial para te ajudar na sua jornada. 💪'
      }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] pb-24">
      {/* Header */}
      <div className="px-6 pt-6 pb-2 bg-[#fafafa] sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-900">Suporte 24h</h1>
        <p className="text-[11px] text-gray-500 mb-4">Tire suas dúvidas com a IA Atlas</p>
        
        {/* Banner Plano */}
        <div className="flex justify-between items-center bg-white rounded-full px-4 py-3 shadow-sm border border-gray-100 mb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
            <Leaf size={14} className="text-[#d58d9e]" />
            Plano Lite
          </div>
          <div className="text-[10px] text-gray-400 font-medium">
            4/5 mensagens restantes hoje
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex gap-3 max-w-[90%] ${msg.type === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.type === 'agent' ? 'bg-[#d58d9e] text-white' : 'bg-[#d58d9e] text-white'
            }`}>
              {msg.type === 'agent' ? <Bot size={16} /> : <User size={16} />}
            </div>

            {/* Bubble */}
            <div className={`p-4 shadow-sm text-[13px] leading-relaxed ${
              msg.type === 'user' 
                ? 'bg-[#d58d9e] text-white rounded-2xl rounded-tr-none' 
                : 'bg-white border border-gray-100 text-gray-700 rounded-2xl rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="fixed bottom-[80px] w-full max-w-md px-6 bg-gradient-to-t from-[#fafafa] via-[#fafafa] to-transparent pt-4 left-1/2 -translate-x-1/2">
        <form onSubmit={handleSend} className="bg-white border border-gray-200 rounded-full p-1 pl-5 flex items-center shadow-sm">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua dúvida..."
            className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400"
          />
          <button 
            type="submit" 
            className="w-10 h-10 rounded-full bg-[#f0c5ce] flex items-center justify-center text-white ml-2 shrink-0 hover:bg-[#d58d9e] transition-colors"
          >
            <Send size={16} className="ml-[-2px] mt-[1px]" />
          </button>
        </form>
      </div>
    </div>
  );
}
