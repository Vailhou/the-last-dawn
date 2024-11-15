"use client"

import Image from "next/image";
import { useState } from "react";

export default function Items() {
  const [isItemsDisabled] = useState(true);

  return (
    <div className="flex h-full flex-col px-3 py-4 items-start justify-evenly md:px-2">
      <button
        //className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        disabled={isItemsDisabled}
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
        disabled={isItemsDisabled}
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
        disabled={isItemsDisabled}
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