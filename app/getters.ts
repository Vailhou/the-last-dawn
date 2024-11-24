import flow from "./flow.json"

const imageFolder = "/sceneImages/";
const currentSceneSequenceIndex = 0;
const currentSceneSequence = flow.sceneSequences[currentSceneSequenceIndex];

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

export function getLink(sceneIndex: number, textIndex: number, isChoiceActive: boolean) {
  let nextTextIndex = textIndex;
  let nextSceneIndex = sceneIndex;
  let nextIsChoiceActive = isChoiceActive;

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
    if (currentSceneSequence.scenes.length <= nextSceneIndex) {
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
  return `?text=${nextTextIndex}&scene=${nextSceneIndex}&choice=${nextIsChoiceActive}`
}