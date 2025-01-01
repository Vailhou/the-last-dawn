"use server"

import * as fs from "fs";
import { SceneSequence } from "./types";
import sharp from "sharp";

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

function bufferToBase64(buffer: Buffer): string {
  return `data:image/png;base64,${buffer.toString('base64')}`
}

async function getBuffer(url: string) {
  const response = await fetch(url)
  return Buffer.from(await response.arrayBuffer())
}

export async function getPlaceholderImage(url: string) {
  try {
    const lowResImage = await getBuffer(
      `${process.env.NEXT_URL}_next/image?url=${encodeURIComponent(
        url
      )}&w=48&q=50`
    )
    const resizedBuffer = await sharp(lowResImage).resize(20).toBuffer()
    return {
      placeholder: bufferToBase64(resizedBuffer),
    }
  } catch {
    return {
      placeholder:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg==',
    }
  }
}
