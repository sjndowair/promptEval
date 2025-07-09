'use client';

import { useState } from 'react';
import PromptEvaluator from '@/components/ui/prompt-evaluator'
import { SamplePrompts } from '@/components/ui/sample-prompts'
import {useStore} from '@/lib/store'

export default function EvaluatePage() {
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const {user, userTokens, useTokens, refreshUserTokens, setIsLoginModalOpen} = useStore()
  


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
           AI를 활용하여 프롬프트의 품질을 평가하고 개2선 방안을 제안받으세요
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="py-8 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400 dark:from-blue-400 dark:to-blue-600">
            AI 프롬프트 평가
          </h3>
          <p className="text-lg text-gray-600">
            AI를 활용하여 프롬프트의 품질을 평가하고 개선 방안을 제안받으세요
          </p>
        </div>
        
        <div className="grid gird-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PromptEvaluator selectedPrompt={selectedPrompt} />
          </div>
          <div className="lg:col-span-2">
            <SamplePrompts onSelectPrompt={handleSelectPrompt} />
          </div>
        </div>
      </div>
    </div>
  )
}
