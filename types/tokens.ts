import {Timestamp} from "firebase/firestore";

export interface IUserTokens {
    userId?: string;
    totalTokens?: number;
    usedTokens?: number;
    lastReserDate?: string;
    maxDailyTokens?: number;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

export interface IDailyUsage {
    date?: string;
    tokenUsed?: number;
    evalutionsCount?: number;
    createdAt?: Timestamp
}

export interface ITokenResponse {
    sucess: boolean;
    data?: IUserTokens;
    error?: string;
}

