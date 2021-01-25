import { matches }  from '../../deps.ts';
import { ReadFileStream, WriteFileStream } from '../storage.ts';

export default async (filename, query, bufSize) => {
  const readStream = new ReadFileStream(filename, bufSize);
  const writeStream = new WriteFileStream(filename);
  let removed = [];
  query = query || {};
  return new Promise((resolve, reject) => {
    readStream.on('document', obj => {
      if (!matches(query, obj)) 
        writeStream.write(obj)
      else 
        removed.push(obj)
    })
    readStream.on("end", () => {
      writeStream.end();
    })
    writeStream.on("close", () => {
      return resolve(removed)
    })
  })
}