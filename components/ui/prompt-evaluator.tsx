'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './card';
import { Button } from './button';
import { Textarea } from './textarea';
import { Label } from './label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import { Alert, AlertDescription } from './alert';
import { PromptEvaluationResult } from './prompt-evaluation-result';

import {
  usePromptEvaluation,
  usePromptImprovement,
  usePromptSafetyCheck,
  getAIErrorMessage,
} from '@/lib/ai-queries';
import {
  Loader2,
  Send,
  Shield,
  Lightbulb,
  AlertTriangle,
  XCircle,
} from 'lucide-react';
import type { PromptEvaluationRequest } from '@/lib/ai-service';
import { useStore } from '@/lib/store';
import { TokenDisplay } from './token-display';
import { TokenErrorModal } from './token-error-modal';
import { analytics } from '@/lib/analytics';

interface PromptEvaluatorProps {
  selectedPrompt?: string;
}

export function PromptEvaluator({ selectedPrompt }: PromptEvaluatorProps) {
  const [prompt, setPrompt] = useState('');
  const [evaluationType, setEvaluationType] = useState<
    'quality' | 'safety' | 'performance' | 'comprehensive'
  >('comprehensive');
  const [targetGoal, setTargetGoal] = useState('');
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);
  const [showDemo, setShowDemo] = useState(false);
  const [tokenError, setTokenError] = useState<string | null>(null);

  const evaluationMutation = usePromptEvaluation();
  const improvementMutation = usePromptImprovement();
  const safetyMutation = usePromptSafetyCheck();

  const { user, userTokens, useTokens, setIsLoginModalOpen } = useStore();

  useEffect(() => {
    if (selectedPrompt) {
      setPrompt(selectedPrompt);
    }
  }, [selectedPrompt]);

  // API 키 확인
  useEffect(() => {
    const isCheckedApiKey = async () => {
      try {
        const response = await fetch(`/api/config`);
        const data = await response.json();
        setHasApiKey(!!data.hasApiKey);
      } catch (error) {
        console.log('API 키 확인 중 오류 발생:', error);
        setHasApiKey(false);
      }
    };
    isCheckedApiKey();
  }, []);

  // 로딩 중이거나 API 키가 없으면 가이드 표시
  if (hasApiKey === null) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!hasApiKey && showDemo) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">데모 모드</h2>
          <Button
            variant="outline"
            onClick={() => setShowDemo(false)}
            size="sm"
          >
            설정으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  const handleRunAll = async () => {
    if (!prompt.trim()) return;

    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    // 토큰 체크 (3개 함수를 동시에 실행하지만 5토큰만 사용)
    if (!userTokens || userTokens.totalTokens < 5) {
      setTokenError('토큰이 부족합니다. 5개의 토큰이 필요합니다.');
      setTimeout(() => {
        setTokenError('');
      }, 12000);
      return;
    }

    try {
      const tokenUsed = await useTokens(5);
      if (!tokenUsed) {
        setTokenError('토큰 사용에 실패했습니다. 내일 다시 시도해주세요.');
        setTimeout(() => {
          setTokenError('');
        }, 3000);
        return;
      }

      // 3개 함수 동시 실행
      const request: PromptEvaluationRequest = {
        prompt: prompt.trim(),
        evaluationType: 'comprehensive',
      };

      evaluationMutation.mutate(request);

      improvementMutation.mutate({
        originalPrompt: prompt.trim(),
        targetGoal: targetGoal.trim() || undefined,
      });

      safetyMutation.mutate(prompt.trim());

      //이벤트 추적
      analytics.prompt.submit(prompt.length);
      analytics.prompt.evaluate();
      analytics.prompt.viewResults();
    } catch (err) {
      console.error('종합 평가 실행 오류:', err);
      analytics.error('evaluation_failed', err as string);
    }
  };

  const isLoading =
    evaluationMutation.isPending ||
    improvementMutation.isPending ||
    safetyMutation.isPending;

  return (
    <div className="mx-auto space-y-6">
      <TokenErrorModal
        isOpen={!!tokenError}
        onClose={() => setTokenError(null)}
        tokenError={tokenError}
        userTokens={userTokens}
        variant="error"
      />
      {/* 토큰 상태 표시 */}
      {user && <TokenDisplay />}

      {/* 프롬프트 입력 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle>프롬프트 평가하기</CardTitle>
          <CardDescription>
            평가하고 싶은 프롬프트를 입력하고 AI 분석을 받아보세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="prompt">프롬프트</Label>
            <Textarea
              id="prompt"
              placeholder="평가할 프롬프트를 입력해주세요..."
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              className="mt-2 min-h-[120px]"
            />
          </div>

          <div>
            <Label htmlFor="evaluation-type">평가 유형</Label>
            <Select
              value={evaluationType}
              onValueChange={(value: any) => setEvaluationType(value)}
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="comprehensive">종합 평가</SelectItem>
                <SelectItem value="quality">품질 평가</SelectItem>
                <SelectItem value="safety">안전성 평가</SelectItem>
                <SelectItem value="performance">성능 평가</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="target-goal">목표 (선택사항)</Label>
            <Textarea
              id="target-goal"
              placeholder="프롬프트로 달성하고 싶은 목표를 설명해주세요... (개선 제안에 활용됩니다)"
              value={targetGoal}
              onChange={e => setTargetGoal(e.target.value)}
              className="mt-2 min-h-[80px]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleRunAll}
              disabled={!prompt.trim() || isLoading}
              className="flex items-center gap-2"
            >
              {evaluationMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              평가하기 (5 토큰)
            </Button>
          </div>

          {/* 에러 메시지 */}
          {(evaluationMutation.error ||
            improvementMutation.error ||
            safetyMutation.error) && (
            <Alert variant="destructive">
              <AlertDescription>
                {getAIErrorMessage(
                  evaluationMutation.error ||
                    improvementMutation.error ||
                    safetyMutation.error!
                )}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* 평가 결과 */}
      {(evaluationMutation.data || evaluationMutation.isPending) && (
        <PromptEvaluationResult
          evaluation={evaluationMutation.data!}
          isLoading={evaluationMutation.isPending}
        />
      )}

      {/* 개선 제안 결과 */}
      {improvementMutation.data && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              개선 제과
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-medium">개선된 프롬프트:</h4>
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <pre className="whitespace-pre-wrap font-mono text-sm text-green-800">
                    {improvementMutation.data.improvedPrompt}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-medium">주요 개선사항:</h4>
                <ul className="space-y-1">
                  {improvementMutation.data.improvements.map(
                    (improvement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs font-medium text-green-600">
                          {index + 1}
                        </div>
                        <span className="text-sm text-gray-700">
                          {improvement}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 안전성 검사 결과 */}
      {safetyMutation.data && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              안전성 검사 결과
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div
                className={`rounded-lg p-4 ${
                  safetyMutation.data.isSafe
                    ? 'border border-green-200 bg-green-50'
                    : 'border border-red-200 bg-red-50'
                }`}
              >
                <div className="mb-2 flex items-center gap-2">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      safetyMutation.data.isSafe ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      safetyMutation.data.isSafe
                        ? 'text-green-800'
                        : 'text-red-800'
                    }`}
                  >
                    {safetyMutation.data.isSafe ? '안전함' : '주의 필요'}
                  </span>
                  <span
                    className={`rounded px-2 py-1 text-xs ${
                      safetyMutation.data.severity === 'low'
                        ? 'bg-green-100 text-green-700'
                        : safetyMutation.data.severity === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {safetyMutation.data.severity === 'low'
                      ? '낮은 위험'
                      : safetyMutation.data.severity === 'medium'
                        ? '중간 위험'
                        : '높은 위험'}
                  </span>
                </div>
              </div>

              {safetyMutation.data.concerns.length > 0 && (
                <div>
                  <h4 className="mb-2 font-medium">주의사항:</h4>
                  <ul className="space-y-1">
                    {safetyMutation.data.concerns.map((concern, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-100 text-xs font-medium text-yellow-600">
                          !
                        </div>
                        <span className="text-sm text-gray-700">{concern}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default PromptEvaluator;
