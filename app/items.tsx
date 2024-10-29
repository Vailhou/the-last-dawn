import Link from "next/link";
import Image from 'next/image';

export default function Items() {
    return (
        <div className="flex h-full flex-col px-3 py-4 items-start justify-evenly md:px-2">
            <Link
                //className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
                href="/"
            >
                <Image
                    src="/item-placeholder.jpg"
                    width={100}
                    height={100}
                    className="rounded-full border border-solid"
                    alt="Red rose"
                />
            </Link>
            <Link
                //className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
                href="/"
            >
                <Image
                    src="/item-placeholder.jpg"
                    width={100}
                    height={100}
                    className="rounded-full border border-solid"
                    alt="Red rose"
                />
            </Link>
            <Link
                //className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
                href="/"
            >
                <Image
                    src="/item-placeholder.jpg"
                    width={100}
                    height={100}
                    className="rounded-full border border-solid"
                    alt="Red rose"
                />
            </Link>
        </div>
    );
}