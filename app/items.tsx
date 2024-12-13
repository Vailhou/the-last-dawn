import Image from "next/image";
import Link from "next/link";
import { charm } from "./fonts/fonts";
import { getChoices, getSceneSequenceLink } from "./getters";

interface Items {
  sceneSequenceName: string
  isChoiceActive: boolean
}

export default async function Items({ sceneSequenceName, isChoiceActive }: Items) {
  type Item = {
    imgSrc: string
    imgAlt: string
    sceneSequenceName: string
    choiceName: string
  }

  async function Item({ sceneSequenceName, imgSrc, imgAlt, choiceName }: Item) {
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

  async function getChoiceElements(): Promise<JSX.Element[]> {
    const items: JSX.Element[] = [];
    const choices = await getChoices(sceneSequenceName);
    choices.forEach((choice) => {
      switch (choice.name) {
        case "romantic":
          items.push(<Item imgSrc="/rose.jpg" imgAlt="Rose" choiceName={"romantic"} sceneSequenceName={sceneSequenceName} />);
          break;
        case "violent":
          items.push(<Item imgSrc="/dagger.png" imgAlt="Dagger" choiceName={"violent"} sceneSequenceName={sceneSequenceName} />);
          break;
        case "neutral":
          items.push(<Item imgSrc="/letter.png" imgAlt="Letter" choiceName={"neutral"} sceneSequenceName={sceneSequenceName} />);
          break;
      }
    })
    return items;
  }

  return (
    <div className="flex w-full sm:w-auto sm:h-full flex-fow sm:flex-col px-2 py-2 sm:items-start justify-evenly md:px-2">
      {getChoiceElements()}
    </div>
  );
}