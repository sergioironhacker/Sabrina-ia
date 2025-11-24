import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

type AvatarState = 'idle' | 'thinking' | 'talking';

interface SabrinaAvatarProps {
  state: AvatarState;
}

export default function SabrinaAvatar({ state }: SabrinaAvatarProps) {
  const [blinkEyes, setBlinkEyes] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkEyes(true);
      setTimeout(() => setBlinkEyes(false), 150);
    }, state === 'talking' ? 1500 : 3000);

    return () => clearInterval(blinkInterval);
  }, [state]);

  return (
    <div className="relative">
      <motion.div
        className="relative w-48 h-48 md:w-64 md:h-64"
        animate={state === 'thinking' ? {
          rotate: [0, -5, 5, -5, 0],
          scale: [1, 1.02, 1]
        } : {}}
        transition={{
          duration: 2,
          repeat: state === 'thinking' ? Infinity : 0,
          ease: "easeInOut"
        }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
          <defs>
            <radialGradient id="faceGlow">
              <stop offset="0%" stopColor="#f0abfc" />
              <stop offset="100%" stopColor="#c084fc" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <circle cx="100" cy="110" r="60" fill="url(#faceGlow)" opacity="0.9" />

          <path
            d="M 50 80 Q 60 50 100 45 Q 140 50 150 80 L 140 85 Q 100 70 60 85 Z"
            fill="#6b21a8"
            filter="url(#glow)"
          />

          <motion.circle
            cx="100"
            cy="75"
            r="3"
            fill="#fef08a"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity
            }}
          />

          <path
            d="M 40 90 L 45 70 L 55 75 L 50 95 Z"
            fill="#8b5cf6"
            opacity="0.8"
          />
          <path
            d="M 160 90 L 155 70 L 145 75 L 150 95 Z"
            fill="#8b5cf6"
            opacity="0.8"
          />

          <motion.ellipse
            cx="80"
            cy="115"
            rx="8"
            ry={blinkEyes ? "1" : "10"}
            fill="#1f2937"
            animate={state === 'talking' ? {
              scaleX: [1, 1.1, 1]
            } : {}}
            transition={{
              duration: 0.3,
              repeat: state === 'talking' ? Infinity : 0
            }}
          />
          <motion.ellipse
            cx="120"
            cy="115"
            rx="8"
            ry={blinkEyes ? "1" : "10"}
            fill="#1f2937"
            animate={state === 'talking' ? {
              scaleX: [1, 1.1, 1]
            } : {}}
            transition={{
              duration: 0.3,
              repeat: state === 'talking' ? Infinity : 0
            }}
          />

          <circle cx="78" cy="113" r="3" fill="#fbbf24" opacity="0.8" />
          <circle cx="118" cy="113" r="3" fill="#fbbf24" opacity="0.8" />

          <motion.path
            d="M 85 135 Q 100 145 115 135"
            stroke="#ec4899"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            animate={state === 'talking' ? {
              d: [
                "M 85 135 Q 100 145 115 135",
                "M 85 135 Q 100 148 115 135",
                "M 85 135 Q 100 145 115 135"
              ]
            } : {}}
            transition={{
              duration: 0.5,
              repeat: state === 'talking' ? Infinity : 0
            }}
          />

          <circle cx="70" cy="125" r="6" fill="#f9a8d4" opacity="0.6" />
          <circle cx="130" cy="125" r="6" fill="#f9a8d4" opacity="0.6" />
        </svg>
      </motion.div>

      {state === 'thinking' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              animate={{
                x: [0, Math.cos(i * 60 * Math.PI / 180) * 80],
                y: [0, Math.sin(i * 60 * Math.PI / 180) * 80],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
