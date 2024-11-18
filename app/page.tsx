"use client"

import Image from "next/image";
import { charm } from "./fonts/fonts";
import flow from "./flow.json"
import Items from "./items";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const imageFolder = "/sceneImages/";

let currentSceneSequenceIndex = 0;
let currentSceneSequence = flow.sceneSequences[currentSceneSequenceIndex];

const paramTypes = {
  scene: "scene",
  text: "text"
}

export default function Home() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);

  function getSceneIndex() {
    return Number((searchParams.get(paramTypes.scene) ?? "0"));
  }

  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);

  function setSceneIndex(index: number) {
    params.set(paramTypes.scene, index.toString())
    router.push(`${pathname}?${params.toString()}`);
  }

  function getScene() {
    return currentSceneSequence.scenes[getSceneIndex()];
  }

  function getImageSrc() {
    const imageName = getScene().image
    return imageFolder + imageName;
  }

  function getTextIndex() {
    return Number((searchParams.get(paramTypes.text) ?? "0"));
  }

  function setTextIndexParam(index: number) {
    params.set(paramTypes.text, index.toString())
    router.push(`${pathname}?${params.toString()}`);
  }

  function getText() {
    return getScene().texts[getTextIndex()];
  }

  function setTextIndex(index: number) {
    setTextIndexParam(index);
    //setStoryText(getScene().texts[index]);
  }

  const endGame = () => {
    // TODO: Game ending
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const changeSceneSequence = () => {
    currentSceneSequenceIndex = currentSceneSequenceIndex + 1;
    if (flow.sceneSequences.length > currentSceneSequenceIndex) {
      currentSceneSequence = flow.sceneSequences[currentSceneSequenceIndex];
      setSceneIndex(0);
      setTextIndex(0);
    } else {
      endGame();
    }
  }

  const itemChoice = () => {
    setIsNextButtonDisabled(true);

  }

  const changeScene = () => {
    const sceneIndex = getSceneIndex() + 1;
    if (currentSceneSequence.scenes.length > sceneIndex) {
      setSceneIndex(sceneIndex);
      setTextIndex(0);
    } else {
      itemChoice();
      //changeSceneSequence();
    }
  }

  const handleButtonClick = () => {
    const textIndex = getTextIndex() + 1;
    if (getScene().texts.length > textIndex) {
      setTextIndex(textIndex);
    } else {
      changeScene();
    }
  };

  const [isItemsActive, setIsItemsActive] = useState(true);

  function disableItems() {
    setIsItemsActive(false);
  }

  // function enableItems() {
  //   setIsItemsActive(true);
  // }

  return (
      <main className="flex flex-grow flex-col sm:flex-row gap-8 justify-between items-center h-full w-full">
        <div className="flex flex-grow flex-col gap-8 justify-center items-center h-full w-full">
          <button
            onClick={handleButtonClick}
            disabled={isNextButtonDisabled}
          >
            <Image
              className="rounded-md border border-solid"
              src={getImageSrc()}
              alt="Story page"
              width={500}
              height={300}
              priority
            />
          </button>
          <button
            className={`${charm.className} rounded-md border border-solid border-transparent transition-colors flex items-start bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-xl sm:text-4xl h-48 w-11/12 px-2 sm:px-5 p-5`}
            onClick={handleButtonClick}
            disabled={isNextButtonDisabled}
          >
            <Image
              className="dark:invert rotate-180 m-2 size-4"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            {getText()}
          </button>
        </div>
        <Items isItemsActive={isItemsActive} disableItems={disableItems} />
      </main>
  );
}
