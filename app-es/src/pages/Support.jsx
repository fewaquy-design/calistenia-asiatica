import { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, Leaf } from 'lucide-react';

export default function Support() {
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'agent',
      text: '¡Hola! Soy la asistente Atlas. 🌿 Estoy aquí para ayudarte con cualquier duda sobre entrenamientos, dieta, bienestar o la aplicación. ¡Pregúntame lo que quieras! ¿En qué puedo ayudarte hoy?'
    },
    {
      id: 2,
      type: 'user',
      text: '¿Cómo acelerar el adelgazamiento?'
    },
    {
      id: 3,
      type: 'agent',
      text: 'Para acelerar el adelgazamiento, mantén un déficit calórico moderado, priorizando proteínas magras en cada comida 🍽️. Combina entrenamientos de calistenia (ej.: circuitos de 3 x 15 repeticiones) con actividades aeróbicas como caminar o bicicleta. Bebe al menos 2L de agua al día y duerme 7-8 h para optimizar la recuperación. Usa las dietas personalizadas de la app para ajustar los alimentos que realmente te gustan. ¡Recuerda acompañar tu progreso y celebrar cada logro! 🌟'
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
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'agent',
        text: '¡Por ahora soy una demostración de interfaz! Pronto tendré respuestas reales basadas en inteligencia artificial para ayudarte en tu jornada. 💪'
      }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] pb-24">
      {/* Header */}
      <div className="px-6 pt-6 pb-2 bg-[#fafafa] sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-900">Soporte 24h</h1>
        <p className="text-[11px] text-gray-500 mb-4">Resuelve tus dudas con la IA Atlas</p>
        
        {/* Banner Plan */}
        <div className="flex justify-between items-center bg-white rounded-full px-4 py-3 shadow-sm border border-gray-100 mb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
            <Leaf size={14} className="text-[#d58d9e]" />
            Plan Lite
          </div>
          <div className="text-[10px] text-gray-400 font-medium">
            4/5 mensajes restantes hoy
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
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.type === 'agent' ? 'bg-[#d58d9e] text-white' : 'bg-[#d58d9e] text-white'
            }`}>
              {msg.type === 'agent' ? <Bot size={16} /> : <User size={16} />}
            </div>

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
            placeholder="Escribe tu pregunta..."
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
