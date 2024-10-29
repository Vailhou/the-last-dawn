import Image from "next/image";
import Link from "next/link";
import { charm } from "./fonts/fonts";

export default function Home() {
  return (
      <main className="flex flex-grow flex-col gap-8 justify-between items-center h-full w-full">
        <Link
          href="/"
        >
          <Image
            className="rounded-md border border-solid"
            src="/page-placeholder.png"
            alt="Story page"
            width={500}
            height={300}
            priority
          />
        </Link>
        <Link
          className={`${charm.className} rounded-md border border-solid border-transparent transition-colors flex items-start bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-2xl h-10 sm:h-48 sm:w-11/12 px-4 sm:px-5 p-5`}
          href="/"
        >
          <Image
            className="dark:invert rotate-180 m-2"
            src="/vercel.svg"
            alt="Vercel logomark"
            width={16}
            height={16}
          />
          This box will have text.
        </Link>
      </main>
  );
}
