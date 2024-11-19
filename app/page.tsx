import Image from "next/image";
import { charm } from "./fonts/fonts";
import flow from "./flow.json"
import Link from "next/link";
import Items from "./items";

const imageFolder = "/sceneImages/";
const currentSceneSequenceIndex = 0;
const currentSceneSequence = flow.sceneSequences[currentSceneSequenceIndex];

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Home(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  const text = searchParams.text
  const scene = searchParams.scene
  const choice = searchParams.choice

  const textIndex = Number(text || "0");
  const sceneIndex = Number(scene || "0");
  const isChoiceActive = ("true" === (choice || "false)"));

  function getScene() {
    return currentSceneSequence.scenes[sceneIndex];
  }

  function getImageSrc() {
    const imageName = getScene().image;
    return imageFolder + imageName;
  }

  function getText() {
    return getScene().texts[textIndex];
  }

  function getLink() {
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

    function changeText() {
      nextTextIndex = textIndex + 1;
      if (getScene().texts.length <= nextTextIndex) {
        nextTextIndex = 0;
        changeScene();
      }
    };

    changeText();
    return `?text=${nextTextIndex}&scene=${nextSceneIndex}&choice=${nextIsChoiceActive}`
  }

  return (
    <main className="flex flex-grow flex-col sm:flex-row gap-8 justify-between items-center h-full w-full">
      <div className="flex flex-grow flex-col gap-8 justify-center items-center h-full w-full">
        <Link
          href={getLink()}
          className={isChoiceActive ? "pointer-events-none" : ""}
          aria-disabled={isChoiceActive}
          tabIndex={isChoiceActive ? -1 : undefined}
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
        <Link
          href={getLink()}
          className={`${charm.className} ${isChoiceActive ? "pointer-events-none" : ""} rounded-md border border-solid border-transparent transition-colors flex items-start bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-xl sm:text-4xl h-48 w-11/12 px-2 sm:px-5 p-5`}
          aria-disabled={isChoiceActive}
          tabIndex={isChoiceActive ? -1 : undefined}
          replace={true}
        >
          <Image
            className="dark:invert rotate-180 m-2 size-4"
            src="/vercel.svg"
            alt="Triangle"
            width={16}
            height={16}
          />
          {getText()}
        </Link>
      </div>
      <Items isItemsActive={isChoiceActive} />
    </main>
  );
}
