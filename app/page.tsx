import Image from "next/image";
import { charm } from "./fonts/fonts";
import Link from "next/link";
import Items from "./items";
import { getImgSrc, getLink, getText } from "./getters";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Home(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams;
  const sequence = searchParams.sequence;
  const scene = searchParams.scene;
  const text = searchParams.text;
  const choice = searchParams.choice;

  const sceneSequenceName = String(sequence || "beginning");
  const sceneIndex = Number(scene || "0");
  const textIndex = Number(text || "0");
  const isChoiceActive = ("true" === (choice || "false)"));

  return (
    <main className="flex flex-grow flex-col sm:flex-row gap-8 justify-between items-center h-full w-full">
      <div className="flex flex-grow flex-col gap-8 justify-center items-center h-full w-full">
        <Link
          href={getLink(sceneSequenceName, sceneIndex, textIndex)}
          className={isChoiceActive ? "pointer-events-none" : ""}
          aria-disabled={isChoiceActive}
          tabIndex={isChoiceActive ? -1 : undefined}
          replace={true}
        >
          <Image
            className="rounded-md border border-solid"
            src={getImgSrc(sceneIndex)}
            alt="Story page"
            width={500}
            height={300}
            priority
          />
        </Link>
        <Link
          href={getLink(sceneSequenceName, sceneIndex, textIndex)}
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
          {getText(sceneIndex, textIndex)}
        </Link>
      </div>
      <Items
        sceneSequenceName={sceneSequenceName}
        isChoiceActive={isChoiceActive}
      />
    </main>
  );
}
