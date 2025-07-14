"use client"

import {create} from "zustand"
import {persist} from "zustand/middleware"
import { IUserTokens } from "@/types/tokens"
import { getUserTokens, useTokensInFirebase } from "./firebase-tokens"


interface IUser {
  id: string;
  name: string;
  email: string;
}

interface IStoreState {
  isEvaluating: boolean;
  setIsEvaluating: (isEvaluating: boolean) => void;

  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (value: boolean) => void;

  isSignupModalOpen: boolean;
  setIsSignupModalOpen: (value: boolean) => void;

  user: IUser | null;
  setUser: (user: IUser | null) => void;

  userTokens: IUserTokens | null;
  isTokensLoading: boolean;

  setUserTokens: (tokens: IUserTokens | null) => void;
  setIsTokensLoading: (loading: boolean) => void;
  refreshUserTokens: () => Promise<void>;
  useTokens: (amount: number) => Promise<boolean>;
}

export const useStore = create<IStoreState>()(
  persist(
    (set, get) => ({
      isEvaluating: false,
      setIsEvaluating: (value) => set({ isEvaluating: value }),

      isLoginModalOpen: false,
      setIsLoginModalOpen: (value) => set({ isLoginModalOpen: value }),

      isSignupModalOpen: false,
      setIsSignupModalOpen: (value) => set({ isSignupModalOpen: value }),

      user: null,
      setUser: (user) => {
        set({ user });
        if (user) {
          get().refreshUserTokens();
        } else {
          set({ userTokens: null, isTokensLoading: false });
        }
      },

      userTokens: null,
      isTokensLoading: false,

      setUserTokens: (tokens) => set({ userTokens: tokens }),
      setIsTokensLoading: (loading) => set({ isTokensLoading: loading }),

      refreshUserTokens: async () => {
        const { user } = get();
        if (!user?.id) return;

        set({ isTokensLoading: true });
        try {
          const tokens = await getUserTokens(user.id);
          set({ userTokens: tokens });
        } catch (error) {
          console.error("토큰 정보 로드 실패:", error);
          set({ userTokens: null });
        } finally {
          set({ isTokensLoading: false });
        }
      },

      useTokens: async (amount: number): Promise<boolean> => {
        const { user, userTokens } = get();
        if (!user?.id) return false;

        try {
          await useTokensInFirebase(user.id, amount);
          // 토큰 사용 후 최신 토큰 정보 다시 로드
          await get().refreshUserTokens();
          return true;
        } catch (error) {
          console.error("토큰 사용 실패:", error);
          return false;
        }
      },
    }),
    {
      name: "prompt-evaluator-storage",
      partialize: (state) => ({ user: state.user }),
    },
  ),
)




