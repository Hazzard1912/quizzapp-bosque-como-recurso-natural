import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface AnswerOptionsProps {
  options: string[];
  selectedIndex: number | null;
  correctIndex: number;
  isAnswered: boolean;
  onSelect: (index: number) => void;
}

export function AnswerOptions({
  options,
  selectedIndex,
  correctIndex,
  isAnswered,
  onSelect,
}: AnswerOptionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mx-auto">
      {options.map((option, index) => {
        const isSelected = selectedIndex === index;
        const isCorrect = index === correctIndex;
        const showCorrect = isAnswered && isCorrect;
        const showWrong = isAnswered && isSelected && !isCorrect;
        const showMissed = isAnswered && !isSelected && isCorrect;

        let buttonClass = 'bg-cream hover:bg-parchment border-sand text-bark';
        let icon = null;

        if (showCorrect) {
          buttonClass = 'bg-moss/10 border-moss text-moss shadow-sm';
          icon = <CheckCircle2 className="w-6 h-6 text-moss" />;
        } else if (showWrong) {
          buttonClass = 'bg-terracotta/10 border-terracotta text-terracotta shadow-sm';
          icon = <XCircle className="w-6 h-6 text-terracotta" />;
        } else if (showMissed) {
          buttonClass = 'bg-moss/5 border-moss/40 text-moss border-dashed';
          icon = <AlertCircle className="w-6 h-6 text-moss/70" />;
        } else if (isSelected) {
          buttonClass = 'bg-parchment border-gold text-bark';
        }

        return (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={!isAnswered ? { scale: 1.02 } : {}}
            whileTap={!isAnswered ? { scale: 0.98 } : {}}
            onClick={() => !isAnswered && onSelect(index)}
            disabled={isAnswered}
            className={`
              relative flex items-center gap-3 p-4 rounded-xl border-2 text-left
              transition-colors duration-200 font-medium
              ${buttonClass}
              ${isAnswered ? 'cursor-default' : 'cursor-pointer'}
            `}
          >
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/80 border border-current flex items-center justify-center font-bold text-sm font-display">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="flex-1">{option}</span>
            {icon && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              >
                {icon}
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
