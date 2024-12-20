"use server"

import * as fs from "fs";
import { SceneSequence } from "./types";

const jsonFilesPath = "/app/sceneSequences/";

// Get SceneSequence[] from multiple json files.
export async function getSceneSequences(): Promise<SceneSequence[]> {
  const path = process.cwd() + jsonFilesPath;
  const fileNames = fs.readdirSync(path).filter(file => file.match(/\.json$/));
  const typeList: SceneSequence[] = [];

  fileNames.forEach((fileName: string) => {
    const typeName = fileName.match(/(^.*?)\.json/);
    if (typeName) {
      const sceneSequenceString = fs.readFileSync(path + fileName, "utf8");
      const sceneSequenceObj = JSON.parse(sceneSequenceString);
      typeList.push(sceneSequenceObj);
    }
  })
  return typeList;
}