"use client"

import Image from "next/image";

interface Items {
  isItemsActive: boolean,
  disableItems: VoidFunction
}

export default function Items({ isItemsActive, disableItems }: Items) {
  interface Item {
    imgSrc: string;
    imgAlt: string;
  }
  
  function Item({ imgSrc, imgAlt }: Item ) {
    return (
      <button
        //className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        className="size-16 sm:size-24"
        disabled={isItemsActive}
        onClick={() => disableItems}
      >
        <Image
          src={imgSrc}
          width={128}
          height={128}
          className="rounded-full border border-solid"
          alt={imgAlt}
        />
      </button>
    )
  }

  return (
    <div className="flex w-full sm:w-auto sm:h-full flex-fow sm:flex-col px-2 py-2 sm:items-start justify-evenly md:px-2">
      <Item imgSrc="/rose.jpg" imgAlt="Rose" />
      <Item imgSrc="/dagger.png" imgAlt="Dagger" />
      <Item imgSrc="/letter.png" imgAlt="Letter" />
    </div>
  );
}