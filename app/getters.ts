"use server"

import * as fs from "fs";

const readPath = "./app/sceneSequences/";
const imageFolder = "/sceneImages/";
const sceneSequences: SceneSequence[] = declareEachJSON();

export type Choice = {
  name: string
  sceneSequenceName: string
}

type Scene = {
  image: string
  texts: string[]
}

type SceneSequence = {
  name: string
  choices: Choice[]
  scenes: Scene[]
}

function declareEachJSON(): SceneSequence[] {
  const fileNames = fs.readdirSync(readPath).filter(file => file.match(/\.json$/));
  const typeList: SceneSequence[] = [];

  fileNames.forEach((fileName: string) => {
    const typeName = fileName.match(/(^.*?)\.json/);
    if (typeName) {
      const sceneSequenceString = fs.readFileSync(readPath + fileName, "utf8");
      const sceneSequenceObj = JSON.parse(sceneSequenceString);
      typeList.push(sceneSequenceObj);
    }
  })
  return typeList;
}

function getSceneSequence(sceneSequenceName: string) {
  const sceneSequence = sceneSequences.find(
    (sceneSequence) => sceneSequence.name === sceneSequenceName
  );
  if (sceneSequence === undefined) {
    throw "Undefined scene sequence: " + sceneSequenceName;
  }
  return sceneSequence;
}

function getScene(sceneSequenceName: string, sceneIndex: number) {
  const sceneSequence = getSceneSequence(sceneSequenceName);
  const scene = sceneSequence.scenes[sceneIndex];
  if (scene === undefined) {
    throw "Undefined scene: " + sceneSequenceName + " " + scene;
  }
  return scene;
}

function getNextTextIndex(sceneSequenceName: string, sceneIndex: number, textIndex: number) {
  const nextTextIndex = textIndex + 1;

  if (getScene(sceneSequenceName, sceneIndex).texts.length <= nextTextIndex) {
    return 0;
  }
  return nextTextIndex;
};

function getNextSceneIndex(currentSceneSequenceName: string, currentSceneIndex: number) {
  const sceneSequence = getSceneSequence(currentSceneSequenceName);
  if (sceneSequence.scenes.length < currentSceneIndex + 1) {
    return 0;
  }
  return currentSceneIndex + 1;
}

function getNextIsChoiceActive(sceneSequenceName: string, sceneIndex: number, textIndex: number): boolean {
  const sceneSequence = getSceneSequence(sceneSequenceName);
  const scene = sceneSequence.scenes[sceneIndex];
  // Next choice will be active when current scene is last and current text is next to last 
  if (sceneIndex === sceneSequence.scenes.length - 1 && textIndex === scene.texts.length - 2) {
    return true;
  }
  return false;
}

export async function getText(sceneSequenceName: string, sceneIndex: number, textIndex: number) {
  return getScene(sceneSequenceName, sceneIndex).texts[textIndex];
}

export async function getChoices(sceneSequenceName: string) {
  return getSceneSequence(sceneSequenceName).choices;
}

export async function getImgSrc(sceneSequenceName: string, sceneIndex: number) {
  const imageName = getScene(sceneSequenceName, sceneIndex).image;
  return imageFolder + imageName;
}

export async function getNextLink(
  sceneSequenceName: string,
  sceneIndex: number,
  textIndex: number,
  isChoiceActive: boolean
): Promise<string> {
  if (sceneSequenceName === "end") {
    return `?sequence=${sceneSequenceName}&scene=${sceneIndex}&text=${textIndex}&choice=${isChoiceActive}`;
  }

  if (isChoiceActive) {
    return `?sequence=${sceneSequenceName}&scene=${sceneIndex}&text=${textIndex}&choice=${isChoiceActive}`;
  }

  const nextTextIndex = getNextTextIndex(sceneSequenceName, sceneIndex, textIndex)
  const nextSceneIndex = getNextSceneIndex(sceneSequenceName, sceneIndex);
  const nextIsChoiceActive = getNextIsChoiceActive(sceneSequenceName, sceneIndex, textIndex)

  if (nextTextIndex === 0) {
    return `?sequence=${sceneSequenceName}&scene=${nextSceneIndex}&text=${nextTextIndex}&choice=${nextIsChoiceActive}`;
  }
  return `?sequence=${sceneSequenceName}&scene=${sceneIndex}&text=${nextTextIndex}&choice=${nextIsChoiceActive}`;
}

export async function getSceneSequenceLink(sceneSequenceName: string, itemType: string) {
  const sceneSequence = getSceneSequence(sceneSequenceName);
  const choice = sceneSequence.choices.find((choice) => choice.name === itemType);

  if (choice === undefined) {
    throw "Undefined choice. Tried to find " + itemType;
  }
  if (choice.sceneSequenceName === undefined) {
    throw "Undefined choice.sceneSequenceName";
  }
  return getNextLink(choice.sceneSequenceName, 0, 0, false);
}