import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return (
        <main className=" flex-col self-stretch gap-8 items-center">
            <Link
                href="/"
            >
                <Image
                    className="rounded-md border border-solid"
                    src="/page-placeholder.png"
                    alt="Story page"
                    width={400}
                    height={300}
                    priority
                />
            </Link>

            <div className="flex gap-4 items-center flex-col sm:flex-row">
                <Link
                    className="rounded-md border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-48 sm:w-11/12 px-4 sm:px-5"
                    href="/"
                >
                    <Image
                        className="dark:invert rotate-180"
                        src="/vercel.svg"
                        alt="Vercel logomark"
                        width={20}
                        height={20}
                    />
                    Deploy now hafhafsihfihfwipwpwpih jiwdhiwd iwdiwh
                </Link>
            </div>
        </main>
    )

    return <p>Test page</p>;
}