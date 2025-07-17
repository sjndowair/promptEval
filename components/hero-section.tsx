"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useStore } from "@/lib/store"
import { FloatingAlert } from "./floating-alert"
import { TokenDisplay } from "./ui/token-display"



export function HeroSection() {
  const [isVisble, setIsVisible] = useState<boolean>(false)
  const {user,  userTokens, refreshUserTokens, setIsLoginModalOpen} = useStore()
  
  const isHandleLoginClick = () => {
    setIsVisible(true)
    setTimeout(() => {
      setIsVisible(false)
    }, 3000)
    
  }
console.log(isVisble)
  useEffect(() => {
     if(user && !userTokens){
      refreshUserTokens?.()
     }
  },[user, userTokens, refreshUserTokens])



  return (
    <section className={`${user ? `py-[4rem]` : 'py-[10rem]'} `}>
      
         {user && (
          <div className="max-w-xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <TokenDisplay />
          </motion.div>
          </div>
       )}
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400 dark:from-blue-400 dark:to-blue-600">
              프롬프트 평가 서비스
            </h1>
          </motion.div>
          <br />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400"
          >
            <p>
              더 효과적인 프롬프트 작성을 위한 평가 서비스입니다. 프롬프트를 입력하면 명확성, 구체성, 맥락 제공, 구조,
              간결성 등의 기준으로 평가하여 개선점을 제안해 드립니다.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {user ? ( 
              <Link href="/evaluate">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex h-10 items-center justify-center rounded-md bg-purple-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus-visible:ring-blue-300"
            >

              시작하기
            </motion.div>
            </Link>) : (
              <motion.div
              onClick={isHandleLoginClick}
                whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex h-10 items-center justify-center rounded-md bg-purple-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus-visible:ring-blue-300"
              >
               시작하기 
              </motion.div>
            )}
           
            <Link href="/guide">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }} 
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
            > 
              가이드 보기
            </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>

    

      <FloatingAlert
      isVisible={isVisble}
      onClose={() => setIsVisible(false)}
      onLoginClick={() => setIsLoginModalOpen(true)}
      title="로그인이 필요합니다"
      description="프롬프트 평가 서비스를 이용하려면 로그인이 필요합니다."
      ></FloatingAlert>
    </section>
  )
}
