import { mingo } from '../../deps.ts';
import { readFile, writeFile } from '../storage.js';

export default async (filename, query) => {
  let fileContent = await readFile(filename);
  let remover = new mingo.remove(fileContent, query);
  await writeFile(filename, remover)
  return remover
}