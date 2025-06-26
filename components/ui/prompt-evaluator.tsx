'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { Textarea } from './textarea';
import { Label } from './label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Alert, AlertDescription } from './alert';
import { PromptEvaluationResult } from './prompt-evaluation-result';
import { DemoResults } from './demo-results';
import { 
  usePromptEvaluation, 
  usePromptImprovement,
  usePromptSafetyCheck,
  getAIErrorMessage 
} from '@/lib/ai-queries';
import { Loader2, Send, Shield, Lightbulb } from 'lucide-react';
import type { PromptEvaluationRequest } from '@/lib/ai-service';


interface PromptEvaluatorProps {
  selectedPrompt?: string;
}

export function PromptEvaluator({ selectedPrompt }: PromptEvaluatorProps) {
  const [prompt, setPrompt] = useState('');
  const [evaluationType, setEvaluationType] = useState<'quality' | 'safety' | 'performance' | 'comprehensive'>('comprehensive');
  const [targetGoal, setTargetGoal] = useState('');
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);
  const [showDemo, setShowDemo] = useState(false);


  // selectedPrompt가 변경되면 prompt 상태 업데이트
  useEffect(() => {
    if (selectedPrompt) {
      setPrompt(selectedPrompt);
    }
  }, [selectedPrompt]);

  const evaluationMutation = usePromptEvaluation();
  const improvementMutation = usePromptImprovement();
  const safetyMutation = usePromptSafetyCheck();

  // API 키 확인
  useEffect(() => {
    const isCheckedApiKey = async () => {
      try{
          const response = await fetch(`/api/config`)
          const data = await response.json()
          setHasApiKey(!!data.hasApiKey)
      }catch(error){
        console.log("API 키 확인 중 오류 발생:", error);
        setHasApiKey(false);
      }
    }
    isCheckedApiKey()
  }, []);

  // 로딩 중이거나 API 키가 없으면 가이드 표시
  if (hasApiKey === null) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin" />
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
        <DemoResults />
      </div>
    );
  }

  const handleEvaluate = () => {
    if (!prompt.trim()) return;

    const request: PromptEvaluationRequest = {
      prompt: prompt.trim(),
      evaluationType,
    };

    evaluationMutation.mutate(request);
  };

  const handleImprove = () => {
    if (!prompt.trim()) return;

    improvementMutation.mutate({
      originalPrompt: prompt.trim(),
      targetGoal: targetGoal.trim() || undefined,
    });
  };

  const handleSafetyCheck = () => {
    if (!prompt.trim()) return;

    safetyMutation.mutate(prompt.trim());
  };

  const handleRunAll = () => {
    handleEvaluate();
    handleImprove();
    handleSafetyCheck();
      
  }

  const isLoading = evaluationMutation.isPending || improvementMutation.isPending || safetyMutation.isPending;

  return (
    <div className="mx-auto space-y-6">
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
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px] mt-2"
            />
          </div>

          <div>
            <Label htmlFor="evaluation-type">평가 유형</Label>
            <Select value={evaluationType} onValueChange={(value: any) => setEvaluationType(value)}>
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
              onChange={(e) => setTargetGoal(e.target.value)}
              className="min-h-[80px] mt-2"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
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
              평가하기
            </Button>
          </div>

       
          {/* 에러 메시지 */}
          {(evaluationMutation.error || improvementMutation.error || safetyMutation.error) && (
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
                <h4 className="font-medium mb-2">개선된 프롬프트:</h4>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <pre className="whitespace-pre-wrap text-sm text-green-800 font-mono">
                    {improvementMutation.data.improvedPrompt}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">주요 개선사항:</h4>
                <ul className="space-y-1">
                  {improvementMutation.data.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-medium mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-sm text-gray-700">{improvement}</span>
                    </li>
                  ))}
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
              <div className={`p-4 rounded-lg ${
                safetyMutation.data.isSafe 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${
                    safetyMutation.data.isSafe ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <span className={`font-medium ${
                    safetyMutation.data.isSafe ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {safetyMutation.data.isSafe ? '안전함' : '주의 필요'}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    safetyMutation.data.severity === 'low' ? 'bg-green-100 text-green-700' :
                    safetyMutation.data.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {safetyMutation.data.severity === 'low' ? '낮은 위험' :
                     safetyMutation.data.severity === 'medium' ? '중간 위험' : '높은 위험'}
                  </span>
                </div>
              </div>

              {safetyMutation.data.concerns.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">주의사항:</h4>
                  <ul className="space-y-1">
                    {safetyMutation.data.concerns.map((concern, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-xs font-medium mt-0.5">
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
  )
};

export default PromptEvaluator;
