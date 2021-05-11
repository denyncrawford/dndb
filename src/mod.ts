import type { DataObject, DbResults, Projection } from "./types.ts";
import {
  _find,
  _findOne,
  _insert,
  _remove,
  _removeOne,
  _update,
  _updateOne,
} from "./methods/mod.ts";
import { init } from "./storage.ts";
import type DataStoreOptions from "./types/ds.options.ts";
import { EventEmitter, resolve } from "../deps.ts";
import Executor from "./executor.ts";

/** Represents the Datastore instance. */
export class Datastore<Doc extends DataObject> extends EventEmitter {
  public filename: string;
  private bufSize?: number;
  private executor = new Executor();

  /** Builds the datastore with the given options. */
  constructor({
    filename,
    autoload,
    bufSize,
  }: DataStoreOptions) {
    super();
    this.filename = filename
      ? resolve(Deno.cwd(), filename)
      : resolve(Deno.cwd(), "./database.json");
    this.bufSize = bufSize;
    if (autoload) {
      this.loadDatabase().then(() => this.emit("load"));
    }
  }

  /** Loads the database on first load and ensures that path exists. */
  loadDatabase() {
    return init(this.filename);
  }

  /** Finds multiple matching documents. */
  async find(
    query: Partial<Doc>,
    projection: Partial<Projection<keyof Doc>> = {},
    cb?: (x: DbResults<Doc>) => void,
  ) {
    const results = await this.executor.add(
      _find,
      [this.filename, query, projection, this.bufSize] as const,
    ) as DbResults<Doc>;
    if (cb && typeof cb === "function") {
      cb(results);
    }
    return results;
  }

  /** Find first matching document. */
  async findOne(
    query: Partial<Doc>,
    projection: Partial<Projection<keyof Doc>> = {},
    cb?: (x: DbResults<Doc>) => void,
  ) {
    const results = await this.executor.add(
      _findOne,
      [this.filename, query, projection, this.bufSize] as const,
    ) as DbResults<Doc>;
    if (cb && typeof cb === "function") {
      cb(results);
    }
    return results;
  }

  /** Insert a document. */
  async insert(
    data: Doc,
    cb?: (x: DbResults<Doc>) => void,
  ) {
    const results = await this.executor.add(
      _insert,
      [this.filename, data] as const,
    ) as DbResults<Doc>;
    if (cb && typeof cb === "function") {
      cb(results);
    }
    return results;
  }

  /** Update multiple matching documents */
  async update(
    query: Partial<Doc>,
    operators: Partial<Doc>,
    cb?: (x: DbResults<Doc>) => void,
  ) {
    const results = await this.executor.add(
      _update,
      [this.filename, query, operators, this.bufSize] as const,
    ) as DbResults<Doc>;
    if (cb && typeof cb === "function") {
      cb(results);
    }
    return results;
  }

  /** Update first matching document */
  async updateOne(
    query: Partial<Doc>,
    operators: Partial<Doc>,
    cb?: (x: DbResults<Doc>) => void,
  ) {
    const results = await this.executor.add(
      _updateOne,
      [this.filename, query, operators, this.bufSize] as const,
    ) as DbResults<Doc>;
    if (cb && typeof cb == "function") {
      cb(results);
    }
    return results;
  }

  /** Remove multiple matching documents */
  async remove(query: Partial<Doc>, cb?: (x: DbResults<Doc>) => void) {
    const results = await this.executor.add(
      _remove,
      [this.filename, query, this.bufSize] as const,
    ) as DbResults<Doc>;
    if (cb && typeof cb === "function") {
      cb(results);
    }
    return results;
  }

  /** Remove first matching document */
  async removeOne(query: Partial<Doc>, cb?: (x: DbResults<Doc>) => void) {
    const results = await this.executor.add(
      _removeOne,
      [this.filename, query, this.bufSize] as const,
    ) as DbResults<Doc>;
    if (cb && typeof cb === "function") {
      cb(results);
    }
    return results;
  }
}
