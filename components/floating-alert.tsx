"use client"

import {motion, AnimatePresence} from "framer-motion"
import {AlertTriangle, X} from "lucide-react"
import { Alert, AlertDescription } from "./ui/alert"
import { Button } from "./ui/button"

interface IFloatingAlertProps {
    isVisible?: boolean;
    onClose?: () => void;
    onLoginClick?: () => void;
    title?: string;
    description?: string
}


export const  FloatingAlert = ({isVisible, onClose, onLoginClick, title, description}: IFloatingAlertProps) => {
 
 return(<AnimatePresence>
    {isVisible && (
        <>
        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm "
         />
         <motion.div >
            <Alert
            variant="warning"
            className="shadow-lg border-2"
            >
                <AlertTriangle className="h-5 w-5" />
                <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute right-[1.25rem] z-100
                 top-[0.25rem] pr-[1.75rem]
                  w-10 rounded-s-sm" 
                >
                    <X className="h-3 w-3" />
                    <span className="sr-only">닫기</span>
                </Button>
                <AlertDescription>
                <div className="pr-8">
                  <div className="font-medium text-purple-800 dark:text-blue-200 mb-2">{title}</div>
                  {description && <div className="text-purple-600 dark:text-blue-300 mb-3 text-sm">{description}</div>}
                  <button
                    onClick={onLoginClick}
                    className="inline-flex items-center text-sm font-medium text-purple-700 dark:text-blue-300 hover:text-purple-800 dark:hover:text-blue-200 underline hover:no-underline transition-colors"
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
)
}