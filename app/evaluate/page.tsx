'use client';

import { useState } from 'react';
import PromptEvaluator from '@/components/ui/prompt-evaluator'
import { SamplePrompts } from '@/components/ui/sample-prompts'

export default function EvaluatePage() {
  const [selectedPrompt, setSelectedPrompt] = useState('');

  const handleSelectPrompt = (prompt: string) => {
    setSelectedPrompt(prompt);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            AI 프롬프트 평가
          </h1>
          <p className="text-lg text-gray-600">
            AI를 활용하여 프롬프트의 품질을 평가하고 개선 방안을 제안받으세요
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PromptEvaluator selectedPrompt={selectedPrompt} />
          </div>
          <div className="lg:col-span-1">
            <SamplePrompts onSelectPrompt={handleSelectPrompt} />
          </div>
        </div>
      </div>
    </div>
  )
}
