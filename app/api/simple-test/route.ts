import { NextRequest, NextResponse } from 'next/server';
import { evaluatePrompt } from '@/lib/ai-service-simple';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, evaluationType = 'comprehensive' } = body;

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: '프롬프트를 입력해주세요.' },
        { status: 400 }
      );
    }

    console.log('간소화된 AI 서비스 테스트 시작...');
    console.log('프롬프트:', prompt);

    const result = await evaluatePrompt({
      prompt: prompt.trim(),
      evaluationType,
    });

    console.log('평가 완료:', result);

    return NextResponse.json({
      success: true,
      result: result
    });

  } catch (error) {
    console.error('간소화된 AI 서비스 오류:', error);
    
    return NextResponse.json(
      { 
        error: 'AI 평가 실패',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
