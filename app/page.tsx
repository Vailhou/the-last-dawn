import Choices from "./choices";
import Content from "./content";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Home(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams;
  const sequence = searchParams.sequence;
  const scene = searchParams.scene;
  const text = searchParams.text;
  const choice = searchParams.choice;

  const sceneSequenceName = String(sequence || "beginning");
  const sceneIndex = Number(scene || "0");
  const textIndex = Number(text || "0");
  const isChoiceActive = ("true" === (choice || "false)"));

  if (sceneSequenceName === "end") {
    return (
      <main className="flex flex-grow flex-col sm:flex-row gap-8 justify-between items-center h-full w-full">
        <p>Endscreen</p>
    </main>
    )
  }

  return (
    <main className="flex flex-grow flex-col sm:flex-row gap-8 justify-between items-center h-full w-full">
      <Content
        sceneSequenceName={sceneSequenceName}
        sceneIndex={sceneIndex}
        textIndex={textIndex}
        isChoiceActive={isChoiceActive}
      />
      <Choices
        sceneSequenceName={sceneSequenceName}
        isChoiceActive={isChoiceActive}
      />
    </main>
  );
}
