import { useState, useEffect } from "react";
import Link from "next/link";
import ChoicePanel from "./choicePanel";
import Content from "./content";
import { getPlaceholderImage, getSceneSequences } from "./serverGetters";
import { RawSearchParams, SceneSequence, SearchParams } from "./types";
import { AsyncParamsProvider } from "./asyncParamsContext";

const imageFolder = "/sceneImages/";

export default function Home(props: { searchParams: Promise<RawSearchParams> }) {
  // Overlay näkyy aluksi
  const [overlayVisible, setOverlayVisible] = useState(true);

  const [searchParams, setSearchParams] = useState<SearchParams>({
    sceneSequenceName: "",
    sceneIndex: -1,
    textIndex: -1,
    isChoiceActive: false,
  });

  const [sceneSequences, setSceneSequences] = useState<SceneSequence[]>([]);

  // Funktio, joka poistaa overlayn, kun nappia painetaan
  const handleBeginClick = () => {
    setOverlayVisible(false); // Overlay katoaa
  };

  useEffect(() => {
    const fetchData = async () => {
      const rawSearchParams = await props.searchParams;
      const newSearchParams: SearchParams = {
        sceneSequenceName: String(rawSearchParams.sequence || "beginning"),
        sceneIndex: Number(rawSearchParams.scene || "0"),
        textIndex: Number(rawSearchParams.text || "0"),
        isChoiceActive: "true" === (rawSearchParams.choice || "false"),
      };
      setSearchParams(newSearchParams);

      const sequences = await getSceneSequences();
      setSceneSequences(sequences);

      await Promise.all(
        sequences.flatMap((sequence) =>
          sequence.scenes.map(async (scene) => {
            const img = await getPlaceholderImage(imageFolder + scene.image);
            scene.imagePlaceholder = img;
          })
        )
      );
    };
    fetchData();
  }, [props.searchParams]);

  const asyncParamsPromise = Promise.resolve({
    searchParams: searchParams,
    sceneSequences: sceneSequences,
  });

  return (
    <div className="relative h-screen">
      {/* Overlay */}
      {overlayVisible && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl sm:text-6xl mb-6 font-bold">Tervetuloa</h1>
            <p className="mb-10 text-lg sm:text-xl">
              Aloita seikkailusi painamalla alla olevaa nappia.
            </p>
            <button
              onClick={handleBeginClick}
              className="px-6 py-3 bg-white text-black rounded-xl hover:bg-gray-200 transition-colors"
            >
              Begin
            </button>
          </div>
        </div>
      )}

      {/* Pelin sisältö */}
      {!overlayVisible && (
        <main className="flex flex-grow flex-col sm:flex-row gap-8 justify-between items-center h-full w-full bg-black">
          <AsyncParamsProvider asyncParamsPromise={asyncParamsPromise}>
            <Content />
            <ChoicePanel />
          </AsyncParamsProvider>
        </main>
      )}
    </div>
  );
}
