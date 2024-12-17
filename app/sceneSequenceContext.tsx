"use client"
 
import { createContext, useContext } from "react"
import { SceneSequence } from "./types"

export const SceneSequencesContext = createContext<Promise<SceneSequence[]> | null>(null)

export function SceneSequencesProvider({
  children,
  sceneSequencesPromise: sceneSequencesPromise,
}: {
  children: React.ReactNode
  sceneSequencesPromise: Promise<SceneSequence[]>
}) {
  return (
    <SceneSequencesContext.Provider value={sceneSequencesPromise}>{children}</SceneSequencesContext.Provider>
  )
}
 
export function usesceneSequencesContext() {
  const context = useContext(SceneSequencesContext)
  if (!context) {
    throw new Error("usesceneSequencesContext must be used within a sceneSequencesProvider")
  }
  return context
}
