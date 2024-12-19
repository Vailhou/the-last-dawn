"use server"

import * as fs from "fs";
import { SceneSequence } from "./types";

const readPath = "./public/sceneSequences/";

// Get SceneSequence[] from multiple json files.
export async function getSceneSequences(): Promise<SceneSequence[]> {
  const fileNames = fs.readdirSync(readPath).filter(file => file.match(/\.json$/));
  console.log(fileNames);
  const typeList: SceneSequence[] = [];

  fileNames.forEach((fileName: string) => {
    const typeName = fileName.match(/(^.*?)\.json/);
    if (typeName) {
      const sceneSequenceString = fs.readFileSync(readPath + fileName, "utf8");
      const sceneSequenceObj = JSON.parse(sceneSequenceString);
      typeList.push(sceneSequenceObj);
    }
  })
  return typeList;
}