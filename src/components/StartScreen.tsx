import { motion } from 'framer-motion';
import { TreePine, Play } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        {/* Logo/Icono */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="mb-8"
        >
          <TreePine className="w-20 h-20 text-moss mx-auto" strokeWidth={1.2} />
        </motion.div>

        <h1 className="text-5xl md:text-6xl font-display text-bark mb-3 leading-tight">
          Bosque Quiz
        </h1>
        <div className="w-24 h-px bg-gold mx-auto mb-6" />
        <p className="text-lg text-leaf font-light mb-2">
          ¿Qué tanto sabes sobre el aprovechamiento forestal?
        </p>
        <p className="text-sm text-soil mb-10">
          Responde las preguntas antes de que se acabe el tiempo. Cada segundo cuenta.
        </p>

        {/* Reglas */}
        <div className="bg-parchment/60 rounded-2xl p-6 shadow-sm border border-sand mb-10 text-left backdrop-blur-sm">
          <h3 className="font-display text-xl text-bark mb-4 text-center">Reglas del juego</h3>
          <ul className="space-y-3 text-sm text-bark/80">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-moss flex-shrink-0 mt-2" />
              <span className="leading-relaxed">Tienes <strong className="text-bark">45 segundos</strong> por cada pregunta.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-moss flex-shrink-0 mt-2" />
              <span className="leading-relaxed">Base de <strong className="text-bark">1,000 puntos</strong> por respuesta correcta.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-moss flex-shrink-0 mt-2" />
              <span className="leading-relaxed"><strong className="text-bark">Bonus de tiempo</strong>: responde más rápido para ganar más puntos.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-moss flex-shrink-0 mt-2" />
              <span className="leading-relaxed"><strong className="text-bark">Bonus de racha</strong>: +100 pts por cada respuesta correcta seguida.</span>
            </li>
          </ul>
        </div>

        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="inline-flex items-center gap-3 bg-moss hover:bg-bark text-white text-lg font-semibold px-8 py-4 rounded-full shadow-md transition-colors duration-300"
        >
          <Play className="w-5 h-5" />
          ¡Comenzar!
        </motion.button>
      </motion.div>
    </div>
  );
}
