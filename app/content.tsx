import Link from "next/link";
import Image from "next/image";
import { charm } from "./fonts/fonts";
import { getImgSrc, getNextLink, getText } from "./getters";

type Content = {
  sceneSequenceName: string
  sceneIndex: number
  textIndex: number
  isChoiceActive: boolean
}

export default async function Content({ sceneSequenceName, sceneIndex, textIndex, isChoiceActive }: Content) {
  return (
    <div className="flex flex-grow flex-col gap-8 justify-center items-center h-full w-full">
      {getNextLink(sceneSequenceName, sceneIndex, textIndex, isChoiceActive).then((link) => (
        <>
          <Link
            href={link}
            className={isChoiceActive ? "pointer-events-none" : ""}
            aria-disabled={isChoiceActive}
            tabIndex={isChoiceActive ? -1 : undefined}
            replace={true}
          >
            {getImgSrc(sceneSequenceName, sceneIndex).then((imgSrc) => (
              <Image
                className="rounded-md border border-solid"
                src={imgSrc}
                alt="Story page"
                width={500}
                height={300}
                priority
              />
            ))}
          </Link>
          <Link
            href={link}
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
            {getText(sceneSequenceName, sceneIndex, textIndex)}
          </Link>
        </>
      ))}
    </div>
  )
}