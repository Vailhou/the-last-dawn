import ChoicePanel from "./choicePanel";
import Content from "./content";
import { getSceneSequences } from "./gettersServer";
import { SceneSequencesProvider } from "./sceneSequenceContext";
import { SearchParamsProvider } from "./searchParamsContext";
import { RawSearchParams, SearchParams } from "./types";

export default async function Home(props: {
  searchParams: Promise<RawSearchParams>,
}) {
  const searchParamsPromise: Promise<SearchParams> = props.searchParams.then((searchParams) => {
    return {
      sceneSequenceName: String(searchParams.sequence || "beginning"),
      sceneIndex: Number(searchParams.scene || "0"),
      textIndex: Number(searchParams.text || "0"),
      isChoiceActive: ("true" === (searchParams.choice || "false"))
    }
  });
  const sceneSequencePromise = getSceneSequences().then((sceneSequences) => (
    sceneSequences
  ));

  return (
    <main className="flex flex-grow flex-col sm:flex-row gap-8 justify-between items-center h-full w-full">
      <SearchParamsProvider searchParamsPromise={searchParamsPromise}>
        <SceneSequencesProvider sceneSequencesPromise={sceneSequencePromise}>
          <Content />
          <ChoicePanel />
        </SceneSequencesProvider>
      </SearchParamsProvider>
    </main>
  );
}
