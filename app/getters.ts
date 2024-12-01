"use server"

import beginning from "./sceneSequences/beginning.json";
import * as fs from "fs";

const readPath = "./app/sceneSequences/";
const imageFolder = "/sceneImages/";
const sceneSequences: SceneSequence[] = declareEachJSON();
const currentSceneSequence = beginning;

type Choice = {
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
    throw "Undefined scene sequence, name: " + sceneSequenceName;
  }
  return sceneSequence;
}

function getScene(sceneIndex: number) {
  return currentSceneSequence.scenes[sceneIndex];
}

export async function getImgSrc(sceneIndex: number) {
  const imageName = getScene(sceneIndex).image;
  return imageFolder + imageName;
}

export async function getText(sceneIndex: number, textIndex: number) {
  return getScene(sceneIndex).texts[textIndex];
}

export async function getLink(sceneSequenceName: string, sceneIndex: number, textIndex: number): Promise<string> {
  const sceneSequence = getSceneSequence(sceneSequenceName);
  let nextSceneIndex = sceneIndex;
  let nextTextIndex = textIndex;
  let nextIsChoiceActive = false;

  // const endGame = () => {
  //   // TODO: Game ending
  // }

  // const changeSceneSequence = () => {
  //   currentSceneSequenceIndex = currentSceneSequenceIndex + 1;
  //   if (flow.sceneSequences.length > currentSceneSequenceIndex) {
  //     currentSceneSequence = flow.sceneSequences[currentSceneSequenceIndex];
  //     setSceneIndex(0);
  //     setTextIndex(0);
  //   } else {
  //     endGame();
  //   }
  // }

  function changeScene() {
    nextSceneIndex = sceneIndex + 1;
    if (sceneSequence.scenes.length <= nextSceneIndex) {
      nextSceneIndex = 0;
      nextIsChoiceActive = true;
    }
  }

  function changeText(sceneIndex: number) {
    nextTextIndex = textIndex + 1;
    if (getScene(sceneIndex).texts.length <= nextTextIndex) {
      nextTextIndex = 0;
      changeScene();
    }
  };

  changeText(sceneIndex);
  return `?text=${nextTextIndex}&scene=${nextSceneIndex}&choice=${nextIsChoiceActive}`;
}

export async function getItemLink(sceneSequenceName: string, itemType: string) {
  const sceneSequence = getSceneSequence(sceneSequenceName);
  const choice = sceneSequence.choices.find((choice) => choice.name === itemType);

  if (choice === undefined) {
    throw "Undefined choice";
  }
  if (choice.sceneSequenceName === undefined) {
    throw "Undefined choice.sceneSequenceName";
  }

  return getLink(choice.sceneSequenceName, 0, 0);
}