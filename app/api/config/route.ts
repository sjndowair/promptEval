import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const hasApiKey = !!process.env.GEMINI_API_KEY && 
    process.env.GEMINI_API_KEY !== 'your_actual_gemini_api_key_here';
  
  console.log(request)
  console.log('API 키 상태 확인:', {
    hasKey: !!process.env.GEMINI_API_KEY,
    keyLength: process.env.GEMINI_API_KEY?.length,
    isDefault: process.env.GEMINI_API_KEY === 'your_actual_gemini_api_key_here',
    finalResult: hasApiKey
  });

  return NextResponse.json({ hasApiKey });
}
