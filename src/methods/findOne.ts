import { default as project } from "mongo-project.node/bundle.js";
import { matches } from "safe-filter/index.js";
import { ReadFileStream } from "dndb/storage.ts";
import type { DataObject, Projection } from "dndb/types.ts";

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
