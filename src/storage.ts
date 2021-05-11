import { EventEmitter, existsSync, readLines, writeAllSync } from "../deps.ts";

type Doc = Record<string, unknown>;

/** Ensure datastore initialization on first load */
export async function init(filename: string) {
  if (!existsSync(filename)) {
    await Deno.writeFile(filename, new TextEncoder().encode(""));
  }
}

/** Write file line by line on a stream */
export class WriteFileStream extends EventEmitter {
  private file: Deno.File;
  private updatedFile: string;
  constructor(private filename: string) {
    super();
    this.updatedFile = `${this.filename}.updated`;
    if (existsSync(this.updatedFile)) {
      Deno.renameSync(this.updatedFile, this.filename);
    }
    this.file = Deno.openSync(this.updatedFile, { write: true, create: true });
  }
  public write(data: Doc) {
    writeAllSync(
      this.file,
      new TextEncoder().encode(JSON.stringify(data) + "\n"),
    );
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
  constructor(private filename: string, private bufSize?: number) {
    super();
    this.stream();
  }
  async stream() {
    const file = await Deno.open(this.filename);
    for await (const line of readLines(file)) {
      if (line.length === 0) {
        continue;
      }
      this.emit("document", JSON.parse(line));
    }
    file.close();
    this.emit("end");
  }
}

/** Ensures data if file doesn't exists */
async function ensureExists(filename: string) {
  if (!existsSync(filename)) await check(() => existsSync(filename), 100);
  return;
}

/** Check Polyfill */
function check(condition: () => boolean, checkTime: number) {
  return new Promise((resolve) => {
    // deno-lint-ignore no-unused-vars
    const timerId = setInterval(() => {
      if (condition()) {
        clearInterval(timerId);
        resolve("done");
      }
    }, checkTime);
  });
}
