import { motion } from 'framer-motion';
import { Trophy, RotateCcw, TreePine, Star, Award } from 'lucide-react';
import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';

interface GameOverProps {
  score: number;
  correctCount: number;
  totalQuestions: number;
  onRestart: () => void;
}

export function GameOver({ score, correctCount, totalQuestions, onRestart }: GameOverProps) {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getMessage = () => {
    if (percentage === 100) return '¡Perfecto! Eres un experto forestal.';
    if (percentage >= 80) return '¡Excelente! Tienes un gran conocimiento del bosque.';
    if (percentage >= 60) return '¡Bien hecho! Sigue aprendiendo sobre el aprovechamiento forestal.';
    if (percentage >= 40) return '¡Puedes mejorar! El bosque tiene mucho que enseñarte.';
    return '¡No te rindas! Cada pregunta es una semilla de conocimiento.';
  };

  const getRank = () => {
    if (percentage === 100) return 'Guardabosques Legendario';
    if (percentage >= 80) return 'Ingeniero Forestal';
    if (percentage >= 60) return 'Explorador del Bosque';
    if (percentage >= 40) return 'Semilla de Saber';
    return 'Aspirante a Retoño';
  };

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center p-4">
      {percentage >= 60 && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={200} />}

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="bg-cream rounded-3xl shadow-lg border border-sand p-8 md:p-10 max-w-md w-full text-center relative"
      >
        {/* Sello decorativo */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
          <motion.div
            initial={{ y: -20, opacity: 0, rotate: -10 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="w-12 h-12 bg-moss rounded-full flex items-center justify-center shadow-md border-4 border-cream"
          >
            <Award className="w-6 h-6 text-cream" />
          </motion.div>
        </div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4"
        >
          <Trophy className="w-14 h-14 text-gold mx-auto mb-3" strokeWidth={1.5} />
        </motion.div>

        <h2 className="text-3xl font-display text-bark mb-2">¡Juego terminado!</h2>
        <div className="w-16 h-px bg-gold mx-auto mb-4" />
        <p className="text-bark/70 mb-8 text-sm leading-relaxed">{getMessage()}</p>

        {/* Puntaje */}
        <div className="bg-parchment/50 rounded-2xl p-6 mb-6 border border-sand/60">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="w-4 h-4 text-gold fill-gold" />
            <span className="text-xs font-semibold text-bark/60 uppercase tracking-widest">Puntaje final</span>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="text-5xl font-display text-bark mb-2"
          >
            {score.toLocaleString()}
          </motion.div>
          <div className="text-bark/60 font-medium text-sm">
            {correctCount} / {totalQuestions} respuestas correctas
          </div>
          <div className="mt-4 w-full bg-sand/30 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-leaf to-moss"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ delay: 0.8, duration: 1 }}
            />
          </div>
          <div className="text-xs text-bark/50 mt-2 font-medium">{percentage}% de acierto</div>
        </div>

        {/* Rango */}
        <div className="flex items-center justify-center gap-2 mb-8 bg-parchment rounded-full py-2 px-5 border border-sand/50">
          <TreePine className="w-4 h-4 text-moss" strokeWidth={1.5} />
          <span className="font-semibold text-sm text-bark">{getRank()}</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={onRestart}
          className="inline-flex items-center gap-2 bg-moss hover:bg-bark text-white text-lg font-semibold px-6 py-3 rounded-full shadow-md transition-colors duration-300"
        >
          <RotateCcw className="w-5 h-5" />
          Jugar de nuevo
        </motion.button>
      </motion.div>
    </div>
  );
}
