import { useQuery, useQueryClient } from '@tanstack/react-query';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { useStore } from './store';
import { useEffect } from 'react';
import { Timestamp } from 'firebase/firestore';


interface IUser {
  id: string;
  name: string;
  email: string;
}

interface IUserTokens {
  userId?: string;
  totalTokens?: number;
  usedTokens?: number;
  lastResetDate?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

interface IUserWithTokens extends IUser {
  tokens?: IUserTokens;
}



// Firebase Auth 상태를 가져오는 함수
const getAuthState = (): Promise<IUser | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      unsubscribe(); // 한 번만 실행되도록
      
      if (firebaseUser) {
        try {
          // Firestore에서 사용자 정보 가져오기
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            resolve({
              id: firebaseUser.uid,
              name: userData.name || firebaseUser.displayName || '',
              email: firebaseUser.email || ''
            });
          } else {
            // Firestore에 정보가 없으면 Firebase Auth 정보로 설정
            resolve({
              id: firebaseUser.uid,
              name: firebaseUser.displayName || '',
              email: firebaseUser.email || ''
            });
          }
        } catch (error) {
          console.error('사용자 정보 가져오기 오류:', error);
          // 오류가 발생해도 기본 정보는 설정
          resolve({
            id: firebaseUser.uid,
            name: firebaseUser.displayName || '',
            email: firebaseUser.email || ''
          });
        }
      } else {
        resolve(null);
      }
    });
  });
};

// Auth 상태를 실시간으로 구독하는 훅
export const useAuthState = () => {
  const queryClient = useQueryClient();
  const { setUser } = useStore();

  // 초기 auth 상태 쿼리
  const query = useQuery({
    queryKey: ['auth', 'user'],
    queryFn: getAuthState,
    staleTime: Infinity, // Auth 상태는 변경되지 않는 한 fresh 상태 유지
    gcTime: Infinity, // 가비지 컬렉션 시간을 무한대로 설정
  });

  // Firebase Auth 상태 변경을 실시간으로 감지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      let userData: IUser | null = null;

      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            const data = userDoc.data();
            userData = {
              id: firebaseUser.uid,
              name: data.name || firebaseUser.displayName || '',
              email: firebaseUser.email || ''
            };
          } else {
            userData = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || '',
              email: firebaseUser.email || ''
            };
          }
        } catch (error) {
          console.error('사용자 정보 가져오기 오류:', error);
          userData = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || '',
            email: firebaseUser.email || ''
          };
        }
      }

      // 쿼리 캐시 업데이트
      queryClient.setQueryData(['auth', 'user'], userData);
      
      // Zustand store 업데이트
      setUser(userData);
    });

    return () => unsubscribe();
  }, [queryClient, setUser]);

  return query;
};
