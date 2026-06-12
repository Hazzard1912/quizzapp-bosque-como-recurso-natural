import { motion } from 'framer-motion';
import { Leaf, Sprout, TreePine } from 'lucide-react';

interface MilestoneIconProps {
  type: 'seed' | 'sprout' | 'tree';
  active: boolean;
}

export function MilestoneIcon({ type, active }: MilestoneIconProps) {
  const baseColor = active ? 'text-moss' : 'text-sand';
  const bgColor = active ? 'bg-parchment' : 'bg-paper';

  const iconMap = {
    seed: Leaf,
    sprout: Sprout,
    tree: TreePine,
  };

  const Icon = iconMap[type];

  return (
    <motion.div
      className={`flex items-center justify-center rounded-full p-2 ${bgColor} transition-colors duration-500 border ${active ? 'border-gold/40' : 'border-transparent'}`}
      animate={active ? {
        scale: [1, 1.15, 1],
        rotate: [0, type === 'tree' ? 0 : -5, 5, 0],
      } : {}}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <motion.div
        animate={active ? {
          color: ['#6B7B5E', '#3A4D39', '#6B7B5E'],
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Icon className={`w-8 h-8 ${baseColor}`} strokeWidth={active ? 1.8 : 1.5} />
      </motion.div>
    </motion.div>
  );
}
