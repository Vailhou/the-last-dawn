"use client"

import Link from "next/link";
import Image from "next/image";
import { charm } from "./fonts/fonts";
import { getImgSrc, getNextLink, getText } from "./clientGetters";
import { use } from "react";
import { useAsyncParamsContext } from "./asyncParamsContext";

type Content = {
  sceneSequenceName: string
  sceneIndex: number
  textIndex: number
  isChoiceActive: boolean
}

export default function Content() {
  const asyncParams = use(useAsyncParamsContext());
  const searchParams = asyncParams.searchParams;
  const sceneSequences = asyncParams.sceneSequences;
  if (searchParams.sceneSequenceName === "end") {
    return (
      <div className="flex flex-grow flex-col gap-8 justify-center items-center h-full w-full">
        <p className={charm.className + " text-xl sm:text-4xl"}>
          The end
        </p>
        <Link
          // TODO: choice=false does not work if the story starts with a choice.
          href={`?sequence=${"beginning"}&scene=${0}&text=${0}&choice=${false}`}
          className={`${charm.className} ${searchParams.isChoiceActive ? "pointer-events-none" : ""} rounded-md border border-solid border-transparent text-center transition-colors bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] text-xl sm:text-4xl h-auto w-auto px-2 sm:px-5 p-5`}
          aria-disabled={searchParams.isChoiceActive}
          tabIndex={searchParams.isChoiceActive ? -1 : undefined}
          replace={true}
          prefetch={true}
        >
          Back to beginning
        </Link>
      </div>
    )
  }
  const link = getNextLink(searchParams, sceneSequences);
  const imgSrc = getImgSrc(searchParams, sceneSequences);
  return (
    <div className="flex flex-grow flex-col gap-8 justify-center items-center h-full w-full">
      <Link
        href={link}
        className={searchParams.isChoiceActive ? "pointer-events-none" : ""}
        aria-disabled={searchParams.isChoiceActive}
        tabIndex={searchParams.isChoiceActive ? -1 : undefined}
        replace={true}
        prefetch={true}
      >
        <Image
          className="rounded-md border border-solid"
          src={imgSrc}
          alt="Story page"
          width={500}
          height={300}
          priority={true}
          placeholder="blur"
          blurDataURL={imgSrc}
          quality={50}
        />
      </Link>
      <Link
        href={link}
        className={`${charm.className} ${searchParams.isChoiceActive ? "pointer-events-none" : ""} rounded-md border border-solid border-transparent transition-colors flex items-start bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-xl sm:text-4xl h-48 w-11/12 px-2 sm:px-5 p-5`}
        aria-disabled={searchParams.isChoiceActive}
        tabIndex={searchParams.isChoiceActive ? -1 : undefined}
        replace={true}
        prefetch={true}
      >
        <Image
          className="dark:invert rotate-180 m-2 size-4"
          src="/vercel.svg"
          alt="Triangle"
          width={16}
          height={16}
          priority={true}
          quality={50}
        />
        {getText(searchParams, sceneSequences)}
      </Link>
    </div>
  )
}