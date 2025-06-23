import { GoogleGenerativeAI } from '@google/generative-ai';

// Google Gemini AI 클라이언트 초기화
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export interface PromptEvaluationRequest {
  prompt: string;
  criteria?: string[];
  evaluationType?: 'quality' | 'safety' | 'performance' | 'comprehensive';
}

export interface PromptEvaluationResponse {
  score: number; // 0-100
  analysis: {
    clarity: number;
    specificity: number;
    completeness: number;
    effectiveness: number;
  };
  suggestions: string[];
  improvedPrompt?: string;
  risks?: string[];
  tags?: string[];
}

export interface AIError {
  message: string;
  code?: string;
  type: 'API_ERROR' | 'RATE_LIMIT' | 'INVALID_INPUT' | 'NETWORK_ERROR';
}

// 프롬프트 평가 함수
export async function evaluatePrompt(
  request: PromptEvaluationRequest
): Promise<PromptEvaluationResponse> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const evaluationPrompt = createEvaluationPrompt(request);
    
    const result = await model.generateContent(evaluationPrompt);
    const response = await result.response;
    const text = response.text();

    return parseAIResponse(text);
  } catch (error) {
    throw handleAIError(error);
  }
}

// 프롬프트 개선 제안 함수
export async function improvePrompt(
  originalPrompt: string,
  targetGoal?: string
): Promise<{ improvedPrompt: string; improvements: string[] }> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const improvementPrompt = `
당신은 프롬프트 엔지니어링 전문가입니다. 다음 프롬프트를 분석하고 개선된 버전을 제공해주세요.

원본 프롬프트: "${originalPrompt}"
${targetGoal ? `목표: ${targetGoal}` : ''}

다음 JSON 형식으로 응답해주세요:
{
  "improvedPrompt": "개선된 프롬프트",
  "improvements": ["개선 사항 1", "개선 사항 2", "개선 사항 3"]
}

개선 시 고려사항:
1. 명확성과 구체성
2. 컨텍스트 제공
3. 원하는 출력 형식 명시
4. 예시나 제약 조건 추가
5. 단계별 지시사항
`;

    const result = await model.generateContent(improvementPrompt);
    const response = await result.response;
    const text = response.text();

    return JSON.parse(text.replace(/```json|```/g, '').trim());
  } catch (error) {
    throw handleAIError(error);
  }
}

// 프롬프트 안전성 검사 함수
export async function checkPromptSafety(
  prompt: string
): Promise<{ isSafe: boolean; concerns: string[]; severity: 'low' | 'medium' | 'high' }> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const safetyPrompt = `
다음 프롬프트의 안전성을 평가해주세요:

프롬프트: "${prompt}"

다음 기준으로 평가해주세요:
1. 유해한 콘텐츠 생성 가능성
2. 편향이나 차별적 내용
3. 개인정보 노출 위험
4. 불법적 활동 조장
5. 부적절한 내용

JSON 형식으로 응답해주세요:
{
  "isSafe": true/false,
  "concerns": ["우려사항들"],
  "severity": "low/medium/high"
}
`;

    const result = await model.generateContent(safetyPrompt);
    const response = await result.response;
    const text = response.text();

    return JSON.parse(text.replace(/```json|```/g, '').trim());
  } catch (error) {
    throw handleAIError(error);
  }
}

// 평가 프롬프트 생성
function createEvaluationPrompt(request: PromptEvaluationRequest): string {
  const { prompt, criteria = [], evaluationType = 'comprehensive' } = request;

  const basePrompt = `
당신은 프롬프트 엔지니어링 전문가입니다. 다음 프롬프트를 평가해주세요.

평가할 프롬프트: "${prompt}"

평가 유형: ${evaluationType}
${criteria.length > 0 ? `추가 평가 기준: ${criteria.join(', ')}` : ''}

다음 JSON 형식으로 응답해주세요:
{
  "score": 0-100 사이의 점수,
  "analysis": {
    "clarity": 0-100 (명확성),
    "specificity": 0-100 (구체성),
    "completeness": 0-100 (완성도),
    "effectiveness": 0-100 (효과성)
  },
  "suggestions": ["개선 제안 1", "개선 제안 2", "개선 제안 3"],
  "improvedPrompt": "개선된 프롬프트 (선택사항)",
  "risks": ["잠재적 위험 요소들"],
  "tags": ["관련 태그들"]
}

평가 기준:
1. 명확성: 프롬프트가 얼마나 명확하고 이해하기 쉬운가
2. 구체성: 구체적인 지시사항과 요구사항이 포함되어 있는가
3. 완성도: 필요한 모든 정보가 포함되어 있는가
4. 효과성: 원하는 결과를 얻을 가능성이 높은가
`;

  return basePrompt;
}

// AI 응답 파싱
function parseAIResponse(text: string): PromptEvaluationResponse {
  try {
    // JSON 형식의 응답에서 코드 블록 제거
    const cleanText = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleanText);

    return {
      score: Math.min(100, Math.max(0, parsed.score || 0)),
      analysis: {
        clarity: Math.min(100, Math.max(0, parsed.analysis?.clarity || 0)),
        specificity: Math.min(100, Math.max(0, parsed.analysis?.specificity || 0)),
        completeness: Math.min(100, Math.max(0, parsed.analysis?.completeness || 0)),
        effectiveness: Math.min(100, Math.max(0, parsed.analysis?.effectiveness || 0)),
      },
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
      improvedPrompt: parsed.improvedPrompt || undefined,
      risks: Array.isArray(parsed.risks) ? parsed.risks : [],
      tags: Array.isArray(parsed.tags) ? parsed.tags : [],
    };
  } catch (error) {
    throw new Error('AI 응답을 파싱할 수 없습니다.');
  }
}

// 한국어 에러 메시지 매핑
const ERROR_MESSAGES = {
  API_KEY_MISSING: 'Google Gemini API 키가 설정되지 않았습니다. 환경 변수를 확인해주세요.',
  QUOTA_EXCEEDED: 'API 사용량 한도에 도달했습니다. 잠시 후 다시 시도해주세요.',
  INVALID_REQUEST: '잘못된 요청입니다. 프롬프트를 확인해주세요.',
  NETWORK_ERROR: '네트워크 연결에 문제가 있습니다. 인터넷 연결을 확인해주세요.',
  GENERAL_ERROR: 'AI 서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
  SAFETY_BLOCK: '안전성 정책에 의해 차단된 콘텐츠입니다. 다른 프롬프트를 시도해주세요.',
} as const;

// 에러 처리 함수
export function getAIErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    
    if (message.includes('api key')) {
      return ERROR_MESSAGES.API_KEY_MISSING;
    }
    if (message.includes('quota') || message.includes('limit')) {
      return ERROR_MESSAGES.QUOTA_EXCEEDED;
    }
    if (message.includes('safety') || message.includes('blocked')) {
      return ERROR_MESSAGES.SAFETY_BLOCK;
    }
    if (message.includes('network') || message.includes('fetch')) {
      return ERROR_MESSAGES.NETWORK_ERROR;
    }
    if (message.includes('invalid')) {
      return ERROR_MESSAGES.INVALID_REQUEST;
    }
  }
  
  return ERROR_MESSAGES.GENERAL_ERROR;
}

// AI 에러 처리
function handleAIError(error: any): AIError {
  if (error.message?.includes('API key')) {
    return {
      message: 'API 키가 올바르지 않습니다.',
      code: 'INVALID_API_KEY',
      type: 'API_ERROR',
    };
  }

  if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
    return {
      message: '요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.',
      code: 'RATE_LIMIT',
      type: 'RATE_LIMIT',
    };
  }

  if (error.message?.includes('network') || error.code === 'ENOTFOUND') {
    return {
      message: '네트워크 연결을 확인해주세요.',
      code: 'NETWORK_ERROR',
      type: 'NETWORK_ERROR',
    };
  }

  return {
    message: error.message || 'AI 서비스에서 오류가 발생했습니다.',
    type: 'API_ERROR',
  };
}

// API 상태 확인
export async function checkAPIStatus(): Promise<{ isHealthy: boolean; latency?: number }> {
  const startTime = Date.now();
  
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    await model.generateContent('Hello');
    
    return {
      isHealthy: true,
      latency: Date.now() - startTime,
    };
  } catch (error) {
    return {
      isHealthy: false,
    };
  }
}
