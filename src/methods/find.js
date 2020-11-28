import { matches, project }  from '../../deps.ts';
import { ReadFileStream } from '../storage.ts';

export default async (filename, query, projection) => {
  let stream = new ReadFileStream(filename);
  let found = []; 
  stream.on('document', obj => {
    if (matches(query , obj)){
      console.log(obj);
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