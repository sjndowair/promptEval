import {Timestamp} from "firebase/firestore";

export interface IUserTokens {
    userId: string;
    totalTokens: number;
    usedTokens: number;
    lastResetDate: string;
    maxDailyTokens: number;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface IDailyUsage {
    date: string;
    tokenUsed: number;
    evaluationsCount: number;
    createdAt: Timestamp;
}

export interface ITokenResponse {
    success: boolean;
    data?: IUserTokens;
    error?: string;
}

