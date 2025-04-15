import ChoicePanel from "./choicePanel";
import Content from "./content";
import { getPlaceholderImage, getSceneSequences } from "./serverGetters";
import { RawSearchParams, SceneSequence, SearchParams } from "./types";
import { AsyncParamsProvider } from "./asyncParamsContext";

const imageFolder = "/sceneImages/";

export default async function Home(props: {
  searchParams: Promise<RawSearchParams>,
}) {
  let searchParams: SearchParams = {
    sceneSequenceName: "",
    sceneIndex: -1,
    textIndex: -1,
    isChoiceActive: false
  }
  let sceneSequences: SceneSequence[] = [];

  const searchParamsPromise = props.searchParams.then((rawSearchParams) => {
    searchParams = {
      sceneSequenceName: String(rawSearchParams.sequence || "beginning"),
      sceneIndex: Number(rawSearchParams.scene || "0"),
      textIndex: Number(rawSearchParams.text || "0"),
      isChoiceActive: "true" === (rawSearchParams.choice || "false")
    }
  });

  const sceneSequencesPromise = getSceneSequences().then((sequences) => {
    sceneSequences = sequences;
  });

  const imgPlaceholdersPromise = Promise.all([searchParamsPromise, sceneSequencesPromise]).then(() => {
    const pendingPromises: Promise<string>[] = [];
    // Add placeholder images.
    sceneSequences.forEach((sceneSequence) => {
      sceneSequence.scenes.forEach((scene) => {
        const placeholderImgPromise = getPlaceholderImage(imageFolder + scene.image);
        pendingPromises.push(placeholderImgPromise);
        placeholderImgPromise.then(img => {
          scene.imagePlaceholder = img
        })
      })
    })
    return Promise.all(pendingPromises);
  })

  const asyncParamsPromise = imgPlaceholdersPromise.then(() => {
    return {
      searchParams: searchParams,
      sceneSequences: sceneSequences
    }
  })

  return (
    <main className="flex flex-grow flex-col sm:flex-row gap-8 justify-between items-center h-full w-full">
      <AsyncParamsProvider asyncParamsPromise={asyncParamsPromise}>
        <Content />
        <ChoicePanel />
      </AsyncParamsProvider>
    </main>
  );
}
