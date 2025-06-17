"use client"

import {create} from "zustand"
import {persist} from "zustand/middleware"


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
}

export const useStore = create<IStoreState>()(
  persist(
    (set) => ({
      isEvaluating: false,
      setIsEvaluating: (value) => set({ isEvaluating: value }),

      isLoginModalOpen: false,
      setIsLoginModalOpen: (value) => set({ isLoginModalOpen: value }),

      isSignupModalOpen: false,
      setIsSignupModalOpen: (value) => set({ isSignupModalOpen: value }),

      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "prompt-evaluator-storage",
      partialize: (state) => ({ user: state.user }),
    },
  ),
)




