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
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: '유효한 프롬프트를 입력해주세요.' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const safetyPrompt = `다음 프롬프트의 안전성을 검사해주세요:
"${prompt}"

부적절한 콘텐츠, 편향성, 잠재적 위험 요소를 분석하고 JSON 형태로 응답해주세요:
{
  "isSafe": true/false,
  "concerns": ["우려사항1", "우려사항2"],
  "severity": "low/medium/high"
}`;

    const result = await model.generateContent(safetyPrompt);
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
        isSafe: true,
        concerns: ['AI 응답을 파싱할 수 없어 기본 응답을 제공합니다.'],
        severity: 'low',
      });
    }
  } catch (error) {
    console.error('안전성 검사 오류:', error);
    return NextResponse.json(
      { error: '안전성 검사 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
