import { mingo } from '../../deps.ts';
import { ReadFileStream, updateFile } from '../storage.ts';

export default async (filename ,query, operators, projection) => {
  let stream = new ReadFileStream(filename);
  let results = [];
  let collection = [];
  const queryMaker = new mingo.Query(query, projection);
  operators = Array.isArray(operators) ? operators : [operators]
  return new Promise((resolve, reject) => {
    stream.on('document', obj => {
      if (queryMaker.test(obj) && results.length == 0) results.push(obj)
      collection.push(obj)
    })
    stream.on('end', async () => {
      let update = mingo.aggregate(results, operators)
      await updateFile(filename, merge(collection, update))
      return resolve(update);
    })
  })
}

const merge = (target, source) => {
  var reduced = target.filter(aitem => !source.find(bitem => aitem["_id"] === bitem["_id"]))
  return reduced.concat(source);
}