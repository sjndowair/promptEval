"use client"

import { useStore } from "@/lib/store"
import { useEffect } from "react"
import { Card, CardContent } from "./card"
import {Coins, Clock, TrendingUp} from "lucide-react"

export const TokenDisplay = () => {
    const {user, userTokens, isTokensLoading, refreshUserTokens} = useStore()

    const tokensRemaining = userTokens?.totalTokens || 0
    const tokensUsed = userTokens?.usedTokens 
    const maxTokens = userTokens?.maxDailyTokens || 0
    const canEvaluate = tokensRemaining as number >= 5
    

    useEffect(() => {
        user && !userTokens && !isTokensLoading && refreshUserTokens?.() 
    }, [
        user, userTokens, isTokensLoading, refreshUserTokens
    ])

    if(!user || isTokensLoading){
        return (
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple900/20 dark:to-blue-900/20">

                <CardContent className="p-4">
                    <div className="animate-pulse">
                       <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                       <div className="h-6 bg-gray-300 rounded w-24"></div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    if(!userTokens) return null



    return(
         <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Coins className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              보유 토큰
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-gray-500" />
            <span className="text-xs text-gray-500">매일 00시 리셋</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {tokensRemaining}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              / {maxTokens}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(tokensRemaining / maxTokens) * 100}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>오늘 사용: {tokensUsed}개</span>
            </div>
            <span className={canEvaluate ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
              {canEvaluate ? "평가 가능" : "토큰 부족"}
            </span>
          </div>
          
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 pt-1 border-t border-gray-200 dark:border-gray-700">
            프롬프트 평가 1회당 5토큰 소모
          </p>
        </div>
      </CardContent>
    </Card>
    )
}