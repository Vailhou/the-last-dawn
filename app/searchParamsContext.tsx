"use client"

import { createContext, useContext } from "react"
import { SearchParams } from "./types"

export const SearchParamsContext = createContext<Promise<SearchParams> | null>(null)

export function SearchParamsProvider({
  children,
  searchParamsPromise,
}: {
  children: React.ReactNode
  searchParamsPromise: Promise<SearchParams>
}) {
  return (
    <SearchParamsContext.Provider value={searchParamsPromise}>{children}</SearchParamsContext.Provider>
  )
}

export function useSearchParamsContext() {
  const context = useContext(SearchParamsContext)
  if (!context) {
    throw new Error("useSearchParamsContext must be used within a SearchParamsProvider")
  }
  return context
}
