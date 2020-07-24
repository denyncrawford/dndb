const encoder = new TextEncoder();
const decoder = new TextDecoder('utf-8');
import { existsSync } from "https://deno.land/std/fs/mod.ts";

// Ensure datastore initialization on first load

const init = async (filename) => {
  if (!existsSync(filename)) {
    await Deno.writeFile(filename, encoder.encode('{"x":[]}'))
  }
}

// Writes and commits the datastore

const writeFile = async (filename, data) => {
  await ensureExists(filename);
  data = await deserialize(data)
  data = encoder.encode(data);
  await Deno.writeFile(`${filename}~`, data);
  await Deno.remove(filename, {
    recursive: true
  });
  await Deno.rename(`${filename}~`, filename);
}

// Reads the datastore

const readFile = async (filename) => {
  await ensureCommit(filename)
  await ensureExists(filename);
  let data = await Deno.readFile(filename)
  data = decoder.decode(data);
  data = await serialize(data);
  return data
}

// Ensures data commitment

const ensureCommit = async (filename) => {
  if (existsSync(`${filename}~`)) await check(() => !existsSync(`${filename}~`), 100)
  return
}

// Ensures data exists

const ensureExists = async (filename) => {
  if (!existsSync(filename)) await check(() => existsSync(filename), 100)
  return
}


// Serialize the data

const serialize = async (content) => {
  return JSON.parse(content).x
}

// Deserilizes the data

const deserialize = async (x) => {
    return JSON.stringify({
        x
    })
}

const check = (condition, checkTime) => {
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
  init
}
