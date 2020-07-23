
import { mingo } from '../../deps.js';
import { readFile, writeFile } from '../storage.js';

export default async (filename, query) => {
  let file = await readFile(filename);
  let remover = new mingo.remove(file, query);
  writeFile(filename, remover)
  return remover
}