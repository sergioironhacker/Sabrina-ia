import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import SabrinaAvatar from './components/SabrinaAvatar';
import ChatMessage from './components/ChatMessage';
import StarryBackground from './components/StarryBackground';
import { getSabrinaResponse } from './utils/sabrinaResponses';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

type AvatarState = 'idle' | 'thinking' | 'talking';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: "¡Hola! Soy Sabrina, la brujilla digital de DiseñoWebStudio. ¿En qué puedo ayudarte hoy? ✨", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [avatarState, setAvatarState] = useState<AvatarState>('idle');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (avatarState === 'talking') {
      const timer = setTimeout(() => {
        setAvatarState('idle');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [avatarState]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      id: messages.length,
      text: inputValue,
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setAvatarState('thinking');
    setIsThinking(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const response = getSabrinaResponse(inputValue);
    const sabrinaMessage: Message = {
      id: messages.length + 1,
      text: response,
      isUser: false
    };

    setMessages(prev => [...prev, sabrinaMessage]);
    setAvatarState('talking');
    setIsThinking(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <StarryBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-6 md:py-8"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 mb-2">
            ✨ Sabrina
          </h1>
          <p className="text-purple-200 text-sm md:text-base">
            La brujilla digital de DiseñoWebStudio
          </p>
        </motion.header>

        <div className="flex-1 flex flex-col lg:flex-row items-start justify-center gap-6 px-4 pb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center w-full lg:w-auto"
          >
            <SabrinaAvatar state={avatarState} />
            {isThinking && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-purple-300 text-sm md:text-base flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 animate-spin" />
                🔮 Sabrina está conjurando una respuesta...
              </motion.p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full lg:w-[500px] xl:w-[600px] flex flex-col h-[500px] md:h-[600px]"
          >
            <div className="flex-1 bg-purple-950/30 backdrop-blur-xl rounded-3xl border border-purple-500/30 shadow-2xl overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-2 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-transparent">
                {messages.map(message => (
                  <ChatMessage
                    key={message.id}
                    text={message.text}
                    isUser={message.isUser}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t border-purple-500/30 bg-purple-950/50">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Escribe tu pregunta para Sabrina..."
                    className="flex-1 bg-purple-900/50 text-purple-100 placeholder-purple-400 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 border border-purple-500/30"
                    disabled={isThinking}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    disabled={isThinking}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full p-3 hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center py-6 text-purple-300 text-sm"
        >
          <p>
            Hechizado con amor por{' '}
            <span className="font-bold text-purple-200">DiseñoWebStudio</span> 🪄
          </p>
          <p className="mt-1 text-purple-400 text-xs">
            Visita la web para más información
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;
