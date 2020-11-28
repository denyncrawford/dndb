import { matches, project }  from '../../deps.ts';
import { ReadFileStream } from '../storage.ts';

export default async (filename, query, projection) => {
  let stream = new ReadFileStream(filename);
  return new Promise((resolve, reject) => {
    stream.on('document', obj => {
      if (matches(query, obj)) {
        obj = Object.keys(projection).length ? project(obj, projection) : obj;
        resolve(obj)
      }
    })
    stream.on('end', () => {
      return resolve(null);
    })
  })
}