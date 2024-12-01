import Image from "next/image";
import Link from "next/link";
import { charm } from "./fonts/fonts";
import { choiceName, getItemLink } from "./getters";

interface Items {
  sceneSequenceName: string
  isChoiceActive: boolean
}

export default function Items({ isChoiceActive }: Items) {
  type Item = {
    imgSrc: string
    imgAlt: string
    choiceName: string
  }

  function Item({ imgSrc, imgAlt, choiceName }: Item) {
    return (
      <Link
        // href={test("test")}
        // href={getItemLink("beginning", "romantic")}
        href={getItemLink("beginning", choiceName)}
        // href={getLink("beginning", 0, 0)}
        className={`${charm.className} ${!isChoiceActive ? "pointer-events-none" : ""} size-16 sm:size-24`}
        aria-disabled={!isChoiceActive}
        tabIndex={!isChoiceActive ? -1 : undefined}
        replace={true}
        prefetch={false}
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

  return (
    <div className="flex w-full sm:w-auto sm:h-full flex-fow sm:flex-col px-2 py-2 sm:items-start justify-evenly md:px-2">
      <Item imgSrc="/rose.jpg" imgAlt="Rose" choiceName={choiceName.romantic} />
      <Item imgSrc="/dagger.png" imgAlt="Dagger" choiceName={choiceName.violent} />
      <Item imgSrc="/letter.png" imgAlt="Letter" choiceName={choiceName.neutral} />
    </div>
  );
}