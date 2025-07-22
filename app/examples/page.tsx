"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgressBar } from "@/components/progress-bar"
import { analysis } from "@/lib/analytics"

export default function ExamplesPage() {
  const examples = [
    {
      title: "웹 개발 프로젝트 요청",
      prompt:
        "React와 Next.js를 사용하여 온라인 쇼핑몰을 개발해주세요. 제품 목록, 상세 페이지, 장바구니, 결제 기능이 필요합니다. 디자인은 미니멀하고 모던한 스타일로 해주세요.",
      scores: {
        clarity: 85,
        specificity: 70,
        context: 60,
        structure: 75,
        conciseness: 80,
      },
    },
    {
      title: "데이터 분석 요청",
      prompt:
        "지난 3개월간의 웹사이트 트래픽 데이터를 분석하여 사용자 행동 패턴을 파악하고 싶습니다. 특히 전환율이 높은 페이지와 이탈률이 높은 페이지를 비교하여 개선점을 도출해주세요. CSV 형식으로 데이터를 제공할 예정입니다.",
      scores: {
        clarity: 90,
        specificity: 85,
        context: 75,
        structure: 80,
        conciseness: 70,
      },
    },
    {
      title: "디자인 요청",
      prompt: "모바일 앱의 로그인 화면을 디자인해주세요.",
      scores: {
        clarity: 40,
        specificity: 20,
        context: 15,
        structure: 50,
        conciseness: 90,
      },
    },
    {
      title: "콘텐츠 작성 요청",
      prompt:
        "AI 기술의 윤리적 측면에 대한 블로그 글을 작성해주세요. 현재 AI가 직면한 윤리적 도전과 이를 해결하기 위한 접근 방식을 다루어야 합니다. 약 1000단어 분량으로, 전문가와 일반 독자 모두가 이해할 수 있는 수준으로 작성해주세요. 참고할 만한 최신 연구나 사례도 포함해주세요.",
      scores: {
        clarity: 95,
        specificity: 90,
        context: 85,
        structure: 90,
        conciseness: 75,
      },
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-purple-600 dark:text-blue-400">프롬프트 예시</h1>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-6 md:grid-cols-2">
        {examples.map((example, index) => {
          const totalScore =
            example.scores.clarity * 0.3 +
            example.scores.specificity * 0.25 +
            example.scores.context * 0.2 +
            example.scores.structure * 0.15 +
            example.scores.conciseness * 0.1

          return (
            <motion.div key={index} variants={item}>
              <Card>
               
                <CardHeader>
                  <CardTitle className="text-purple-600 dark:text-blue-400">{example.title}</CardTitle>
                  <CardDescription>총점: {totalScore.toFixed(1)}%</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">프롬프트:</p>
                    <p className="text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded">{example.prompt}</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <button className="bg-red-700 w-[100rem] h-[10rem]" onClick={() =>analysis.event("test_event", "button_click", "이벤트 발생용 버튼 클릭")}>이벤트 발생용</button>
                        <span>명확성</span>
                        <span>{example.scores.clarity}%</span>
                      </div>
                      <ProgressBar value={example.scores.clarity} />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>구체성</span>
                        <span>{example.scores.specificity}%</span>
                      </div>
                      <ProgressBar value={example.scores.specificity} />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>맥락 제공</span>
                        <span>{example.scores.context}%</span>
                      </div>
                      <ProgressBar value={example.scores.context} />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>구조</span>
                        <span>{example.scores.structure}%</span>
                      </div>
                      <ProgressBar value={example.scores.structure} />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>간결성</span>
                        <span>{example.scores.conciseness}%</span>
                      </div>
                      <ProgressBar value={example.scores.conciseness} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
