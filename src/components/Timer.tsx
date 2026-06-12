import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface TimerProps {
  timeLeft: number;
  maxTime: number;
}

export function Timer({ timeLeft, maxTime }: TimerProps) {
  const percentage = (timeLeft / maxTime) * 100;
  const isLow = timeLeft <= 5;
  const isMedium = timeLeft <= 10 && timeLeft > 5;

  const colorClass = isLow
    ? 'text-terracotta'
    : isMedium
    ? 'text-soil'
    : 'text-moss';

  const bgClass = isLow
    ? 'bg-terracotta/10 border-terracotta/30'
    : isMedium
    ? 'bg-soil/10 border-soil/30'
    : 'bg-moss/10 border-moss/30';

  return (
    <div className={`flex items-center gap-3 px-4 py-2 rounded-full border-2 ${bgClass} w-fit`}>
      <Clock className={`w-5 h-5 ${colorClass}`} strokeWidth={1.5} />
      <div className="flex flex-col items-center w-20">
        <div className="flex items-baseline gap-1">
          <motion.span
            key={timeLeft}
            initial={{ scale: 1.2, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-xl font-bold tabular-nums font-display ${colorClass}`}
          >
            {timeLeft}
          </motion.span>
          <span className="text-sm text-bark/60">seg</span>
        </div>
        {/* Mini barra de tiempo */}
        <div className="w-full h-1.5 bg-cream rounded-full mt-1 overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${isLow ? 'bg-terracotta' : isMedium ? 'bg-soil' : 'bg-moss'}`}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
}
