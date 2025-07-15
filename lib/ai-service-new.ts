// AI 서비스 - API 라우트를 통한 서버 사이드 처리

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

// API 호출 헬퍼 함수
async function callAIAPI(endpoint: string, data: any) {
  const response = await fetch(`/api/ai/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `API 요청 실패: ${response.status}`);
  }

  return response.json();
}

// 종합 프롬프트 평가 함수
export async function evaluatePrompt({
  prompt,
  evaluationType = 'comprehensive'
}: PromptEvaluationRequest): Promise<PromptEvaluationResponse> {
  try {
    const result = await callAIAPI('evaluate', { prompt, evaluationType });
    return result;
  } catch (error) {
    console.error('프롬프트 평가 오류:', error);
    throw {
      message: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
      type: 'API_ERROR' as const
    };
  }
}

// 품질 평가 함수
export async function evaluatePromptQuality(prompt: string): Promise<PromptEvaluationResponse> {
  try {
    const result = await callAIAPI('evaluate', { prompt, evaluationType: 'quality' });
    return result;
  } catch (error) {
    console.error('품질 평가 오류:', error);
    throw {
      message: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
      type: 'API_ERROR' as const
    };
  }
}

// 성능 평가 함수
export async function evaluatePromptPerformance(prompt: string): Promise<PromptEvaluationResponse> {
  try {
    const result = await callAIAPI('evaluate', { prompt, evaluationType: 'performance' });
    return result;
  } catch (error) {
    console.error('성능 평가 오류:', error);
    throw {
      message: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
      type: 'API_ERROR' as const
    };
  }
}

// 안전성 검사 함수
export async function checkPromptSafety(
  prompt: string
): Promise<{ isSafe: boolean; concerns: string[]; severity: 'low' | 'medium' | 'high' }> {
  try {
    const result = await callAIAPI('safety', { prompt });
    return result;
  } catch (error) {
    console.error('안전성 검사 오류:', error);
    throw {
      message: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
      type: 'API_ERROR' as const
    };
  }
}

// 프롬프트 개선 제안 함수
export async function improvePrompt(
  prompt: string,
  goal?: string
): Promise<{ improvedPrompt: string; improvements: string[]; reasoning: string[] }> {
  try {
    const result = await callAIAPI('improve', { prompt, goal });
    return result;
  } catch (error) {
    console.error('개선 제안 오류:', error);
    throw {
      message: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
      type: 'API_ERROR' as const
    };
  }
}

// API 상태 확인 함수
export async function checkAPIStatus(): Promise<boolean> {
  try {
    const response = await fetch('/api/ai/evaluate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: 'test', evaluationType: 'comprehensive' }),
    });
    return response.ok;
  } catch (error) {
    console.error('API 상태 확인 실패:', error);
    return false;
  }
}
