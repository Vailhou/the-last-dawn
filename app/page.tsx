import ChoicePanel from "./choicePanel";
import Content from "./content";
import { getSceneSequences } from "./serverGetters";
import { AsyncParams, RawSearchParams, SceneSequence, SearchParams } from "./types";
import { AsyncParamsProvider } from "./asyncParamsContext";

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

  const asyncParamsPromise: Promise<AsyncParams> = props.searchParams.then((rawSearchParams) => {
    searchParams = {
      sceneSequenceName: String(rawSearchParams.sequence || "beginning"),
      sceneIndex: Number(rawSearchParams.scene || "0"),
      textIndex: Number(rawSearchParams.text || "0"),
      isChoiceActive: "true" === (rawSearchParams.choice || "false")
    }
  }).then(() => {
    getSceneSequences().then((sequences) => {
      sceneSequences = sequences;
    })
  }).then(() => {
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
