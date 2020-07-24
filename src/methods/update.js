import { mingo } from '../../deps.ts';
import { readFile, writeFile } from '../storage.js';

export default async (filename ,query, operators, projection) => {
  let fileContent = await readFile(filename);
  let queryMaker = new mingo.Query(query, projection);
  let results = queryMaker.find(fileContent, projection).all()
  operators = Array.isArray(operators) ? operators : [operators]
  let update = mingo.aggregate(results, operators)
  await writeFile(filename, merge(fileContent, update))
  return update;
}

const merge = (target, source) => {
  var reduced = target.filter(aitem => !source.find(bitem => aitem["_id"] === bitem["_id"]))
  return reduced.concat(source);
}