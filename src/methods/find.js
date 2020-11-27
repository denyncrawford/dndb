import { mingo } from '../../deps.ts';
import { ReadFileStream } from '../storage.ts';


// export default async (filename ,query, projection) => {
//   let fileContent = await readFile(filename);
//   let queryMaker = new mingo.Query(query, projection);
//   return queryMaker.find(fileContent, projection).all()
// }

export default async (filename, query, projection) => {
  let stream = new ReadFileStream(filename);
  const queryMaker = new mingo.Query(query, projection);
  let found = [];
  stream.on('document', obj => {
    if (queryMaker.test(obj))
    found.push(obj)
  })
  return new Promise((resolve, reject) => {
    stream.on('end', () => {
      resolve(found);
   })
  })
}