import { readFile, writeFile } from '../storage.js';
import { v1 } from "https://deno.land/std/uuid/mod.ts";

export default async (filename ,data) => {
  let file = await readFile(filename);
  if(Array.isArray(data)) {
    data.forEach(o => {
      o._id = o._id || v1.generate();
      file.push(o);
    })
  } else {
    data._id = data._id || v1.generate();
    file.push(data);
  }
  await writeFile(filename, file)
  return data
}