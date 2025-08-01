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
    const { prompt, evaluationType } = await request.json();

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: '유효한 프롬프트를 입력해주세요.' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    let evaluationPrompt = '';

    switch (evaluationType) {
      case 'quality':
        evaluationPrompt = `다음 프롬프트의 품질을 평가해주세요:
"${prompt}"

다음 기준으로 1-10점 척도로 평가하고 JSON 형태로 응답해주세요:
{
  "score": 전체점수(1-10),
  "analysis": {
    "clarity": 명확성점수(1-10),
    "relevance": 관련성점수(1-10),
    "creativity": 창의성점수(1-10),
    "accuracy": 정확성점수(1-10)
  },
  "suggestions": ["개선제안1", "개선제안2", "개선제안3"],
  "strengths": ["강점1", "강점2", "강점3"],
  "improvements": ["개선점1", "개선점2", "개선점3"]
}`;
        break;

      case 'safety':
        evaluationPrompt = `다음 프롬프트의 안전성을 검사해주세요:
"${prompt}"

부적절한 콘텐츠, 편향성, 잠재적 위험 요소를 분석하고 JSON 형태로 응답해주세요:
{
  "isSafe": true/false,
  "concerns": ["우려사항1", "우려사항2"],
  "severity": "low/medium/high"
}`;
        break;

      case 'performance':
        evaluationPrompt = `다음 프롬프트의 성능을 평가해주세요:
"${prompt}"

AI 모델과의 호환성과 응답 품질을 예측하여 JSON 형태로 응답해주세요:
{
  "score": 전체점수(1-10),
  "analysis": {
    "clarity": 명확성점수(1-10),
    "relevance": 관련성점수(1-10),
    "creativity": 창의성점수(1-10),
    "accuracy": 정확성점수(1-10)
  },
  "suggestions": ["성능개선제안1", "성능개선제안2"],
  "strengths": ["성능강점1", "성능강점2"],
  "improvements": ["성능개선점1", "성능개선점2"]
}`;
        break;

      case 'comprehensive':
      default:
        evaluationPrompt = `다음 프롬프트를 종합적으로 평가해주세요:
"${prompt}"

품질, 안전성, 성능을 모두 고려하여 JSON 형태로 응답해주세요:
{
  "score": 전체점수(1-10),
  "analysis": {
    "clarity": 명확성점수(1-10),
    "relevance": 관련성점수(1-10),
    "creativity": 창의성점수(1-10),
    "accuracy": 정확성점수(1-10)
  },
  "suggestions": ["종합개선제안1", "종합개선제안2", "종합개선제안3"],
  "strengths": ["강점1", "강점2", "강점3"],
  "improvements": ["개선점1", "개선점2", "개선점3"]
}`;
        break;
    }

    const result = await model.generateContent(evaluationPrompt);
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
        score: 7,
        analysis: {
          clarity: 7,
          relevance: 7,
          creativity: 7,
          accuracy: 7,
        },
        suggestions: ['AI 응답을 파싱할 수 없어 기본 응답을 제공합니다.'],
        strengths: ['프롬프트가 제공되었습니다.'],
        improvements: ['더 구체적인 요청을 해보세요.'],
      });
    }
  } catch (error) {
    console.error('AI 평가 오류:', error);
    return NextResponse.json(
      { error: 'AI 평가 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
