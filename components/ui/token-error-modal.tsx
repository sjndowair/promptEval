'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, XCircle, Import } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ITokenErrorModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  tokenError?: string | null;
  userTokens?: { totalTokens: number } | null;
  variant?: 'error' | 'copy';
}

export const TokenErrorModal = ({
  isOpen,
  onClose,
  tokenError,
  userTokens,
  variant,
}: ITokenErrorModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: [0, -5, 5, -3, 3, -1, 1, 0],
          }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            duration: 0,
            x: { duration: 0, ease: 'easeInOut' },
          }}
          className="w-full max-w-lg"
        >
          <div
            className="fixed inset-0 bg-white/20 backdrop-blur-md dark:bg-black/20"
            onClick={onClose}
          />

          <motion.div
            className="from-white-500 to-white-600 relative rounded-xl border border-purple-400 bg-gradient-to-r p-4 text-white shadow-2xl dark:border-blue-600 dark:bg-black dark:bg-gradient-to-r"
            animate={{ rotate: [0, -1, 1, -1, 1, 0] }}
            transition={{
              rotate: { duration: 0.5, ease: 'easeInOut', delay: 0.2 },
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.div
                  className="border-1 rounded-full border-purple-500 bg-white bg-opacity-20 p-2 dark:border-blue-500 dark:bg-black"
                  animate={{ rotate: [0, -15, 15, -10, 10, -5, 5, 0] }}
                  transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.1 }}
                >
                  {variant === 'error' && (
                    <AlertTriangle className="h-6 w-6 text-purple-500 dark:text-blue-700" />
                  )}
                  {variant === 'copy' && (
                    <Import className="h-6 w-6 text-purple-500 dark:text-blue-700" />
                  )}
                </motion.div>
                {variant === 'error' && (
                  <div>
                    <motion.div
                      className="text-xl font-bold text-purple-500 dark:text-blue-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      토큰이 부족합니다.
                    </motion.div>
                    <motion.div
                      className="mt-1 text-sm text-purple-500 dark:text-blue-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {tokenError}
                    </motion.div>
                    {userTokens && (
                      <motion.div
                        className="mt-1 rounded bg-purple-500 px-2 py-1 text-xs text-purple-100 dark:bg-blue-700"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        현재: {userTokens.totalTokens}개 토큰 | 필요: 5개 토큰
                      </motion.div>
                    )}
                  </div>
                )}
                {variant === 'copy' && (
                  <div>
                    <motion.div
                      className="text-xl font-bold text-purple-500 dark:text-blue-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      복사가 완료되었습니다!
                    </motion.div>
                    <motion.div
                      className="mt-1 text-sm text-purple-500 dark:text-blue-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {tokenError}
                    </motion.div>
                  </div>
                )}
              </div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-10 w-10 rounded-full p-0 text-purple-500 hover:bg-purple-400 hover:bg-opacity-10 dark:text-blue-500 dark:hover:bg-blue-400 dark:hover:bg-opacity-10"
                >
                  <XCircle className="h-6 w-6" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
