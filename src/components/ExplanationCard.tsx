import { motion } from 'framer-motion';
import { Lightbulb, ArrowRight } from 'lucide-react';

interface ExplanationCardProps {
  explanation: string;
  isCorrect: boolean;
  onNext: () => void;
}

export function ExplanationCard({ explanation, isCorrect, onNext }: ExplanationCardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`rounded-xl p-5 border ${isCorrect ? 'bg-moss/5 border-moss/20' : 'bg-terracotta/5 border-terracotta/20'}`}
      >
        <div className="flex items-start gap-3">
          <Lightbulb className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isCorrect ? 'text-moss' : 'text-terracotta'}`} strokeWidth={1.5} />
          <div className="flex-1">
            <p className={`text-sm font-semibold mb-1 ${isCorrect ? 'text-moss' : 'text-terracotta'}`}>
              {isCorrect ? '¡Correcto!' : 'La respuesta correcta es:'}
            </p>
            <p className={`text-sm leading-relaxed ${isCorrect ? 'text-bark/70' : 'text-bark/70'}`}>
              {explanation}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="flex justify-center mt-5">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={onNext}
          className="inline-flex items-center gap-2 bg-moss hover:bg-bark text-white font-semibold px-6 py-3 rounded-full shadow-md transition-colors duration-300"
        >
          Siguiente
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
