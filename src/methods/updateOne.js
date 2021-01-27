import { updater, matches } from '../../deps.ts';
import { ReadFileStream, WriteFileStream } from '../storage.ts';
import Executor from '../executor.ts'

export default async (filename ,query, operators, bufSize) => {
  const readStream = new ReadFileStream(filename, bufSize);
  const writeStream = new WriteFileStream(filename);
  let updated = [];
  query = query || {};
  return new Promise((resolve, reject) => {
    readStream.on('document', async obj => {
      if (matches(query, obj) && !updated.length) {
        updater.update(obj, operators);
        updated.push(obj)
      }
      writeStream.write(obj)
    })
    readStream.on("end", () => {
      writeStream.end();
    })
    writeStream.on("close", () => {
      return resolve(updated[0] || null)
    })
  })
}