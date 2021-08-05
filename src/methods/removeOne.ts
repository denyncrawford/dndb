import { matches } from "../../deps.ts";
import { ReadFileStream, WriteFileStream } from "../storage.ts";
import type { DataObject } from "../types.ts";

export default (
  filename: string,
  query: Partial<DataObject> = {},
  bufSize?: number,
) => {
  const readStream = new ReadFileStream(filename, bufSize);
  const writeStream = new WriteFileStream(filename);
  const removed: DataObject[] = [];
  return new Promise<DataObject>((resolve) => {
    readStream.on("document", (obj) => {
      if (matches(query, obj) && removed.length === 0) {
        removed.push(obj);
      } else if (obj._id !== removed[0]?._id) {
        writeStream.write(obj);
      }
    });
    readStream.on("end", () => {
      writeStream.end();
    });
    writeStream.on("close", () => {
      return resolve(removed[0]);
    });
  });
};
