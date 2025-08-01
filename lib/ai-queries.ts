import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  evaluatePrompt,
  improvePrompt,
  checkPromptSafety,
  checkAPIStatus,
  type PromptEvaluationRequest,
  type PromptEvaluationResponse,
  type AIError,
} from './ai-service';

// Query Keys
export const AI_QUERY_KEYS = {
  evaluation: ['prompt-evaluation'] as const,
  improvement: ['prompt-improvement'] as const,
  safety: ['prompt-safety'] as const,
  apiStatus: ['api-status'] as const,
} as const;

// 프롬프트 평가 뮤테이션
export function usePromptEvaluation() {
  const queryClient = useQueryClient();

  return useMutation<
    PromptEvaluationResponse,
    AIError,
    PromptEvaluationRequest
  >({
    mutationFn: evaluatePrompt,
    onSuccess: (data, variables) => {
      // 성공 시 캐시에 저장
      queryClient.setQueryData(
        [...AI_QUERY_KEYS.evaluation, variables.prompt],
        data
      );
    },

    onError: error => {
      console.error('프롬프트 평가 실패:', error);
    },
  });
}

// 프롬프트 개선 뮤테이션
export function usePromptImprovement() {
  const queryClient = useQueryClient();

  return useMutation<
    { improvedPrompt: string; improvements: string[] },
    AIError,
    { originalPrompt: string; targetGoal?: string }
  >({
    mutationFn: ({ originalPrompt, targetGoal }) =>
      improvePrompt(originalPrompt, targetGoal),
    onSuccess: (data, variables) => {
      // 성공 시 캐시에 저장
      queryClient.setQueryData(
        [...AI_QUERY_KEYS.improvement, variables.originalPrompt],
        data
      );
    },
    onError: error => {
      console.error('프롬프트 개선 실패:', error);
    },
  });
}

// 프롬프트 안전성 검사 뮤테이션
export function usePromptSafetyCheck() {
  const queryClient = useQueryClient();

  return useMutation<
    {
      isSafe: boolean;
      concerns: string[];
      severity: 'low' | 'medium' | 'high';
    },
    AIError,
    string
  >({
    mutationFn: checkPromptSafety,
    onSuccess: (data, prompt) => {
      // 성공 시 캐시에 저장
      queryClient.setQueryData([...AI_QUERY_KEYS.safety, prompt], data);
    },
    onError: error => {
      console.error('안전성 검사 실패:', error);
    },
  });
}

// API 상태 확인 쿼리
export function useAPIStatus() {
  return useQuery({
    queryKey: AI_QUERY_KEYS.apiStatus,
    queryFn: checkAPIStatus,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분 (v5에서 cacheTime이 gcTime으로 변경됨)
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// 프롬프트 평가 결과 조회 (캐시된 결과)
export function usePromptEvaluationResult(prompt: string) {
  return useQuery({
    queryKey: [...AI_QUERY_KEYS.evaluation, prompt],
    queryFn: () => evaluatePrompt({ prompt }),
    enabled: false, // 수동으로 실행
    staleTime: 30 * 60 * 1000, // 30분
    gcTime: 60 * 60 * 1000, // 1시간 (v5에서 cacheTime이 gcTime으로 변경됨)
  });
}

// 프롬프트 개선 결과 조회 (캐시된 결과)
export function usePromptImprovementResult(originalPrompt: string) {
  return useQuery({
    queryKey: [...AI_QUERY_KEYS.improvement, originalPrompt],
    queryFn: () => improvePrompt(originalPrompt),
    enabled: false, // 수동으로 실행
    staleTime: 30 * 60 * 1000, // 30분
    gcTime: 60 * 60 * 1000, // 1시간 (v5에서 cacheTime이 gcTime으로 변경됨)
  });
}

// 안전성 검사 결과 조회 (캐시된 결과)
export function usePromptSafetyResult(prompt: string) {
  return useQuery({
    queryKey: [...AI_QUERY_KEYS.safety, prompt],
    queryFn: () => checkPromptSafety(prompt),
    enabled: false, // 수동으로 실행
    staleTime: 30 * 60 * 1000, // 30분
    gcTime: 60 * 60 * 1000, // 1시간 (v5에서 cacheTime이 gcTime으로 변경됨)
  });
}

// AI 에러 메시지 변환
export function getAIErrorMessage(error: AIError): string {
  switch (error.type) {
    case 'API_ERROR':
      if (error.code === 'INVALID_API_KEY') {
        return 'API 키가 올바르지 않습니다. 설정을 확인해주세요.';
      }
      return error.message || 'AI 서비스에서 오류가 발생했습니다.';

    case 'RATE_LIMIT':
      return '요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.';

    case 'NETWORK_ERROR':
      return '네트워크 연결을 확인해주세요.';

    case 'INVALID_INPUT':
      return '입력값이 올바르지 않습니다.';

    default:
      return error.message || '알 수 없는 오류가 발생했습니다.';
  }
}

// 캐시 무효화 헬퍼 함수들
export function useInvalidateAIQueries() {
  const queryClient = useQueryClient();

  const invalidateEvaluations = () => {
    queryClient.invalidateQueries({ queryKey: AI_QUERY_KEYS.evaluation });
  };

  const invalidateImprovements = () => {
    queryClient.invalidateQueries({ queryKey: AI_QUERY_KEYS.improvement });
  };

  const invalidateSafetyChecks = () => {
    queryClient.invalidateQueries({ queryKey: AI_QUERY_KEYS.safety });
  };

  const invalidateAPIStatus = () => {
    queryClient.invalidateQueries({ queryKey: AI_QUERY_KEYS.apiStatus });
  };

  const invalidateAll = () => {
    invalidateEvaluations();
    invalidateImprovements();
    invalidateSafetyChecks();
    invalidateAPIStatus();
  };

  return {
    invalidateEvaluations,
    invalidateImprovements,
    invalidateSafetyChecks,
    invalidateAPIStatus,
    invalidateAll,
  };
}

// 배치 처리를 위한 훅 (여러 프롬프트 동시 평가)
export function useBatchPromptEvaluation() {
  const queryClient = useQueryClient();

  return useMutation<
    PromptEvaluationResponse[],
    AIError,
    PromptEvaluationRequest[]
  >({
    mutationFn: async requests => {
      // 병렬로 여러 프롬프트 평가
      const results = await Promise.allSettled(
        requests.map(request => evaluatePrompt(request))
      );

      // 실패한 요청 처리
      const successResults: PromptEvaluationResponse[] = [];
      const errors: AIError[] = [];

      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          successResults.push(result.value);
          // 성공한 결과를 캐시에 저장
          queryClient.setQueryData(
            [...AI_QUERY_KEYS.evaluation, requests[index].prompt],
            result.value
          );
        } else {
          errors.push(result.reason);
        }
      });

      if (errors.length > 0 && successResults.length === 0) {
        throw errors[0]; // 모두 실패한 경우 첫 번째 에러 던지기
      }

      return successResults;
    },
    onError: error => {
      console.error('배치 프롬프트 평가 실패:', error);
    },
  });
}
