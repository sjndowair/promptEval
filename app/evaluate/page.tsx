'use client';

import { useState, useEffect } from 'react';
import PromptEvaluator from '@/components/ui/prompt-evaluator'
import { SamplePrompts } from '@/components/ui/sample-prompts'
import {useStore} from '@/lib/store'
import { set } from 'zod';



export default function EvaluatePage() {
 
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const {user, refreshUserTokens} = useStore()
  

  useEffect(() => {
    if(user){
      refreshUserTokens?.()
    }
  },[user, refreshUserTokens])

 


  const handleSelectPrompt = (prompt: string) => {
    setSelectedPrompt(prompt);
    
  };

  if(!user){
    return (
          <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="py-8 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400 dark:from-blue-400 dark:to-blue-600">
            AI 프롬프트 평가
          </h1>
          <p className="text-lg text-gray-600">
           로그인 후 이용가능한 컨텐츠입니다.
           <br />
           AI를 활용하여 프롬프트의 품질을 평가하고 개선 방안을 제안받으세요
          </p>
        </div>
        
        <div className="grid gird-cols-3 gap-8">
          <div className="lg:col-span-2">
          </div>
          <div className="lg:col-span-2">
            <SamplePrompts onSelectPrompt={handleSelectPrompt} />
          </div>
        </div>
      </div>
    </div>
    )
  }

  return (
    
       <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="py-8 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400 dark:from-blue-400 dark:to-blue-600">
            AI 프롬프트 평가
          </h3>
          <p className="text-base sm:text-lg text-gray-600 px-4">
            AI를 활용하여 프롬프트의 품질을 평가하고 개선 방안을 제안받으세요
          </p>
        </div>
        
        {/* 🔧 수정: 반응형 그리드 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 lg:gap-8">
          {/* 메인 컨텐츠 - 모바일에서는 전체 너비, 데스크탑에서는 2/3 */}
          <div className="w-full lg:col-span-2 order-1 lg:order-1">
            <PromptEvaluator selectedPrompt={selectedPrompt} />
          </div>
          {/* 사이드바 - 모바일에서는 전체 너비, 데스크탑에서는 1/3 */}
          <div className="w-full lg:col-span-1 order-1">
            <SamplePrompts onSelectPrompt={handleSelectPrompt}  />
          </div>
        </div>
      </div>
    </div>
  )
}
