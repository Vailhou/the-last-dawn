"use client"

import Image from "next/image";

interface Items {
  isItemsActive: boolean,
  disableItems: VoidFunction
}

export default function Items({ isItemsActive, disableItems }: Items) {

  return (
    <div className="flex h-full flex-col px-3 py-4 items-start justify-evenly md:px-2">
      <button
        //className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        disabled={isItemsActive}
        onClick={() => disableItems}
      >
        <Image
          src="/rose.jpg"
          width={100}
          height={100}
          className="rounded-full border border-solid"
          alt="Rose"
        />
      </button>
      <button
        //className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        disabled={isItemsActive}
      >
        <Image
          src="/dagger.png"
          width={100}
          height={100}
          className="rounded-full border border-solid"
          alt="Dagger"
        />
      </button>
      <button
        //className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        disabled={isItemsActive}
      >
        <Image
          src="/letter.png"
          width={100}
          height={100}
          className="rounded-full border border-solid"
          alt="Letter"
        />
      </button>
    </div>
  );
}