import { motion } from 'framer-motion';

interface ChatMessageProps {
  text: string;
  isUser: boolean;
}

export default function ChatMessage({ text, isUser }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-[80%] px-5 py-3 rounded-2xl ${
          isUser
            ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg'
            : 'bg-gradient-to-br from-purple-900/50 to-pink-900/30 text-purple-100 backdrop-blur-sm border border-purple-400/30 shadow-xl'
        }`}
      >
        <p className="text-sm md:text-base leading-relaxed">{text}</p>
      </div>
    </motion.div>
  );
}
