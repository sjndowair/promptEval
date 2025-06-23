'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { Badge } from './badge';
import { Clock, Brain, Shield, Star } from 'lucide-react';

export function DemoResults() {
  return (
    <div className="space-y-6">
      {/* 평가 결과 데모 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-500" />
            평가 결과 (데모)
          </CardTitle>
          <CardDescription>
            실제 AI 평가 결과의 예시입니다. Google Gemini API 키를 설정하면 실제 평가를 받을 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">8.5</div>
              <div className="text-sm text-gray-600">명확성</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">9.2</div>
              <div className="text-sm text-gray-600">관련성</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">7.8</div>
              <div className="text-sm text-gray-600">창의성</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">8.9</div>
              <div className="text-sm text-gray-600">정확성</div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">상세 분석</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Badge variant="secondary" className="mt-0.5">강점</Badge>
                <p className="text-sm text-gray-700">
                  프롬프트가 구체적이고 명확한 지시사항을 포함하고 있어 AI가 이해하기 쉽습니다.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="secondary" className="mt-0.5">강점</Badge>
                <p className="text-sm text-gray-700">
                  원하는 결과물의 형식과 길이가 명시되어 있어 일관된 출력을 기대할 수 있습니다.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="destructive" className="mt-0.5">개선점</Badge>
                <p className="text-sm text-gray-700">
                  더 구체적인 맥락 정보를 추가하면 AI의 이해도를 높일 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 개선 제안 데모 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            개선 제안 (데모)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">개선된 프롬프트:</h4>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <pre className="whitespace-pre-wrap text-sm text-green-800 font-mono">
2050년 서울을 배경으로, 감정을 이해하는 AI 로봇 '아리'와 10세 소년 '준호'의 우정을 다룬 500자 단편소설을 써주세요. 

다음 요소를 포함해주세요:
- 두 캐릭터의 첫 만남 장면
- 미래 기술 (홀로그램, 플라잉카 등) 2-3개
- 감정적 교감을 보여주는 구체적 에피소드
- 희망적인 메시지로 마무리

문체: 따뜻하고 감동적인 톤으로 작성해주세요.
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">주요 개선사항:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-medium mt-0.5">1</div>
                  <span className="text-sm text-gray-700">구체적인 배경 설정 추가 (2050년 서울)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-medium mt-0.5">2</div>
                  <span className="text-sm text-gray-700">캐릭터 이름과 나이 명시</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-medium mt-0.5">3</div>
                  <span className="text-sm text-gray-700">포함할 요소들을 구체적으로 나열</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-medium mt-0.5">4</div>
                  <span className="text-sm text-gray-700">원하는 문체와 톤 명시</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 안전성 검사 데모 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-500" />
            안전성 검사 결과 (데모)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="font-medium text-green-800">안전함</span>
                <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">낮은 위험</span>
              </div>
              <p className="text-sm text-green-700">
                이 프롬프트는 적절하고 안전한 콘텐츠를 요청하고 있습니다.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">평가 항목</h4>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>✅ 폭력적 콘텐츠 없음</li>
                <li>✅ 부적절한 언어 없음</li>
                <li>✅ 차별적 표현 없음</li>
                <li>✅ 개인정보 요청 없음</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-yellow-600" />
          <span className="text-sm font-medium text-yellow-800">데모 모드</span>
        </div>
        <p className="text-xs text-yellow-700">
          실제 AI 평가를 받으려면 Google Gemini API 키를 설정해주세요.
        </p>
      </div>
    </div>
  );
}
