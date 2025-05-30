"use client"

import { create } from "zustand"

interface StoreState {
  isEvaluating: boolean
  setIsEvaluating: (value: boolean) => void
}

export const useStore = create<StoreState>((set) => ({
  isEvaluating: false,
  setIsEvaluating: (value) => set({ isEvaluating: value }),
}))
