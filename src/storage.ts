import { EventEmitter, existsSync, BufReader } from '../deps.ts'
const encoder = new TextEncoder();
const decoder = new TextDecoder();
let loaded;

/** 
 * Ensure datastore initialization on first load
 * @method init
 * @param {string} filename - File path to the data collections
*/

const init = async (filename:string) => {
  if (!existsSync(filename)) {
    await Deno.writeFile(filename, encoder.encode(''))
  }
  loaded = true
}

/** 
 * Write file line by line on a stream
 * @class WriteFileStream
 * @param {string} filename - File path to the data collections
*/

class WriteFileStream extends EventEmitter {
  private file: any;
  private updatedFile: string;
  constructor(private filename: string) {
    super();
    this.updatedFile = `${this.filename}.updated`;
    if (existsSync(this.updatedFile)) Deno.renameSync(this.updatedFile, this.filename);
    this.file = Deno.openSync(this.updatedFile, { write: true, create: true });
  }
  public async write(data: Object) {
    let uit8 = encoder.encode(JSON.stringify(data)+"\n")
    Deno.writeAllSync(this.file, uit8)
    return true
  }
  public async end() {
    Deno.close(this.file.rid);
    await Deno.rename(this.updatedFile, this.filename);
    this.emit("close");
  }
}

/** 
 * Append file line by line
 * @mehtod writeFile
 * @param {string} filename - File path to the data collections
 * @param {object} data - Data to write.
*/

const writeFile = async (filename:string, data:object) => {
  await ensureExists(filename);
  let doc:any = data = encoder.encode(JSON.stringify(data)+"\n");
  await Deno.writeFile(filename, doc, {append: true});
}

/** 
 * Reads the datastore by streaming and buffering chunks
 * @class ReadFileStream
 * @param {string} filename - File path to the data collections
 * @param {number=} bufSize - Rewrite the default buffer size
*/

class ReadFileStream extends EventEmitter {
  constructor(private filename: string, private bufSize?: number) {
    super();
    this.stream();
  }
  async stream() {
    const file = await Deno.open(this.filename);
    const bufReader = new BufReader(file, this.bufSize);
    let line: any;
    while ((line = await bufReader.readLine()) != null) {    
      let doc: object = JSON.parse(decoder.decode(line.line));
      this.emit('document', doc)
    }
    file.close();
    this.emit('end')
  }
}

/** 
 * Ensures data if file doesn't exists
 * @method ensureExists
 * @param {string} filename - File path to the data collections
*/

const ensureExists = async (filename:string) => {
  if (!existsSync(filename)) await check(() => existsSync(filename), 100)
  return
}

/** 
 * Esures the temp file is merged
 * @method ensureCommit
 * @param {string} filename - File path to the data collections
*/

const ensureCommit = async (filename:string) => {
  if (existsSync(filename)) await check(() => existsSync(filename), 100)
  return
}

// Check Polyfill

const check = (condition:any, checkTime:number) => {
  let promise = new Promise((resolve, reject) => {
    const timerId = setInterval(() => {
      if (condition()) {
        clearInterval(timerId)
        resolve('done');
      }
    }, checkTime)
  });
  return promise;
}

export {
  writeFile,
  ReadFileStream,
  WriteFileStream,
  init
}
