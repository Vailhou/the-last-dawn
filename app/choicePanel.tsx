"use client"

import Image from "next/image";
import Link from "next/link";
import { charm } from "./fonts/fonts";
import { useAsyncParamsContext } from "./asyncParamsContext";
import { use } from "react";
import { getChoices, getSceneSequenceLink } from "./clientGetters";
import { SceneSequence, SearchParams } from "./types";

type ChoiceItem = {
  searchParams: SearchParams
  sceneSequences: SceneSequence[]
  imgSrc: string
  imgAlt: string
  choiceName: string
}

function ChoiceItem({ searchParams, sceneSequences, imgSrc, imgAlt, choiceName }: ChoiceItem) {
  const link = getSceneSequenceLink(searchParams, sceneSequences, choiceName);
  return (
    <>
      <Link
        href={link}
        className={`${charm.className} ${!searchParams.isChoiceActive ? "pointer-events-none" : ""} size-16 sm:size-24`}
        aria-disabled={!searchParams.isChoiceActive}
        tabIndex={!searchParams.isChoiceActive ? -1 : undefined}
        replace={true}
        prefetch={true}
      >
        <Image
          src={imgSrc}
          width={128}
          height={128}
          className="rounded-full border border-solid"
          alt={imgAlt}
          priority={true}
          // quality={50}
        />
      </Link>
    </>
  )
}

function getChoiceItems(searchParams: SearchParams, sceneSequences: SceneSequence[]) {
  const choices = getChoices(searchParams, sceneSequences);
  const choiceItems: JSX.Element[] = [];
  choices.forEach((choice) => {
    switch (choice.name) {
      case "romantic":
        choiceItems.push(
          <ChoiceItem
            searchParams={searchParams}
            sceneSequences={sceneSequences}
            imgSrc="/iconImages/rose_icon.jpg"
            imgAlt="Rose"
            choiceName={"romantic"}
            key={"romantic"}
          />
        );
        break;
      case "violent":
        choiceItems.push(
          <ChoiceItem
            searchParams={searchParams}
            sceneSequences={sceneSequences}
            imgSrc="/iconImages/dagger_icon.png"
            imgAlt="Dagger"
            choiceName={"violent"}
            key={"violent"}
          />
        );
        break;
      case "neutral":
        choiceItems.push(
          <ChoiceItem
            searchParams={searchParams}
            sceneSequences={sceneSequences}
            imgSrc="/iconImages/letter_icon.png"
            imgAlt="Letter"
            choiceName={"neutral"}
            key={"neutral"}
          />
        );
        break;
      default:
        break;
    }
  });
  return choiceItems;
}

export default function ChoicePanel() {
  const asyncParams = use(useAsyncParamsContext());
  const searchParams = asyncParams.searchParams;
  const sceneSequences = asyncParams.sceneSequences;
  if (searchParams.sceneSequenceName === "end") {
    return (
      <></>
    )
  }
  return (
    <div className="flex w-full sm:w-auto sm:h-full flex-fow sm:flex-col px-2 py-2 sm:items-start justify-evenly md:px-2">
      {getChoiceItems(searchParams, sceneSequences)}
    </div>
  );
}
