import { GoogleGenerativeAI } from '@google/generative-ai';

// Google Gemini AI 클라이언트 초기화
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY

const genAI = new GoogleGenerativeAI(API_KEY!);


export interface PromptEvaluationRequest {
  prompt: string;
  evaluationType?: 'quality' | 'safety' | 'performance' | 'comprehensive';
}

export interface PromptEvaluationResponse {
  score: number;
  analysis: {
    clarity: number;
    relevance: number;
    creativity: number;
    accuracy: number;
  };
  suggestions: string[];
  strengths: string[];
  improvements: string[];
}

export interface AIError {
  message: string;
  code?: string;
  type: 'API_ERROR' | 'RATE_LIMIT' | 'INVALID_INPUT' | 'NETWORK_ERROR';
}

// 간소화된 프롬프트 평가 함수
export async function evaluatePrompt(
  request: PromptEvaluationRequest
): Promise<PromptEvaluationResponse> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const evaluationPrompt = `다음 프롬프트를 평가해주세요 (한국어로 응답):

프롬프트: "${request.prompt}"

다음 형식의 JSON으로만 응답해주세요:
{
  "score": 85,
  "analysis": {
    "clarity": 90,
    "relevance": 85,
    "creativity": 80,
    "accuracy": 85
  },
  "suggestions": ["구체적인 예시 추가", "더 명확한 지시사항"],
  "strengths": ["명확한 목표", "적절한 길이"],
  "improvements": ["세부사항 보완", "맥락 정보 추가"]
}`;

    const result = await model.generateContent(evaluationPrompt);
    const response = await result.response;
    const text = response.text();

    // JSON 추출 및 파싱
    let jsonText = text.trim();
    
    // 마크다운 코드 블록 제거
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/, '').replace(/\n?```$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/, '').replace(/\n?```$/, '');
    }

    try {
      return JSON.parse(jsonText);
    } catch (parseError) {
      console.error('JSON 파싱 실패, 원본 텍스트:', text);
      // 파싱 실패 시 기본값 반환
      return {
        score: 75,
        analysis: {
          clarity: 75,
          relevance: 75,
          creativity: 75,
          accuracy: 75
        },
        suggestions: ["AI 응답 파싱 오류로 인한 기본 제안"],
        strengths: ["평가를 위한 기본 강점"],
        improvements: ["더 구체적인 분석을 위해 다시 시도해보세요"]
      };
    }
  } catch (error) {
    console.error('AI 평가 오류:', error);
    throw {
      message: error instanceof Error ? error.message : 'AI 평가 중 오류가 발생했습니다.',
      type: 'API_ERROR' as const
    };
  }
}

// 프롬프트 개선 함수
export async function improvePrompt(
  originalPrompt: string,
  targetGoal?: string
): Promise<{ improvedPrompt: string; improvements: string[] }> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const improvementPrompt = `다음 프롬프트를 개선해주세요:

원본 프롬프트: "${originalPrompt}"
${targetGoal ? `목표: ${targetGoal}` : ''}

다음 형식의 JSON으로만 응답해주세요:
{
  "improvedPrompt": "개선된 프롬프트 내용",
  "improvements": ["개선사항 1", "개선사항 2", "개선사항 3"]
}`;

    const result = await model.generateContent(improvementPrompt);
    const response = await result.response;
    const text = response.text();

    let jsonText = text.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/, '').replace(/\n?```$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/, '').replace(/\n?```$/, '');
    }

    try {
      return JSON.parse(jsonText);
    } catch (parseError) {
      return {
        improvedPrompt: `${originalPrompt}\n\n[AI 개선 제안: 더 구체적인 맥락과 예시를 추가하고, 명확한 형식을 지정해보세요.]`,
        improvements: ["AI 응답 파싱 오류로 인한 기본 개선사항"]
      };
    }
  } catch (error) {
    console.error('프롬프트 개선 오류:', error);
    throw {
      message: error instanceof Error ? error.message : '프롬프트 개선 중 오류가 발생했습니다.',
      type: 'API_ERROR' as const
    };
  }
}

// 안전성 검사 함수
export async function checkPromptSafety(
  prompt: string
): Promise<{ isSafe: boolean; concerns: string[]; severity: 'low' | 'medium' | 'high' }> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const safetyPrompt = `다음 프롬프트의 안전성을 평가해주세요:

프롬프트: "${prompt}"

다음 형식의 JSON으로만 응답해주세요:
{
  "isSafe": true,
  "concerns": ["우려사항이 있다면 나열"],
  "severity": "low"
}

severity는 "low", "medium", "high" 중 하나여야 합니다.`;

    const result = await model.generateContent(safetyPrompt);
    const response = await result.response;
    const text = response.text();

    let jsonText = text.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/, '').replace(/\n?```$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/, '').replace(/\n?```$/, '');
    }

    try {
      return JSON.parse(jsonText);
    } catch (parseError) {
      return {
        isSafe: true,
        concerns: [],
        severity: 'low' as const
      };
    }
  } catch (error) {
    console.error('안전성 검사 오류:', error);
    throw {
      message: error instanceof Error ? error.message : '안전성 검사 중 오류가 발생했습니다.',
      type: 'API_ERROR' as const
    };
  }
}

// API 상태 확인 함수
export async function checkAPIStatus(): Promise<boolean> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent('Hello');
    return true;
  } catch (error) {
    console.error('API 상태 확인 실패:', error);
    return false;
  }
}
