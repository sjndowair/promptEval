"use client"

import { motion } from "framer-motion"

export default function GuidePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-6 text-purple-600 dark:text-blue-400">명확성과 간결성 (Clarity & Brevity)</h1>

        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-purple-500 dark:text-blue-300">효과적인 프롬프트 작성법</h2>
            <p className="mb-4">
              프롬프트가 너무 길거나 중복된 표현 없이, 한눈에 이해될 수 있도록 간결하면서도 분명해야 합니다.
            </p>

            <ul className="list-disc pl-5 space-y-2">
              <li>구체적인 지시사항을 포함하세요</li>
              <li>원하는 출력 형식을 명시하세요</li>
              <li>맥락과 배경 정보를 제공하세요</li>
              <li>복잡한 요청은 단계별로 나누세요</li>
              <li>예시를 포함하면 더 좋은 결과를 얻을 수 있습니다</li>
            </ul>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-purple-500 dark:text-blue-300">피해야 할 사항</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>모호하거나 불분명한 지시사항</li>
              <li>너무 짧거나 정보가 부족한 프롬프트</li>
              <li>일관성 없는 요청사항</li>
              <li>필요 이상으로 복잡한 표현</li>
            </ul>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-purple-500 dark:text-blue-300">평가 기준</h2>
            <p className="mb-4">프롬프트는 다음 기준에 따라 평가됩니다:</p>

            <div className="space-y-3">
              <div>
                <h3 className="font-medium text-purple-600 dark:text-blue-400">명확성 (30%)</h3>
                <p>프롬프트가 얼마나 명확하게 의도를 전달하는지 평가합니다.</p>
              </div>

              <div>
                <h3 className="font-medium text-purple-600 dark:text-blue-400">구체성 (25%)</h3>
                <p>필요한 세부 정보와 제약 조건이 얼마나 잘 포함되어 있는지 평가합니다.</p>
              </div>

              <div>
                <h3 className="font-medium text-purple-600 dark:text-blue-400">맥락 제공 (20%)</h3>
                <p>배경 정보와 맥락이 충분히 제공되었는지 평가합니다.</p>
              </div>

              <div>
                <h3 className="font-medium text-purple-600 dark:text-blue-400">구조 (15%)</h3>
                <p>프롬프트의 구조와 흐름이 논리적인지 평가합니다.</p>
              </div>

              <div>
                <h3 className="font-medium text-purple-600 dark:text-blue-400">간결성 (10%)</h3>
                <p>불필요한 정보 없이 간결하게 작성되었는지 평가합니다.</p>
              </div>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  )
}
