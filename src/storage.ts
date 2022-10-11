import { EventEmitter } from "std/node/events.ts";

type Doc = Record<string, unknown>;

function existsFileSync(filename: string) {
  try {
    return Deno.lstatSync(filename).isFile;
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) return false;
    else throw err;
  }
}

/** Ensure datastore initialization on first load
 * @deprecated Replaced by fs.ensureFile.
 */
export async function init(filename: string) {
  if (!existsFileSync(filename)) {
    await Deno.writeFile(filename, new TextEncoder().encode(""));
  }
}

/** Write file line by line on a stream */
export class WriteFileStream extends EventEmitter {
  private file: Deno.FsFile;
  private updatedFile: string;
  private readonly encoder = new TextEncoder();
  constructor(private filename: string) {
    super();
    this.updatedFile = `${this.filename}.updated`;
    if (existsFileSync(this.updatedFile)) {
      Deno.renameSync(this.updatedFile, this.filename);
    }
    this.file = Deno.openSync(this.updatedFile, { write: true, create: true });
  }
  public write(data: Doc) {
    this.file.writeSync(this.encoder.encode(JSON.stringify(data) + "\n"));
    return Promise.resolve(true);
  }
  public async end() {
    Deno.close(this.file.rid);
    await Deno.rename(this.updatedFile, this.filename);
    this.emit("close");
  }
}

/** Append file line by line */
export async function writeFile(filename: string, data: Doc) {
  await ensureExists(filename);
  await Deno.writeFile(
    filename,
    new TextEncoder().encode(JSON.stringify(data) + "\n"),
    { append: true },
  );
}

/** Reads the datastore by streaming and buffering chunks */
export class ReadFileStream extends EventEmitter {
  private readonly decoder = new TextDecoder("utf-8");
  constructor(private filename: string, private bufSize?: number) {
    super();
    this.stream();
  }
  async stream() {
    const file = await Deno.open(this.filename);
    for await (const line of file.readable) {
      if (line.length === 0) {
        continue;
      }
      this.emit("document", JSON.parse(this.decoder.decode(line)));
    }
    file.close();
    this.emit("end");
  }
}

/** Ensures data if file doesn't exists */
async function ensureExists(filename: string) {
  if (!existsFileSync(filename)) {
    await check(() => existsFileSync(filename), 100);
  }
  return;
}

/** Check Polyfill */
function check(condition: () => boolean, checkTime: number) {
  return new Promise((resolve) => {
    const timerId = setInterval(() => {
      if (condition()) {
        clearInterval(timerId);
        resolve("done");
      }
    }, checkTime);
  });
}
