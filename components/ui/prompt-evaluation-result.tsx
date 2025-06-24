import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Progress } from './progress';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import type { PromptEvaluationResponse } from '@/lib/ai-service';

interface PromptEvaluationResultProps {
  evaluation: PromptEvaluationResponse;
  isLoading?: boolean;
}

export function PromptEvaluationResult({ 
  evaluation, 
  isLoading = false 
}: PromptEvaluationResultProps) {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>평가 중...</CardTitle>
          <CardDescription>
            AI가 프롬프트를 분석하고 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (score >= 60) return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    return <XCircle className="h-5 w-5 text-red-600" />;
  };

  return (
    <div className="space-y-6">
      {/* 종합 점수 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getScoreIcon(evaluation.score)}
            종합 평가 점수
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(evaluation.score)}`}>
              {evaluation.score}점
            </div>
            <div className="text-sm text-gray-500 mt-1">100점 만점</div>
          </div>
        </CardContent>
      </Card>

      {/* 세부 분석 */}
      <Card>
        <CardHeader>
          <CardTitle>세부 분석</CardTitle>
          <CardDescription>
            각 평가 항목별 점수입니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">명확성</span>
                <span className={`text-sm font-bold ${getScoreColor(evaluation.analysis.clarity)}`}>
                  {evaluation.analysis.clarity}점
                </span>
              </div>
              <Progress value={evaluation.analysis.clarity} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">관련성</span>
                <span className={`text-sm font-bold ${getScoreColor(evaluation.analysis.relevance)}`}>
                  {evaluation.analysis.relevance}점
                </span>
              </div>
              <Progress value={evaluation.analysis.relevance} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">창의성</span>
                <span className={`text-sm font-bold ${getScoreColor(evaluation.analysis.creativity)}`}>
                  {evaluation.analysis.creativity}점
                </span>
              </div>
              <Progress value={evaluation.analysis.creativity} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">정확성</span>
                <span className={`text-sm font-bold ${getScoreColor(evaluation.analysis.accuracy)}`}>
                  {evaluation.analysis.accuracy}점
                </span>
              </div>
              <Progress value={evaluation.analysis.accuracy} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 개선 제안 */}
      {evaluation.suggestions && evaluation.suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>개선 제안</CardTitle>
            <CardDescription>
              프롬프트를 더 효과적으로 만들기 위한 제안사항입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {evaluation.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium mt-0.5">
                    {index + 1}
                  </div>
                  <span className="text-sm text-gray-700">{suggestion}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* 강점 */}
      {evaluation.strengths && evaluation.strengths.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              강점
            </CardTitle>
            <CardDescription>
              이 프롬프트의 우수한 점들입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {evaluation.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* 개선 사항 */}
      {evaluation.improvements && evaluation.improvements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              개선 사항
            </CardTitle>
            <CardDescription>
              더 나은 결과를 위한 개선 사항들입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {evaluation.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-xs font-medium mt-0.5">
                    {index + 1}
                  </div>
                  <span className="text-sm text-gray-700">{improvement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
