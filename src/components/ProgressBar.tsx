import { motion } from 'framer-motion';
import { Truck } from 'lucide-react';
import { MilestoneIcon } from './MilestoneIcon';

interface ProgressBarProps {
  current: number;
  total: number;
  orientation?: 'horizontal' | 'vertical';
}

export function ProgressBar({ current, total, orientation = 'horizontal' }: ProgressBarProps) {
  const progress = ((current + 1) / total) * 100;
  const milestone2Index = Math.floor(total / 2);

  if (orientation === 'vertical') {
    return (
      <div className="flex items-center gap-3 h-72">
        {/* Hitos - Semilla abajo, Árbol arriba */}
        <div className="relative h-full flex flex-col justify-between items-end py-1">
          {/* Árbol */}
          <div className="flex flex-col items-center gap-1">
            <MilestoneIcon type="tree" active={current === total - 1} />
            <span className={`text-xs font-semibold ${current === total - 1 ? 'text-moss' : 'text-sand'}`}>
              Árbol
            </span>
          </div>

          {/* Retoño */}
          <div className="flex flex-col items-center gap-1">
            <MilestoneIcon type="sprout" active={current >= milestone2Index} />
            <span className={`text-xs font-semibold ${current >= milestone2Index ? 'text-moss' : 'text-sand'}`}>
              Retoño
            </span>
          </div>

          {/* Semilla */}
          <div className="flex flex-col items-center gap-1">
            <MilestoneIcon type="seed" active={current >= 0} />
            <span className={`text-xs font-semibold ${current >= 0 ? 'text-moss' : 'text-sand'}`}>
              Semilla
            </span>
          </div>
        </div>

        {/* Barra vertical */}
        <div className="relative h-full w-6 bg-parchment rounded-full overflow-hidden border border-sand/50">
          {/* Fondo con patron sutil */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_#3A4D39_1px,_transparent_1px)] bg-[length:8px_8px]" />

          {/* Barra de avance - crece de abajo a arriba */}
          <motion.div
            className="absolute bottom-0 w-full bg-gradient-to-t from-leaf to-moss rounded-full"
            initial={{ height: 0 }}
            animate={{ height: `${progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />

          {/* Carro de carga */}
          <motion.div
            className="absolute left-1/2 z-10 -translate-x-1/2"
            animate={{ bottom: `${progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              className="flex items-center justify-center w-7 h-7 bg-cream rounded-full shadow-sm border border-sand -translate-y-1/2"
              animate={{ 
                scale: [1, 1.05, 1],
                x: [0, -1, 0]
              }}
              transition={{ 
                duration: 0.8, 
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <Truck className="w-3.5 h-3.5 text-bark -rotate-90" />
            </motion.div>
          </motion.div>
        </div>

        {/* Texto de progreso */}
        <div className="flex items-center h-full">
          <span className="text-xs font-medium text-bark/60">
            {current + 1}/{total}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Contenedor de hitos */}
      <div className="relative flex items-center justify-between mb-3 px-2">
        {/* Semilla */}
        <div className="flex flex-col items-center gap-1 z-10">
          <MilestoneIcon type="seed" active={current >= 0} />
          <span className={`text-xs font-semibold ${current >= 0 ? 'text-moss' : 'text-sand'}`}>
            Semilla
          </span>
        </div>

        {/* Retoño */}
        <div className="flex flex-col items-center gap-1 z-10">
          <MilestoneIcon type="sprout" active={current >= milestone2Index} />
          <span className={`text-xs font-semibold ${current >= milestone2Index ? 'text-moss' : 'text-sand'}`}>
            Retoño
          </span>
        </div>

        {/* Árbol */}
        <div className="flex flex-col items-center gap-1 z-10">
          <MilestoneIcon type="tree" active={current === total - 1} />
          <span className={`text-xs font-semibold ${current === total - 1 ? 'text-moss' : 'text-sand'}`}>
            Árbol
          </span>
        </div>
      </div>

      {/* Barra de progreso con carro de carga */}
      <div className="relative h-4 bg-parchment rounded-full overflow-hidden border border-sand/50">
        {/* Fondo con patron sutil */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_#3A4D39_1px,_transparent_1px)] bg-[length:8px_8px]" />

        {/* Barra de avance */}
        <motion.div
          className="h-full bg-gradient-to-r from-leaf to-moss rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        {/* Carro de carga */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 z-10"
          animate={{ left: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="flex items-center justify-center w-7 h-7 bg-cream rounded-full shadow-sm border border-sand -translate-x-1/2"
            animate={{ 
              scale: [1, 1.05, 1],
              y: [0, -1, 0]
            }}
            transition={{ 
              duration: 0.8, 
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <Truck className="w-3.5 h-3.5 text-bark" />
          </motion.div>
        </motion.div>
      </div>

      {/* Texto de progreso */}
      <div className="text-center mt-2">
        <span className="text-sm font-medium text-bark/60">
          Pregunta {current + 1} de {total}
        </span>
      </div>
    </div>
  );
}
