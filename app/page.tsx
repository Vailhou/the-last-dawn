"use client"

import Image from "next/image";
import { charm } from "./fonts/fonts";
import flow from "./flow.json"
import Items from "./items";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const imageFolder = "/sceneImages/";

const currentSceneSequenceIndex = 0;
const currentSceneSequence = flow.sceneSequences[currentSceneSequenceIndex];

const paramNames = {
  sceneIndex: "scene",
  textIndex: "text",
  isItemChoiceActive: "choice"
}

export default function Home() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);

  function getSearchParam(paramName: string) {
    return Number(searchParams.get(paramName) ?? "0");
  }

  function setSearchParam(paramName: string, index: number) {
    params.set(paramName, index.toString())
    router.replace(`${pathname}?${params.toString()}`);
  }

  function getSceneIndex() {
    return getSearchParam(paramNames.sceneIndex)
  }

  function setSceneIndex(index: number) {
    setSearchParam(paramNames.sceneIndex, index);
  }

  function getScene() {
    return currentSceneSequence.scenes[getSceneIndex()];
  }

  function getImageSrc() {
    const imageName = getScene().image;
    return imageFolder + imageName;
  }

  function getTextIndex() {
    return getSearchParam(paramNames.textIndex)
  }

  function setTextIndex(index: number) {
    setSearchParam(paramNames.textIndex, index);
    //setStoryText(getScene().texts[index]);
  }

  function getText() {
    return getScene().texts[getSceneIndex()];
  }

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

  function setIsItemChoiceActive(isActive: boolean) {
    setSearchParam(paramNames.isItemChoiceActive, isActive ? 1 : 0);
  }

  function getIsItemChoiceActive() {
    return Boolean(getSearchParam(paramNames.isItemChoiceActive));
  }

  const itemChoice = () => {
    setIsItemChoiceActive(true);
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

  function disableItems() {
    setIsItemChoiceActive(false);
  }

  return (
    <main className="flex flex-grow flex-col sm:flex-row gap-8 justify-between items-center h-full w-full">
      <div className="flex flex-grow flex-col gap-8 justify-center items-center h-full w-full">
        <Link
          href="/"
          className={getIsItemChoiceActive() ? "pointer-events-none" : ""}
          aria-disabled={getIsItemChoiceActive()}
          tabIndex={getIsItemChoiceActive() ? -1 : undefined}
          replace={true}
        >
          <Image
            className="rounded-md border border-solid"
            src={getImageSrc()}
            alt="Story page"
            width={500}
            height={300}
            priority
          />
        </Link>
        <button
          className={`${charm.className} rounded-md border border-solid border-transparent transition-colors flex items-start bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-xl sm:text-4xl h-48 w-11/12 px-2 sm:px-5 p-5`}
          onClick={handleButtonClick}
          disabled={getIsItemChoiceActive()}
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
      <Items isItemsActive={getIsItemChoiceActive()} disableItems={disableItems} />
    </main>
  );
}
