import { motion } from 'framer-motion';
import { Star, Zap } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
  streak: number;
  correctCount: number;
  totalQuestions: number;
}

export function ScoreDisplay({ score, streak, correctCount, totalQuestions }: ScoreDisplayProps) {
  return (
    <div className="flex items-center justify-center gap-4 flex-wrap">
      <motion.div
        className="flex items-center gap-2 bg-bark text-cream px-4 py-2 rounded-full shadow-md"
        animate={streak > 1 ? { scale: [1, 1.05, 1] } : {}}
        transition={{ repeat: streak > 1 ? Infinity : 0, duration: 1 }}
      >
        <Star className="w-4 h-4 text-gold fill-gold" />
        <span className="font-semibold text-lg tabular-nums font-display">{score.toLocaleString()}</span>
      </motion.div>

      {streak > 1 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-1 bg-gold/20 text-bark px-3 py-1 rounded-full text-sm font-bold border border-gold/30"
        >
          <Zap className="w-4 h-4 text-gold" />
          Racha x{streak}
        </motion.div>
      )}

      <div className="flex items-center gap-2 bg-parchment text-bark px-4 py-2 rounded-full border border-sand/50">
        <span className="font-medium text-sm">
          {correctCount}/{totalQuestions} correctas
        </span>
      </div>
    </div>
  );
}
