"use client"

import { useMutation } from "@tanstack/react-query"

interface EvaluationResult {
  clarity: number
  specificity: number
  context: number
  structure: number
  conciseness: number
  totalScore: number
  clarityFeedback: string
  specificityFeedback: string
  contextFeedback: string
  structureFeedback: string
  concisenessFeedback: string
  suggestions: string
  improvedPrompt: string
}

// 실제 API 호출 대신 모의 평가 함수
const mockEvaluatePrompt = async (prompt: string): Promise<EvaluationResult> => {
  // 실제 구현에서는 API 호출로 대체
  return new Promise((resolve) => {
    setTimeout(() => {
      // 간단한 평가 로직 (실제로는 서버에서 처리)
      const length = prompt.length
      const wordCount = prompt.split(/\s+/).filter(Boolean).length

      // 간단한 점수 계산 (실제로는 더 복잡한 알고리즘 사용)
      const clarity = Math.min(Math.max(30 + wordCount / 2, 0), 100)
      const specificity = Math.min(Math.max(20 + length / 10, 0), 100)
      const context = Math.min(Math.max(40 + wordCount / 3, 0), 100)
      const structure = Math.min(Math.max(50 + (prompt.includes(".") ? 30 : 0), 0), 100)
      const conciseness = Math.min(Math.max(100 - length / 20, 0), 100)

      const totalScore = clarity * 0.3 + specificity * 0.25 + context * 0.2 + structure * 0.15 + conciseness * 0.1

      resolve({
        clarity,
        specificity,
        context,
        structure,
        conciseness,
        totalScore,
        clarityFeedback: "프롬프트의 의도가 명확하게 전달되었습니다.",
        specificityFeedback: "더 구체적인 요구사항을 추가하면 좋을 것 같습니다.",
        contextFeedback: "배경 정보가 충분히 제공되었습니다.",
        structureFeedback: "프롬프트의 구조가 논리적입니다.",
        concisenessFeedback: "불필요한 정보 없이 간결하게 작성되었습니다.",
        suggestions: "더 나은 결과를 위해 구체적인 예시를 추가해보세요.",
        improvedPrompt: prompt + "\n\n예시: [여기에 예시를 추가하세요]",
      })
    }, 2000) // 로딩 상태를 더 잘 보여주기 위해 2초로 지연 시간 증가
  })
}

export function useEvaluatePrompt() {
  return useMutation({
    mutationFn: mockEvaluatePrompt,
  })
}
