"use client"
import { useState, useEffect } from "react"; 
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

const ChoiceItem = ({
  searchParams,
  sceneSequences,
  imgSrc,
  imgAlt,
  choiceName,
}: ChoiceItem) => {
  const [flash, setFlash] = useState(false); // Käytämme useState

  // Käynnistämme välkähdyksen, kun valinta aktivoituu
  useEffect(() => {
    if (searchParams.isChoiceActive) {
      setFlash(true);
      const timer = setTimeout(() => {
        setFlash(false); // Poistamme välkähdyksen 2 sekunnin jälkeen
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [searchParams.isChoiceActive]); // Effect tapahtuu, kun 'isChoiceActive' muuttuu

  const link = getSceneSequenceLink(searchParams, sceneSequences, choiceName);

  return (
    <Link
      href={link}
      className={`${charm.className} ${!searchParams.isChoiceActive ? "pointer-events-none" : ""} ${flash ? "border-pulse" : ""} size-16 sm:size-24`}
      aria-disabled={!searchParams.isChoiceActive}
      tabIndex={!searchParams.isChoiceActive ? -1 : undefined}
      replace={true}
      prefetch={true}
    >
      <div className="relative w-[180px] h-[180px] p-[16px]"> {/* Neliömäinen muoto ja suurempi koko */}
        <div
          className={`absolute inset-0 bg-no-repeat bg-center bg-contain ${flash ? "border-pulse" : ""}`}
          style={{
            backgroundImage: "url('/iconImages/icon_borders.png')",
            backgroundPosition: "center",
          }}
        ></div>
        <Image
          src={imgSrc}
          width={160} 
          height={160} 
          alt={imgAlt}
          priority={true}
          className="block"
        />
      </div>
    </Link>
  );
};

// Funktio valintojen luomiseen
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
            imgSrc="/iconImages/rose_icon.png"
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
    );
  }

  return (
    <div className="flex w-full sm:w-auto sm:h-full flex-fow sm:flex-col px-2 py-2 sm:items-start justify-evenly md:px-2">
      {getChoiceItems(searchParams, sceneSequences)}
    </div>
  );
}