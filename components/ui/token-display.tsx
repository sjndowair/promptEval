'use client';

import React from 'react';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { Coins, Clock } from 'lucide-react';
import { useStore } from '@/lib/store';

export function TokenDisplay() {
  const { user, userTokens, isTokensLoading } = useStore();

  if (!user) {
    return null;
  }

  if (isTokensLoading) {
    return (
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Coins className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-700">토큰 로딩 중...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!userTokens) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Coins className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-700">토큰 정보를 불러올 수 없습니다</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getTokenStatusColor = (remaining: number) => {
    if (remaining >= 7) return 'bg-purple-100 text-black-800 border-purple-200 dark:bg-blue-200 dark:text-blue-800 dark:border-blue-300';
    if (remaining >= 4) return 'bg-purple-100 border-purple-200 dark:bg-blue-100 dark:text-blue-800 dark:border-blue-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getNextResetTime = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const diffMs = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}시간 ${minutes}분`;
  };

  return (
    <Card className={`border ${getTokenStatusColor(userTokens.totalTokens)} bg-purple-100 dark:bg-blue-200`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between ">
          <div className="flex items-center space-x-3">
            <Coins className="w-5 h-5 dark:text-blue-600 text-purple-600" />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-900">
                  남은 토큰: {userTokens.totalTokens}
                </span>
                <Badge variant="default" className="text-xs dark:text-gray-900">
                  {userTokens.usedTokens}/{userTokens.maxDailyTokens}
                </Badge>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <Clock className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-600">
                  {getNextResetTime()} 후 리셋
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">평가 비용</div>
            <div className="text-sm font-medium text-gray-700">5 토큰</div>
          </div>
        </div>
        
        {userTokens.totalTokens < 5 && (
          <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded text-xs text-orange-700">
            💡 토큰이 부족합니다. 매일 00:00에 10개 토큰이 충전됩니다.
          </div>
        )}
      </CardContent>
    </Card>
  );
}