import { mingo } from '../../deps.ts';
import { ReadFileStream } from '../storage.ts';

// export default async (filename ,query, projection) => {
//   let fileContent = await readFile(filename);
//   let queryMaker = new mingo.Query(query, projection);
//   return queryMaker.find(fileContent, projection).limit(1).all()[0] || null
// }

export default async (filename, query, projection) => {
  let stream = new ReadFileStream(filename);
  const queryMaker = new mingo.Query(query, projection);
  return new Promise((resolve, reject) => {
    stream.on('document', obj => {
      if (queryMaker.test(obj)) resolve(obj)
    })
    stream.on('end', () => {
      return resolve(null);
    })
  })
}