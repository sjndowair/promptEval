import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    
    const body = await request.json();
    const { prompt } = body;

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: '프롬프트를 입력해주세요.' },
        { status: 400 }
      );
    }

    console.log('API 키 확인:', !!process.env.GOOGLE_GEMINI_API_KEY);
    console.log('테스트 프롬프트:', prompt);

    // Google Gemini AI 직접 테스트
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const testPrompt = `다음 프롬프트를 간단히 평가해주세요 (한국어로 응답):

프롬프트: "${prompt}"

1-10점 사이의 점수와 간단한 코멘트를 JSON 형식으로 답해주세요:
{
  "score": 점수,
  "comment": "간단한 평가"
}`;

    console.log('AI 모델 호출 시작...');
    const result = await model.generateContent(testPrompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('AI 응답:', text);

    return NextResponse.json({
      success: true,
      prompt: prompt,
      aiResponse: text,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('직접 테스트 오류:', error);
    
    return NextResponse.json(
      { 
        error: 'AI 테스트 실패',
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
