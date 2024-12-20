"use client"

import { SceneSequence, SearchParams } from "./types";

const imageFolder = "/sceneImages/";

function getSceneSequence(searchParams: SearchParams, sceneSequences: SceneSequence[]) {
  const sceneSequence = sceneSequences.find(
    (sceneSequence) => sceneSequence.name === searchParams.sceneSequenceName
  );
  if (sceneSequence === undefined) {
    throw "Undefined scene sequence: " + searchParams.sceneSequenceName;
  }
  return sceneSequence;
}

function getIsLastSceneSequence(searchParams: SearchParams, sceneSequences: SceneSequence[]) {
  const sceneSequence = getSceneSequence(searchParams, sceneSequences);
  return (sceneSequence.choices.length === 0)
}

function getScene(searchParams: SearchParams, sceneSequences: SceneSequence[]) {
  const sceneSequence = getSceneSequence(searchParams, sceneSequences);
  const scene = sceneSequence.scenes[searchParams.sceneIndex];
  if (scene === undefined) {
    throw "Undefined scene: " + sceneSequence.name + " " + scene;
  }
  return scene;
}

function getNextTextIndex(searchParams: SearchParams, sceneSequences: SceneSequence[]) {
  const nextTextIndex = searchParams.textIndex + 1;
  if (getScene(searchParams, sceneSequences).texts.length <= nextTextIndex) {
    return 0;
  }
  return nextTextIndex;
};

function getNextSceneIndex(searchParams: SearchParams, sceneSequences: SceneSequence[]) {
  const sceneSequence = getSceneSequence(searchParams, sceneSequences);
  if (sceneSequence.scenes.length < searchParams.sceneIndex + 1) {
    return 0;
  }
  return searchParams.sceneIndex + 1;
}

function getNextIsChoiceActive(searchParams: SearchParams, sceneSequences: SceneSequence[]): boolean {
  if (getIsLastSceneSequence(searchParams, sceneSequences)) {
    return false;
  }
  const sceneSequence = getSceneSequence(searchParams, sceneSequences);
  const scene = sceneSequence.scenes[searchParams.sceneIndex];
  // Next choice will be active when current scene is last and current text is next to last 
  if (searchParams.sceneIndex === sceneSequence.scenes.length - 1 && searchParams.textIndex === scene.texts.length - 2) {
    return true;
  }
  return false;
}

function getNextIsEndOfSceneSequence(searchParams: SearchParams, sceneSequences: SceneSequence[]): boolean {
  const sceneSequence = getSceneSequence(searchParams, sceneSequences);
  const scene = sceneSequence.scenes[searchParams.sceneIndex];
  // Next choice will be active when current scene is last and current text is next to last 
  if (searchParams.sceneIndex === sceneSequence.scenes.length - 1 && searchParams.textIndex === scene.texts.length - 1) {
    return true;
  }
  return false;
}

export function getText(searchParams: SearchParams, sceneSequences: SceneSequence[]) {
  const scene = getScene(searchParams, sceneSequences);
  return scene.texts[searchParams.textIndex];
}

export function getImgSrc(searchParams: SearchParams, sceneSequences: SceneSequence[]) {
  const imageName = getScene(searchParams, sceneSequences).image;
  return imageFolder + imageName;
}

export function getChoices(searchParams: SearchParams, sceneSequences: SceneSequence[]) {
  const sceneSequence = getSceneSequence(searchParams, sceneSequences);
  return sceneSequence.choices;
}

export function getNextLink(searchParams: SearchParams, sceneSequences: SceneSequence[]) {
  if (searchParams.sceneSequenceName === "end" || searchParams.isChoiceActive) {
    // Return link to self when in a state where the link won't be clicked.
    return `?sequence=${searchParams.sceneSequenceName}&scene=${searchParams.sceneIndex}&text=${searchParams.textIndex}&choice=${searchParams.isChoiceActive}`;
  }
  const nextTextIndex = getNextTextIndex(searchParams, sceneSequences)
  const nextSceneIndex = getNextSceneIndex(searchParams, sceneSequences);
  const nextIsChoiceActive = getNextIsChoiceActive(searchParams, sceneSequences)
  if (getNextIsEndOfSceneSequence(searchParams, sceneSequences) && getIsLastSceneSequence(searchParams, sceneSequences)) {
    return `?sequence=${"end"}&scene=${0}&text=${0}&choice=${false}`;
  }
  if (nextTextIndex === 0) {
    return `?sequence=${searchParams.sceneSequenceName}&scene=${nextSceneIndex}&text=${nextTextIndex}&choice=${nextIsChoiceActive}`;
  }
  return `?sequence=${searchParams.sceneSequenceName}&scene=${searchParams.sceneIndex}&text=${nextTextIndex}&choice=${nextIsChoiceActive}`;
}

export function getSceneSequenceLink(searchParams: SearchParams, sceneSequences: SceneSequence[], choiceName: string) {
  if (searchParams.sceneSequenceName === "end") {
    return `?sequence=${searchParams.sceneSequenceName}&scene=${searchParams.sceneSequenceName}&text=${searchParams.textIndex}&choice=${searchParams.isChoiceActive}`;
  }
  const sceneSequence = getSceneSequence(searchParams, sceneSequences);
  const choice = sceneSequence.choices.find((choice) => choice.name === choiceName);
  if (choice === undefined) {
    throw "Undefined choice. Tried to find " + choiceName;
  }
  if (choice.sceneSequenceName === undefined) {
    throw "Undefined choice.sceneSequenceName";
  }
  return `?sequence=${choice.sceneSequenceName}&scene=${0}&text=${0}&choice=${false}`;
}