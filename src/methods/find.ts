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
  const found: DataObject[] = [];
  stream.on("document", (obj) => {
    if (matches(query, obj)) {
      found.push(
        Object.keys(projection).length ? project(obj, projection) : obj,
      );
    }
  });
  return new Promise<DataObject[]>((resolve) => {
    stream.on("end", () => {
      resolve(found);
    });
  });
};
