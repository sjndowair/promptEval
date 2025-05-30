"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgressBar } from "@/components/progress-bar"
import { useStore } from "@/lib/store"
import { useEvaluatePrompt } from "@/lib/queries"
import { Spinner } from "@/components/ui/spinner"
import { EvaluationSkeleton } from "@/components/evaluation-skeleton"

export default function PromptEvaluator() {
  const [prompt, setPrompt] = useState("")
  const { isEvaluating, setIsEvaluating } = useStore()
  const { mutate: evaluatePrompt, isPending, data: evaluation } = useEvaluatePrompt()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setIsEvaluating(true)
    evaluatePrompt(prompt)
  }

  return (
    <section id="evaluator" className="py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-600 dark:text-blue-400">프롬프트 평가하기</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Textarea
              placeholder="평가할 프롬프트를 입력하세요..."
              className="min-h-[200px] resize-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isPending}
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!prompt.trim() || isPending}
              className="bg-purple-600 hover:bg-purple-700 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Spinner size="sm" />
                  평가 중...
                </span>
              ) : (
                "평가하기"
              )}
            </Button>
          </div>
        </form>

        <AnimatePresence mode="wait">
          {isPending && <EvaluationSkeleton key="skeleton" />}

          {evaluation && !isPending && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <Card>
                <CardHeader>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <CardTitle className="text-purple-600 dark:text-blue-400">프롬프트 평가 결과</CardTitle>
                    <CardDescription>총점: {evaluation.totalScore.toFixed(1)}%</CardDescription>
                  </motion.div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {[
                      {
                        key: "clarity",
                        label: "명확성 (30%)",
                        value: evaluation.clarity,
                        feedback: evaluation.clarityFeedback,
                      },
                      {
                        key: "specificity",
                        label: "구체성 (25%)",
                        value: evaluation.specificity,
                        feedback: evaluation.specificityFeedback,
                      },
                      {
                        key: "context",
                        label: "맥락 제공 (20%)",
                        value: evaluation.context,
                        feedback: evaluation.contextFeedback,
                      },
                      {
                        key: "structure",
                        label: "구조 (15%)",
                        value: evaluation.structure,
                        feedback: evaluation.structureFeedback,
                      },
                      {
                        key: "conciseness",
                        label: "간결성 (10%)",
                        value: evaluation.conciseness,
                        feedback: evaluation.concisenessFeedback,
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={item.key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                      >
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{item.label}</span>
                          <span className="text-sm font-medium">{item.value}%</span>
                        </div>
                        <ProgressBar value={item.value} />
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.feedback}</p>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 }}
                    className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md"
                  >
                    <h3 className="text-sm font-medium mb-2">개선 제안</h3>
                    <p className="text-sm">{evaluation.suggestions}</p>
                  </motion.div>
                </CardContent>
                <CardFooter>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="w-full"
                  >
                    <Button variant="outline" onClick={() => setPrompt(evaluation.improvedPrompt)} className="w-full">
                      개선된 프롬프트 적용하기
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
