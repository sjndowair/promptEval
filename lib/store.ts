"use client"

import {create} from "zustand"
import {persist} from "zustand/middleware"
import { IUserTokens } from "@/types/tokens"


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

  userTokens?: IUserTokens | null;
  isTokensLoading?: boolean;

  setUserTokens?: (tokens: IUserTokens | null) => void
  setIsTokensLoading?: (tokens: boolean) => void
  refreshUserTokens?: () => Promise<void>
  useTokens?: (amount: number) => Promise<boolean>
}

export const useStore = create<IStoreState>()(
  persist(
    (set,get) => ({
      isEvaluating: false,
      setIsEvaluating: (value) => set({ isEvaluating: value }),

      isLoginModalOpen: false,
      setIsLoginModalOpen: (value) => set({ isLoginModalOpen: value }),

      isSignupModalOpen: false,
      setIsSignupModalOpen: (value) => set({ isSignupModalOpen: value }),

      user: null,
      setUser: (user) => {
        set({ user })
        if(user){
          get().refreshUserTokens?.()
        }else{
          set({userTokens: null, isTokensLoading: false})
        }
      },

      setUserTokens: (tokens) => set({userTokens: tokens}),
      setIsTokensLoading: (loading) => set({isTokensLoading: loading})
    }),
    {
      name: "prompt-evaluator-storage",
      partialize: (state) => ({ user: state.user }),
    },
  ),
)




