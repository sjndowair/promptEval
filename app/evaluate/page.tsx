'use client';

import { useState, useEffect } from 'react';
import PromptEvaluator from '@/components/ui/prompt-evaluator';
import { SamplePrompts } from '@/components/ui/sample-prompts';
import { useStore } from '@/lib/store';
import { set } from 'zod';

export default function EvaluatePage() {
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const { user, refreshUserTokens } = useStore();

  useEffect(() => {
    if (user) {
      refreshUserTokens?.();
    }
  }, [user, refreshUserTokens]);

  const handleSelectPrompt = (prompt: string) => {
    setSelectedPrompt(prompt);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text py-8 text-3xl font-bold tracking-tighter text-transparent dark:from-blue-400 dark:to-blue-600 sm:text-4xl md:text-5xl lg:text-6xl/none">
              AI 프롬프트 평가
            </h1>
            <p className="text-lg text-gray-600">
              로그인 후 이용가능한 컨텐츠입니다.
              <br />
              AI를 활용하여 프롬프트의 품질을 평가하고 개선 방안을 제안받으세요
            </p>
          </div>

          <div className="gird-cols-3 grid gap-8">
            <div className="lg:col-span-2"></div>
            <div className="lg:col-span-2">
              <SamplePrompts onSelectPrompt={handleSelectPrompt} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h3 className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text py-8 text-2xl font-bold tracking-tighter text-transparent dark:from-blue-400 dark:to-blue-600 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            AI 프롬프트 평가
          </h3>
          <p className="px-4 text-base text-gray-600 sm:text-lg">
            AI를 활용하여 프롬프트의 품질을 평가하고 개선 방안을 제안받으세요
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-1 lg:gap-8">
          <div className="order-1 w-full lg:order-1 lg:col-span-2">
            <PromptEvaluator selectedPrompt={selectedPrompt} />
          </div>
          <div className="order-1 w-full lg:col-span-1">
            <SamplePrompts onSelectPrompt={handleSelectPrompt} />
          </div>
        </div>
      </div>
    </div>
  );
}
