'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';

interface IFloatingAlertProps {
  isVisible?: boolean;
  onClose?: () => void;
  onLoginClick?: () => void;
  title?: string;
  description?: string;
}

export const FloatingAlert = ({
  isVisible,
  onClose,
  onLoginClick,
  title,
  description,
}: IFloatingAlertProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
          />
          <motion.div>
            <Alert variant="warning" className="border-2 shadow-lg">
              <AlertTriangle className="h-5 w-5" />
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="z-100 absolute right-[1.25rem] top-[0.25rem] w-10 rounded-s-sm pr-[1.75rem]"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">닫기</span>
              </Button>
              <AlertDescription>
                <div className="pr-8">
                  <div className="mb-2 font-medium text-purple-800 dark:text-blue-200">
                    {title}
                  </div>
                  {description && (
                    <div className="mb-3 text-sm text-purple-600 dark:text-blue-300">
                      {description}
                    </div>
                  )}
                  <button
                    onClick={onLoginClick}
                    className="inline-flex items-center text-sm font-medium text-purple-700 underline transition-colors hover:text-purple-800 hover:no-underline dark:text-blue-300 dark:hover:text-blue-200"
                  >
                    로그인하러 가기 →
                  </button>
                </div>
              </AlertDescription>
            </Alert>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
