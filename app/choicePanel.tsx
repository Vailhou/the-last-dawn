import Image from "next/image";
import Link from "next/link";
import { charm } from "./fonts/fonts";

type ChoiceItem = {
  imgSrc: string
  imgAlt: string
  sceneSequenceName: string
  choiceName: string
  isChoiceActive: boolean
}

type ChoiceItems = {
  sceneSequenceName: string
  isChoiceActive: boolean
}

async function ChoiceItem({ sceneSequenceName, imgSrc, imgAlt, choiceName, isChoiceActive }: ChoiceItem) {
  return (
    <>
      {getSceneSequenceLink(sceneSequenceName, choiceName).then((link) => (
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
      ))}
    </>
  )
}

function getChoiceItems(sceneSequenceName: string, isChoiceActive: boolean, choices: Choice[]): JSX.Element[] {
  const choiceItems: JSX.Element[] = [];
  choices.forEach((choice) => {
    switch (choice.name) {
      case "romantic":
        choiceItems.push(
          <ChoiceItem
            imgSrc="/rose.jpg"
            imgAlt="Rose"
            choiceName={"romantic"}
            sceneSequenceName={sceneSequenceName}
            isChoiceActive={isChoiceActive}
          />
        );
        break;
      case "violent":
        choiceItems.push(
          <ChoiceItem
            imgSrc="/dagger.png"
            imgAlt="Dagger"
            choiceName={"violent"}
            sceneSequenceName={sceneSequenceName}
            isChoiceActive={isChoiceActive}
          />
        );
        break;
      case "neutral":
        choiceItems.push(
          <ChoiceItem
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
  });
  return choiceItems;
}

export default async function ChoicePanel({ sceneSequenceName, isChoiceActive }: ChoiceItems) {
  return (
    <div className="flex w-full sm:w-auto sm:h-full flex-fow sm:flex-col px-2 py-2 sm:items-start justify-evenly md:px-2">
      {getChoices(sceneSequenceName).then((choices) => (
        getChoiceItems(sceneSequenceName, isChoiceActive, choices)
      ))}
    </div>
  );
}
