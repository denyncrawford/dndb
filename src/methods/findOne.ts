import { matches, project } from "../../deps.ts";
import { ReadFileStream } from "../storage.ts";
import type { DataObject, Projection } from "../types.ts";

export default (
  filename: string,
  query: Partial<DataObject> = {},
  projection: Partial<Projection<keyof DataObject>> = {},
  bufSize?: number,
) => {
  const stream = new ReadFileStream(filename, bufSize);
  return new Promise<DataObject | void>((resolve) => {
    stream.on("document", (obj) => {
      if (matches(query, obj)) {
        resolve(
          Object.keys(projection).length ? project(obj, projection) : obj,
        );
      }
    });
    stream.on("end", () => {
      return resolve();
    });
  });
};
