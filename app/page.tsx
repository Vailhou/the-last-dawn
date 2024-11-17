"use client"

import Image from "next/image";
import { charm } from "./fonts/fonts";
import { useState } from "react";
import flow from "./flow.json"
import Items from "./items";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const imageFolder = "/sceneImages/";

let currentSceneSequenceIndex = 0;
let currentSceneSequence = flow.sceneSequences[currentSceneSequenceIndex];
let currentTextIndex = 0;

export default function Home() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  
  function getSceneIndex() {
    return Number((searchParams.get("scene") ?? "0"));
  }

  const [storyText, setStoryText] = useState(getTextIndex())
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);
  
  function setSceneIndexParam(index: number) {
    const params = new URLSearchParams(searchParams);
    params.set("scene", index.toString())
    router.replace(`${pathname}?${params.toString()}`);
  }

  function getScene() {
    return currentSceneSequence.scenes[getSceneIndex()];
  }

  function getImageSrc() {
    const imageName = getScene().image
    return imageFolder + imageName;
  }

  function getTextIndex() {
    return getScene().texts[currentTextIndex]
  }

  function setTextIndex(index: number) {
    currentTextIndex = index;
  }

  function setText(index: number) {
    setTextIndex(index);
    setStoryText(getScene().texts[index]);
  }

  const endGame = () => {
    // TODO: Game ending
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const changeSceneSequence = () => {
    currentSceneSequenceIndex = currentSceneSequenceIndex + 1;
    if (flow.sceneSequences.length > currentSceneSequenceIndex) {
      currentSceneSequence = flow.sceneSequences[currentSceneSequenceIndex];
      setSceneIndexParam(0);
      setText(0);
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
      setSceneIndexParam(sceneIndex);
      setText(0);
      setSceneIndexParam(sceneIndex);
    } else {
      itemChoice();
      //changeSceneSequence();
    }
  }

  const handleButtonClick = () => {
    currentTextIndex = currentTextIndex + 1;
    if (getScene().texts.length > currentTextIndex) {
      setText(currentTextIndex);
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
          {storyText}
        </button>
      </div>
      <Items isItemsActive={isItemsActive} disableItems={disableItems} />
    </main>
  );
}
