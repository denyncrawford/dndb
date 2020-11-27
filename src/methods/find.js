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
  let content = [];
  stream.on('document', obj => {
    content[0] = obj;
    let result = queryMaker.find(content, projection).all();
    found = found.concat(result)
  })
  return new Promise((resolve, reject) => {
    stream.on('end', () => {
      resolve(found);
   })
  })
}