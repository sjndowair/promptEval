import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // 임시로 API 키가 없는 것처럼 처리하여 데모 모드 활성화
  const hasApiKey = false; // 데모 모드를 위해 임시로 false 설정
  
  console.log('데모 모드 활성화:', { hasApiKey });
  
  return NextResponse.json({ hasApiKey });
}
