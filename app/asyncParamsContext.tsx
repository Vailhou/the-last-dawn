"use client"

import { createContext, useContext } from "react"
import { AsyncParams } from "./types"

export const AsyncParamsContext = createContext<Promise<AsyncParams> | null>(null)

export function AsyncParamsProvider({
  children,
  asyncParamsPromise: asyncParamsPromise,
}: {
  children: React.ReactNode
  asyncParamsPromise: Promise<AsyncParams>
}) {
  return (
    <AsyncParamsContext.Provider value={asyncParamsPromise}>{children}</AsyncParamsContext.Provider>
  )
}

export function useAsyncParamsContext() {
  const context = useContext(AsyncParamsContext)
  if (!context) {
    throw new Error("useAsyncParamsContext must be used within a AsyncParamsProvider")
  }
  return context
}
