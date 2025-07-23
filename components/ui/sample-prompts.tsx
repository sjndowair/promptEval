"use client";

import React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "./button";
import { Copy } from "lucide-react";
import { TokenErrorModal } from "./token-error-modal";

interface SamplePrompt {
  title: string;
  prompt: string;
  category: string;
  description: string;
}

const samplePrompts: SamplePrompt[] = [
  {
    title: "창의적 글쓰기",
    category: "Creative",
    prompt:
      "미래의 도시에서 살아가는 로봇과 인간의 우정을 다룬 500자 단편소설을 써주세요. 감정적인 요소와 미래 기술에 대한 상상력을 포함해주세요.",
    description: "창의적 글쓰기를 위한 구체적이고 상세한 프롬프트",
  },
  {
    title: "기술 문서 작성",
    category: "Technical",
    prompt:
      "React.js에서 커스텀 훅을 만드는 방법에 대한 초보자용 튜토리얼을 작성해주세요. 코드 예제와 주석을 포함하고, 단계별로 설명해주세요.",
    description: "기술 문서 작성을 위한 체계적인 프롬프트",
  },
  {
    title: "비즈니스 분석",
    category: "Business",
    prompt:
      "온라인 쇼핑몰의 고객 이탈률을 줄이기 위한 5가지 전략을 제안해주세요. 각 전략에 대해 구체적인 실행 방법과 예상 효과를 포함해주세요.",
    description: "비즈니스 문제 해결을 위한 구조화된 프롬프트",
  },
  {
    title: "교육 자료",
    category: "Education",
    prompt:
      "중학생을 대상으로 한 '환경 보호의 중요성'에 대한 10분 프레젠테이션 자료를 만들어주세요. 이해하기 쉬운 예시와 실천 방안을 포함해주세요.",
    description: "교육 목적의 명확하고 구체적인 프롬프트",
  },
];

interface SamplePromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

export function SamplePrompts({ onSelectPrompt }: SamplePromptsProps) {
  const [message, setMessage] = useState<string | null>(null)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)


  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsOpenModal(true)
    setMessage("프롬프트가 클립보드에 복사되었습니다.");
    setTimeout(() => {
      setMessage(null);
      setIsOpenModal(false)
    }, 3000)
  };




  

  return (
    <Card className="w-full max-w-full overflow-hidden">
      <CardHeader>
        <CardTitle>샘플 프롬프트</CardTitle>
        <CardDescription>
          다양한 유형의 프롬프트 예시를 참고하여 더 나은 프롬프트를
          작성해보세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
      <TokenErrorModal
      isOpen={isOpenModal}
      tokenError={message}
      onClose={() => setIsOpenModal(false)}
      variant="copy"
       />
            <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
          {samplePrompts.map((sample, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-sm">{sample.title}</h4>
                  <span className="text-xs px-2 py-1 dark:bg-blue-100 dark:text-blue-700 rounded bg-purple-100 text-purple-700">
                    {sample.category}
                  </span>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(sample.prompt)}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <p className="text-xs text-gray-600">{sample.description}</p>

              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-xs">
                <p className="truncate">{sample.prompt}</p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onSelectPrompt(sample.prompt)}
                className="w-full"
              >
                이 프롬프트 사용하기
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
