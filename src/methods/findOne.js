import { mingo } from '../../deps.js';
import { readFile } from '../storage.js';

export default async (filename ,query, projection) => {
  let file = await readFile(filename);
  let queryMaker = new mingo.Query(query, projection);
  return queryMaker.find(file, projection).limit(1).all()[0] || null
}