import { IUserTokens } from '@/types/tokens';
import { db } from './firebase';
import {
  doc,
  getDoc,
  serverTimestamp,
  Timestamp,
  setDoc,
  updateDoc,
  runTransaction,
} from 'firebase/firestore';

const DAILY_TOKEN_LIMIT = 10;
const EVALUATION_COST = 5;

export const getUserTokens = async (userId: string): Promise<IUserTokens> => {
  const today = new Date().toISOString().split('T')[0];
  try {
    const tokenDocRef = doc(db, 'users', userId, 'tokens', 'current');
    const tokenDoc = await getDoc(tokenDocRef);

    if (!tokenDoc?.exists()) {
      const initialTokens: IUserTokens = {
        userId: userId,
        totalTokens: DAILY_TOKEN_LIMIT,
        usedTokens: 0,
        lastResetDate: today,
        maxDailyTokens: DAILY_TOKEN_LIMIT,
        createdAt: serverTimestamp() as Timestamp,
        updatedAt: serverTimestamp() as Timestamp,
      };
      await setDoc(tokenDocRef, initialTokens);
      return initialTokens;
    }

    const data = tokenDoc.data() as IUserTokens;

    // 날짜가 변경되었으면 토큰 리셋
    if (data.lastResetDate !== today) {
      const resetTokens: Partial<IUserTokens> = {
        totalTokens: DAILY_TOKEN_LIMIT,
        usedTokens: 0,
        lastResetDate: today,
        updatedAt: serverTimestamp() as Timestamp,
      };
      await updateDoc(tokenDocRef, resetTokens);
      return { ...data, ...resetTokens } as IUserTokens;
    }

    return data;
  } catch (err) {
    console.error('토큰 조회 오류:', err);
    // 오류 발생 시 기본값 반환
    return {
      userId: userId,
      totalTokens: 0,
      usedTokens: 0,
      lastResetDate: today,
      maxDailyTokens: DAILY_TOKEN_LIMIT,
      createdAt: serverTimestamp() as Timestamp,
      updatedAt: serverTimestamp() as Timestamp,
    };
  }
};

export const useTokensInFirebase = async (
  userId: string,
  amount: number
): Promise<void> => {
  const tokenDocRef = doc(db, 'users', userId, 'tokens', 'current');

  try {
    await runTransaction(db, async transaction => {
      const tokenDoc = await transaction.get(tokenDocRef);
      const today = new Date().toISOString().split('T')[0];

      if (!tokenDoc?.exists()) {
        throw new Error('토큰 정보를 찾을 수 없습니다. 관리자에게 문의하세요.');
      }

      const tokenData = tokenDoc.data() as IUserTokens;

      // 날짜가 변경되었으면 토큰 리셋
      if (tokenData.lastResetDate !== today) {
        tokenData.totalTokens = DAILY_TOKEN_LIMIT;
        tokenData.usedTokens = 0;
        tokenData.lastResetDate = today;
      }

      // 토큰 부족 확인
      if (tokenData.totalTokens < amount) {
        throw new Error('토큰이 부족합니다.');
      }

      // 토큰 사용
      const updatedTokenData: Partial<IUserTokens> = {
        totalTokens: tokenData.totalTokens - amount,
        usedTokens: tokenData.usedTokens + amount,
        updatedAt: serverTimestamp() as Timestamp,
      };

      transaction.update(tokenDocRef, updatedTokenData);
    });
  } catch (err) {
    console.error('토큰 사용 오류:', err);
    throw new Error(
      err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
    );
  }
};

export const TOKEN_COSTS = {
  EVALUATION: EVALUATION_COST,
  DAILY_LIMIT: DAILY_TOKEN_LIMIT,
} as const;
