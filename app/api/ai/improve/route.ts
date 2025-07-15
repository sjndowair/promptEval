import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Google Gemini AI 클라이언트 초기화 (서버에서만)
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error('GEMINI_API_KEY is not configured');
}

const genAI = new GoogleGenerativeAI(API_KEY!);

export async function POST(request: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json(
      { error: 'AI 서비스가 구성되지 않았습니다.' },
      { status: 500 }
    );
  }

  try {
    const { prompt, goal } = await request.json();

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: '유효한 프롬프트를 입력해주세요.' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const goalText = goal ? `목표: ${goal}` : '';
    
    const improvementPrompt = `다음 프롬프트를 개선해주세요:
"${prompt}"

${goalText}

개선된 프롬프트와 개선 방안을 JSON 형태로 응답해주세요:
{
  "improvedPrompt": "개선된 프롬프트 텍스트",
  "improvements": ["개선사항1", "개선사항2", "개선사항3"],
  "reasoning": ["개선이유1", "개선이유2", "개선이유3"]
}`;

    const result = await model.generateContent(improvementPrompt);
    const response = await result.response;
    const text = response.text();

    try {
      // JSON 응답 파싱 시도
      const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
      const parsedResult = JSON.parse(cleanedText);
      
      return NextResponse.json(parsedResult);
    } catch (parseError) {
      // JSON 파싱 실패 시 기본 응답 반환
      console.error('JSON 파싱 오류:', parseError);
      return NextResponse.json({
        improvedPrompt: prompt + ' (개선된 버전)',
        improvements: ['AI 응답을 파싱할 수 없어 기본 응답을 제공합니다.'],
        reasoning: ['더 구체적이고 명확한 표현으로 개선할 수 있습니다.']
      });
    }

  } catch (error) {
    console.error('개선 제안 오류:', error);
    return NextResponse.json(
      { error: '개선 제안 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
