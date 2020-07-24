import { mingo } from '../../deps.ts';
import { readFile } from '../storage.js';

export default async (filename ,query, projection) => {
  let fileContent = await readFile(filename);
  let queryMaker = new mingo.Query(query, projection);
  return queryMaker.find(fileContent, projection).limit(1).all()[0] || null
}