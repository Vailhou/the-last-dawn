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

  // const sequence = searchParams.sequence;
  // const scene = searchParams.scene;
  // const text = searchParams.text;
  // const choice = searchParams.choice;

  // const sceneSequenceName = String(sequence || "beginning");
  // const sceneIndex = Number(scene || "0");
  // const textIndex = Number(text || "0");
  // const isChoiceActive = ("true" === (choice || "false)"));

  // if (sceneSequenceName === "end") {
  //   return (
  //     <main className="flex flex-grow flex-col sm:flex-row gap-8 justify-between items-center h-full w-full">
  //       <p>Endscreen</p>
  //     </main>
  //   )
  // }

  return (
    <main className="flex flex-grow flex-col sm:flex-row gap-8 justify-between items-center h-full w-full">
      <SearchParamsProvider searchParamsPromise={searchParamsPromise}>
        <SceneSequencesProvider sceneSequencesPromise={sceneSequencePromise}>
          <Content />
        </SceneSequencesProvider>
      </SearchParamsProvider>
      {/* <Content
        sceneSequenceName={sceneSequenceName}
        sceneIndex={sceneIndex}
        textIndex={textIndex}
        isChoiceActive={isChoiceActive}
      /> */}
      {/* <ChoicePanel
        sceneSequenceName={sceneSequenceName}
        isChoiceActive={isChoiceActive}
      /> */}
    </main>
  );
}
