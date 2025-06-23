'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Alert, AlertDescription } from './alert';
import { Button } from './button';
import { ExternalLink, Key, Copy, Eye } from 'lucide-react';

interface APIKeySetupGuideProps {
  onShowDemo?: () => void;
}

export function APIKeySetupGuide({ onShowDemo }: APIKeySetupGuideProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="w-5 h-5" />
          Google Gemini API 키 설정
        </CardTitle>
        <CardDescription>
          AI 프롬프트 평가 기능을 사용하려면 Google Gemini API 키가 필요합니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertDescription>
            현재 API 키가 설정되지 않았습니다. 아래 단계를 따라 설정해주세요.
          </AlertDescription>
        </Alert>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
              1
            </div>
            <div className="flex-1">
              <p className="font-medium">Google AI Studio 방문</p>
              <p className="text-sm text-gray-600 mb-2">
                Google AI Studio에서 무료 API 키를 생성하세요.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('https://aistudio.google.com/app/apikey', '_blank')}
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                AI Studio 열기
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
              2
            </div>
            <div className="flex-1">
              <p className="font-medium">API 키 생성</p>
              <p className="text-sm text-gray-600">
                "Create API Key" 버튼을 클릭하여 새로운 API 키를 생성하세요.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
              3
            </div>
            <div className="flex-1">
              <p className="font-medium">환경 변수 설정</p>
              <p className="text-sm text-gray-600 mb-2">
                프로젝트 루트의 <code className="px-1 py-0.5 bg-gray-100 rounded text-xs">.env.local</code> 파일에 API 키를 추가하세요:
              </p>
              <div className="bg-gray-50 p-3 rounded-md font-mono text-sm relative">
                <code>GOOGLE_GEMINI_API_KEY=your_actual_api_key_here</code>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-2 h-6 w-6 p-0"
                  onClick={() => copyToClipboard('GOOGLE_GEMINI_API_KEY=your_actual_api_key_here')}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
              4
            </div>
            <div className="flex-1">
              <p className="font-medium">서버 재시작</p>
              <p className="text-sm text-gray-600">
                환경 변수를 추가한 후 개발 서버를 재시작하세요.
              </p>
            </div>
          </div>
        </div>

        <Alert>
          <AlertDescription>
            <strong>참고:</strong> API 키는 민감한 정보입니다. .env.local 파일이 버전 관리 시스템에 커밋되지 않도록 주의하세요.
          </AlertDescription>
        </Alert>

        {onShowDemo && (
          <div className="pt-4 border-t">
            <Button
              variant="outline"
              onClick={onShowDemo}
              className="w-full flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              데모 결과 보기
            </Button>
            <p className="text-xs text-gray-500 text-center mt-2">
              API 키 없이도 예시 평가 결과를 확인할 수 있습니다
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
