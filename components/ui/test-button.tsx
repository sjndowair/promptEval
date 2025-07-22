
"use client";

import { analytics } from '@/lib/analytics';
import { Button } from '@/components/ui/button';

export const TestButton = () => {
  const handleTestEvent = () => {
    // 여러 테스트 이벤트 발송
    analytics.event("test_event", "button_click", "가이드 페이지 테스트 버튼");
    analytics.engagement.buttonClick("test_analytics");
    analytics.pageView("/guide-test");
    
    console.log("🔥 Analytics 테스트 이벤트 발송 완료!");
    console.log(window.dataLayer);
  };

  return (
    <Button 
      onClick={handleTestEvent}
      variant="destructive" 
      size="sm"
      className="ml-4"
    >
      🧪 Analytics 테스트
    </Button>
  );
}