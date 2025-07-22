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
        <h1 className="text-4xl font-bold mb-6 text-purple-600 dark:text-blue-400">프롬프트 작성 가이드</h1>

        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-purple-500 dark:text-blue-300 pt-5">명확성과 간결성 (Clarity & Brevity)</h2>
            
            <ul className="list-disc pl-5 space-y-2 flex flex-col gap-1 flex-start">
              <li>프롬프트가 너무 길거나 중복된 표현 없이, 한눈에 이해될 수 있도록 간결하면서도 분명해야 합니다.</li>
              <li>AI가 핵심 의도를 빠르게 파악할 수 있어야 불필요한 오답을 줄일 수 있습니다.</li>
              <li className="list-none pt-[1rem]"><span className="font-bold text-purple-500 dark:text-blue-300 text-xl">좋은 프롬프트 예시</span>
               {/* <button className="bg-red-700 w-[5rem] h-[2rem]" onClick={() =>analytics.event("test_event", "button_click", "이벤트 발생용 버튼 클릭")}>이벤트 발생용</button> */}
              <br />
              <br />
              <span>“2025년 대한민국의 청년 실업률 추이를 2015년부터 그래프로 그려주세요. <br />X축은 연도, Y축은 실업률(%)로 표시해주세요.”</span></li>
              <li className="list-none pt-[1rem] pb-5"><span className="font-bold text-purple-500 dark:text-blue-300 text-xl">나쁜 프롬프트 예시</span>
              <br />
              <br />
              <span>“한국 청년 고용 시장이 어떻게 변했는지 그래프 좀… 2015년부터 해주시고, 비율이랑 숫자로.”</span></li>
              
            </ul>
          </section>
               <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-purple-500 dark:text-blue-300 pt-5">구체성과 세부사항 (Specificity & Detail)</h2>
            
            <ul className="list-disc pl-5 space-y-2 flex flex-col gap-1 flex-start">
              <li>원하는 결과물의 범위와 수준(길이, 형식, 깊이 등)을 명확히 제시해야 합니다.</li>
              <li>모호하게 “설명해달라”가 아니라 “3가지 예시와 함께 설명”처럼 구체화합니다.</li>
              <li className="list-none pt-[1rem]"><span className="font-bold text-purple-500 dark:text-blue-300 text-xl">좋은 프롬프트 예시</span>
              <br />
              <br />
              <span>“REST API 설계 원칙 5가지를 각각 2문장 이내로 요약하고, 예시 코드를 포함해주세요.”</span></li>
              <li className="list-none pt-[1rem] pb-5"><span className="font-bold text-purple-500 dark:text-blue-300 text-xl">나쁜 프롬프트 예시</span>
              <br />
              <br />
              <span>“REST API 설계 알려줘.”</span></li>
              
            </ul>
          </section>

                <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-purple-500 dark:text-blue-300 pt-5">컨텍스트 및 배경정보 제공 (Context & Background)</h2>
            
            <ul className="list-disc pl-5 space-y-2 flex flex-col gap-1 flex-start">
              <li>AI가 답변을 생성할 때 참고할 수 있는 배경지식, 대상 독자(초급/고급), 사용 환경 등을 제공합니다.</li>
              <li>예: “초보자를 위한”, “React 18 기준으로”, “모바일 앱 관점에서” 등.</li>
              <li className="list-none pt-[1rem]"><span className="font-bold text-purple-500 dark:text-blue-300 text-xl">좋은 프롬프트 예시</span>
              <br />
              <br />
              <span>“React 초보자를 위해, useEffect의 동작 원리를 한국어로 3단계로 설명해주세요.<br /> 코드 예시는 최대 10줄로 해주시고, 각 단계마다 주석을 달아주세요.”</span></li>
              <li className="list-none pt-[1rem] pb-5"><span className="font-bold text-purple-500 dark:text-blue-300 text-xl">나쁜 프롬프트 예시</span>
              <br />
              <br />
              <span>“useEffect가 뭐야?”</span></li>
              
            </ul>
          </section>

                <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-purple-500 dark:text-blue-300 pt-5">형식 및 제약조건 제시 (Constraints & Formatting)</h2>
            
            <ul className="list-disc pl-5 space-y-2 flex flex-col gap-1 flex-start">
              <li>출력 형식(목차, 표, 마크다운, JSON 등)과 글자 수, 단락 수, 금지어 등을 명시합니다.</li>
              <li>이렇게 제약을 두면 일관성 있는 결과를 얻기 쉽습니다.</li>
              <li className="list-none pt-[1rem]"><span className="font-bold text-purple-500 dark:text-blue-300 text-xl">좋은 프롬프트 예시</span>
              <br />
              <br />
              <span>“마크다운 형식으로, H2 제목 3개와 각 제목마다 글머리 기호 4개씩 포함된 투-두 리스트를 만들어주세요.”</span></li>
              <li className="list-none pt-[1rem] pb-5"><span className="font-bold text-purple-500 dark:text-blue-300 text-xl">나쁜 프롬프트 예시</span>
              <br />
              <br />
              <span>“할 일 목록 좀 작성해줘.”</span></li>
              
            </ul>
          </section>

            <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
  <h2 className="text-2xl font-semibold mb-4 text-purple-500 dark:text-blue-300 pt-5">예시 및 출력 포맷 지정 (Examples & Templates)</h2>
  
  <ul className="list-disc pl-5 space-y-2 flex flex-col gap-1 items-start">
    <li>원하는 답변의 샘플(예시 문장, 코드 스니펫, JSON 구조 등)을 직접 제시하면 AI가 이를 모방해 더 정확한 출력을 합니다.</li>
    <li>특히 복잡한 구조물을 요청할 때 효과적입니다.</li>
    <li className="list-none pt-[1rem]">
      <span className="font-bold text-purple-500 dark:text-blue-300 text-xl">좋은 프롬프트 예시</span>
      <br />
      <br />
      <span>“아래 JSON 스키마 예시처럼, 사용자 프로필 정보를 담은 JSON 객체를 하나 생성해 주세요.</span>
      <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded mt-2 overflow-x-auto">
        <code>{`{
  "id": 123,
  "name": "홍길동",
  "email": "hong@example.com",
  "signupDate": "2025-04-21"
}`}</code>
      </pre>
    </li>
    <li className="list-none pt-[1rem] pb-5">
      <span className="font-bold text-purple-500 dark:text-blue-300 text-xl">나쁜 프롬프트 예시</span>
      <br />
      <br />
      <span>“사용자 정보 JSON 만들어줘.”</span>
    </li>
  </ul>
</section>

        </div>
      </motion.div>
      
    </div>
  )
}
