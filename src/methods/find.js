import { matches, project }  from '../../deps.ts';
import { ReadFileStream } from '../storage.ts';

export default async (filename, query, projection, bufSize) => {
  const stream = new ReadFileStream(filename, bufSize);
  let found = [];
  query = query || {};
  stream.on('document', obj => {
    if (matches(query , obj)){
      obj = Object.keys(projection).length ? project(obj, projection) : obj;
      found.push(obj)
    }
  })
  return new Promise((resolve, reject) => {
    stream.on('end', () => {
      resolve(found);
   })
  })
}