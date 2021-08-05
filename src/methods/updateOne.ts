import { matches, updater } from "../../deps.ts";
import { ReadFileStream, WriteFileStream } from "../storage.ts";
import type { DataObject, Mongobj } from "../types.ts";

export default (
  filename: string,
  query: Partial<DataObject> = {},
  operators: Mongobj<DataObject> = {},
  bufSize?: number,
) => {
  const readStream = new ReadFileStream(filename, bufSize);
  const writeStream = new WriteFileStream(filename);
  const updated: DataObject[] = [];
  return new Promise<DataObject>((resolve) => {
    readStream.on("document", (obj) => {
      if (matches(query, obj) && !updated.length) {
        updater.update(obj, operators);
        updated.push(obj);
      }
      writeStream.write(obj);
    });
    readStream.on("end", () => {
      writeStream.end();
    });
    writeStream.on("close", () => {
      return resolve(updated[0]);
    });
  });
};
