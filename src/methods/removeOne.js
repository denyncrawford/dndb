import { mingo } from '../../deps.ts';
import { ReadFileStream, WriteFileStream } from '../storage.ts';

export default async (filename ,query, operators, projection) => {
  const readStream = new ReadFileStream(filename);
  const writeStream = new WriteFileStream(filename);
  const queryMaker = new mingo.Query(query, projection);
  let removed = [];
  operators = Array.isArray(operators) ? operators : [operators]
  return new Promise((resolve, reject) => {
    readStream.on('document', obj => {
      if (queryMaker.test(obj) && removed.length == 0) 
        removed.push(obj)
      else if (obj._id !== removed[0]?._id)
        writeStream.emit("write", obj)
    })
    readStream.on("end", () => {
      writeStream.emit("end");
    })
    writeStream.on("close", () => {
      return resolve(removed[0] || null)
    })
  })
}