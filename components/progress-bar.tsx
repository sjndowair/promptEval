'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
}

export function ProgressBar({ value }: ProgressBarProps) {
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
      <motion.div
        className="h-2.5 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 dark:from-blue-600 dark:to-blue-400"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </div>
  );
}
