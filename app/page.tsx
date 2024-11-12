'use client'

import Image from "next/image";
import Link from "next/link";
import { charm } from "./fonts/fonts";
import { useState } from "react";
import flow from "./flow.json"

var imageFolder = "/sceneImages/";

var currentSceneSequenceIndex = 0;
var currentSceneSequence = flow.sceneSequences[currentSceneSequenceIndex];
var currentSceneIndex = 0
var currentScene = currentSceneSequence.scenes[currentSceneIndex];
var currentTextIndex = 0;

export default function Home() {

  const [imageSrc, setImageSrc] = useState(imageFolder + currentScene.image);
  const [storyText, setStoryText] = useState(currentScene.texts[currentTextIndex])

  const endGame = () => {
    // TODO: Game ending
  }

  const changeSceneSequence = () => {
    currentSceneSequenceIndex = currentSceneSequenceIndex + 1;
    if (flow.sceneSequences.length > currentSceneSequenceIndex) {
      currentSceneSequence = flow.sceneSequences[currentSceneSequenceIndex];
      currentSceneIndex = 0;
      currentScene = currentSceneSequence.scenes[currentSceneIndex];
      setImageSrc(imageFolder + currentScene.image);
      currentTextIndex = 0;
      setStoryText(currentScene.texts[currentTextIndex]);
    } else {
      endGame();
    }
  }

  const changeScene = () => {
    currentSceneIndex = currentSceneIndex + 1;
    if (currentSceneSequence.scenes.length > currentSceneIndex) {
      currentScene = currentSceneSequence.scenes[currentSceneIndex];
      setImageSrc(imageFolder + currentScene.image);
      currentTextIndex = 0;
      setStoryText(currentScene.texts[currentTextIndex]);
    } else {
      changeSceneSequence();
    }
  }

  const handleButtonClick = () => {
    currentTextIndex = currentTextIndex + 1;
    if (currentScene.texts.length > currentTextIndex) {
      setStoryText(currentScene.texts[currentTextIndex]);
    } else {
      changeScene();
    }
  };

  return (
    <main className="flex flex-grow flex-col gap-8 justify-between items-center h-full w-full">
      <button
        onClick={handleButtonClick}
      >
        <Image
          className="rounded-md border border-solid"
          src={imageSrc}
          alt="Story page"
          width={500}
          height={300}
          priority
        />
      </button>
      <button
        className={`${charm.className} rounded-md border border-solid border-transparent transition-colors flex items-start bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-4xl h-10 sm:h-48 sm:w-11/12 px-4 sm:px-5 p-5`}
      >
        <Image
          className="dark:invert rotate-180 m-2"
          src="/vercel.svg"
          alt="Vercel logomark"
          width={16}
          height={16}
        />
        {storyText}
      </button>
    </main>
  );
}
