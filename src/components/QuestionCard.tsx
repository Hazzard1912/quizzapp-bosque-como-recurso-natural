import { motion } from 'framer-motion';

interface QuestionCardProps {
  question: string;
  currentIndex: number;
  image?: string;
}

export function QuestionCard({ question, currentIndex, image }: QuestionCardProps) {
  return (
    <motion.div
      key={currentIndex}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="bg-cream rounded-2xl shadow-sm border border-sand overflow-hidden mb-8 w-full max-w-2xl mx-auto"
    >
      {/* Imagen de la pregunta - mostrada completa sin recortar */}
      {image && (
        <div className="w-full bg-parchment/40 p-4 md:p-6">
          <div className="relative bg-paper rounded-xl border border-sand/60 overflow-hidden shadow-sm">
            <img
              src={`${import.meta.env.BASE_URL}images/${image}`}
              alt={`Ilustración pregunta ${currentIndex + 1}`}
              className="w-full h-auto object-contain"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        </div>
      )}

      {/* Contenido de la pregunta */}
      <div className="p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-parchment border border-gold/40 flex items-center justify-center text-bark font-bold text-lg font-display">
            {currentIndex + 1}
          </div>
          <h2 className="text-xl md:text-2xl font-display text-bark leading-snug pt-0.5">
            {question}
          </h2>
        </div>
      </div>
    </motion.div>
  );
}
