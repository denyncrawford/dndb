import { mingo } from '../../deps.ts';
import { readFile, updateFile } from '../storage.ts';

export default async (filename, query) => {
  let fileContent = await readFile(filename);
  let remover = new mingo.remove(fileContent, query);
  await updateFile(filename, remover)
  return remover
}