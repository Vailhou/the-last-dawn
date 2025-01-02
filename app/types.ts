export type Choice = {
  name: string
  sceneSequenceName: string
}

export type Scene = {
  image: string
  imagePlaceholder: string
  texts: string[]
}

export type SceneSequence = {
  name: string
  choices: Choice[]
  scenes: Scene[]
}

export type RawSearchParams = {
  sequence: string
  scene: number
  text: number
  choice: string
}

export type SearchParams = {
  sceneSequenceName: string
  sceneIndex: number
  textIndex: number
  isChoiceActive: boolean
}

export type AsyncParams = {
  searchParams: SearchParams
  sceneSequences: SceneSequence[]
}
