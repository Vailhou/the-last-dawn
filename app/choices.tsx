import Image from "next/image";
import Link from "next/link";
import { charm } from "./fonts/fonts";
import { getChoices, getSceneSequenceLink } from "./getters";

type Choice = {
  imgSrc: string
  imgAlt: string
  sceneSequenceName: string
  choiceName: string
  isChoiceActive: boolean
}

type Choices = {
  sceneSequenceName: string
  isChoiceActive: boolean
}

async function Choice({ sceneSequenceName, imgSrc, imgAlt, choiceName, isChoiceActive }: Choice) {
  const link = await getSceneSequenceLink(sceneSequenceName, choiceName);
  return (
    <Link
      href={link}
      className={`${charm.className} ${!isChoiceActive ? "pointer-events-none" : ""} size-16 sm:size-24`}
      aria-disabled={!isChoiceActive}
      tabIndex={!isChoiceActive ? -1 : undefined}
      replace={true}
    >
      <Image
        src={imgSrc}
        width={128}
        height={128}
        className="rounded-full border border-solid"
        alt={imgAlt}
      />
    </Link>
  )
}

async function getChoiceElements(sceneSequenceName: string, isChoiceActive: boolean): Promise<JSX.Element[]> {
  const choiceElements: JSX.Element[] = [];
  const choices = await getChoices(sceneSequenceName);
  choices.forEach((choice) => {
    switch (choice.name) {
      case "romantic":
        choiceElements.push(
          <Choice
            imgSrc="/rose.jpg"
            imgAlt="Rose"
            choiceName={"romantic"}
            sceneSequenceName={sceneSequenceName}
            isChoiceActive={isChoiceActive}
          />
        );
        break;
      case "violent":
        choiceElements.push(
          <Choice
            imgSrc="/dagger.png"
            imgAlt="Dagger"
            choiceName={"violent"}
            sceneSequenceName={sceneSequenceName}
            isChoiceActive={isChoiceActive}
          />
        );
        break;
      case "neutral":
        choiceElements.push(
          <Choice
            imgSrc="/letter.png"
            imgAlt="Letter"
            choiceName={"neutral"}
            sceneSequenceName={sceneSequenceName}
            isChoiceActive={isChoiceActive}
          />
        );
        break;
      default:
        break;
    }
  })
  return choiceElements;
}

export default async function Choices({ sceneSequenceName, isChoiceActive }: Choices) {
  return (
    <div className="flex w-full sm:w-auto sm:h-full flex-fow sm:flex-col px-2 py-2 sm:items-start justify-evenly md:px-2">
      {getChoiceElements(sceneSequenceName, isChoiceActive)}
    </div>
  );
}
