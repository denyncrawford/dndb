const encoder = new TextEncoder();
const decoder = new TextDecoder('utf-8');
import { EventEmitter } from "https://deno.land/std/node/events.ts";
import { BufReader } from "https://deno.land/std/io/bufio.ts";
import { existsSync } from "https://deno.land/std/fs/mod.ts";

// Ensure datastore initialization on first load

const init = async (filename:string) => {
  if (!existsSync(filename)) {
    await Deno.writeFile(filename, encoder.encode(''))
  }
}

// Writes and commits the datastore

const writeFile = async (filename:string, data:object) => {
  await ensureExists(filename);
  let doc:any = data = encoder.encode(JSON.stringify(data)+"\n");
  await Deno.writeFile(filename, doc, {append: true});
}

// Updates the whole datastore

const updateFile = async (filename:string, data:any) => {
  await ensureExists(filename);
  let load:string = await deserialize(data)
  let target:any = encoder.encode(load);
  await Deno.writeFile(filename, target);
}

// Reads the whole datastore

const readFile = async (filename:string) => {
  await ensureExists(filename);
  let data:any = await Deno.readFile(filename)
  data = decoder.decode(data);  
  data = await serialize(data);
  return data
}

// Reads the datastore by chunks

class ReadFileStream extends EventEmitter {
  constructor(private filename: string) {
    super();
    this.stream();
  }
  async stream() {
    const file = await Deno.open(this.filename);
    const bufReader = new BufReader(file);
    let line: any;
    while ((line = await bufReader.readString('\n')) != null) {
      let doc: object = JSON.parse(line)
      this.emit('document', doc)
    }
    this.emit('end','terminated')
    file.close();
  }
}

// Ensures data if file doesn't exists

const ensureExists = async (filename:string) => {
  if (!existsSync(filename)) await check(() => existsSync(filename), 100)
  return
}


// Serialize the data

const serialize = async (content:string) => {
  let collection:any = content.split('\n');
  return collection.filter((x:string) => x).map((doc:string) => JSON.parse(doc));
}

// Deserialize the data

const deserialize = async (data:any) => {  
  let output = data.filter((doc:any) => doc.length).map((doc:object) => JSON.stringify(doc)).join('\n')
  return output.length ? output +"\n" : "";
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
  readFile,
  writeFile,
  updateFile,
  ReadFileStream,
  init
}
