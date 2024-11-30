import beginning from "./sceneSequences/beginning.json";

const imageFolder = "/sceneImages/";
const currentSceneSequence = beginning;

import * as fs from "fs";
const readPath = "./app/sceneSequences/";
const sceneSequences: SceneSequence[] = declareEachJSON();

export const choiceName = {
  romantic: "romantic",
  violent: "violent",
  neutral: "neutral"
}

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

export function declareEachJSON(): SceneSequence[] {
  const fileNames = fs.readdirSync(readPath).filter(file => file.match(/\.json$/));
  const typeList: SceneSequence[] = [];

  fileNames.forEach((fileName: string) => {
    let typeName = fileName.match(/(^.*?)\.json/);
    if (typeName) {
      const sceneSequenceString = fs.readFileSync(readPath + fileName, "utf8");
      const sceneSequenceObj = JSON.parse(sceneSequenceString);
      typeList.push(sceneSequenceObj);
    }
  })

  console.log(typeList[0])
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

export function getImgSrc(sceneIndex: number) {
  const imageName = getScene(sceneIndex).image;
  return imageFolder + imageName;
}

export function getText(sceneIndex: number, textIndex: number) {
  return getScene(sceneIndex).texts[textIndex];
}

export function getLink(sceneSequenceName: string, sceneIndex: number, textIndex: number): string {
  let sceneSequence = getSceneSequence(sceneSequenceName);
  return "/";
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

export function getItemLink(sceneSequenceName: string, itemType: string) {
  const sceneSequence = getSceneSequence(sceneSequenceName);
  const choice = sceneSequence.choices.find((choice) => choice.name === itemType);
  if (choice === undefined) {
    throw "Undefined choice";
  }
  return getLink(choice.sceneSequenceName, 0, 0);
}