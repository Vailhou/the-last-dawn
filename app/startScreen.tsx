"use client";

import { useRouter } from "next/navigation";

export default function StartScreen() {
  const router = useRouter();

  const startExperience = () => {
    router.replace("?sequence=beginning&scene=0&text=0&choice=true");
  };

  return (
    <div className="flex flex-col items-center justify-center text-white gap-6 p-6 w-full h-full bg-black">
      <h1 className="text-3xl sm:text-5xl font-bold text-center">Tervetuloa tarinaan</h1>
      <p className="text-lg sm:text-xl text-center max-w-xl">
        Aloita matka kohti mysteerejä, valintoja ja kohtaloa.
      </p>
      <button
        onClick={startExperience}
        className="bg-white text-black px-6 py-3 rounded-lg text-lg hover:bg-gray-300 transition-all"
      >
        Aloita
      </button>
    </div>
  );
}