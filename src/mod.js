import { resolve } from 'https://deno.land/std/path/mod.ts';
import { _find, _insert, _findOne, _update, _remove } from './methods/mod.js';
import { init } from './storage.js';

class Datastore {

  constructor(options) {
    let { filename, autoload, timeStamp } = options || {};
    this.filename = filename ? resolve(Deno.cwd(), filename) : resolve(Deno.cwd(), "./database.json");
    if (autoload) this.loadDatabase();
  };

  // Loads the database on first load and ensures that path exists.

  async loadDatabase () {
    await init(this.filename)
  }

  // Find a document

  async find (query, projection, cb) {
    projection = projection || {};
    if (cb && typeof cb == "function") return cb(await _find(this.filename, query, projection));
    return _find(this.filename, query, projection)
  }

  // Find first matching document

  async findOne(query, projection, cb) {
    projection = projection || {};
    if (cb && typeof cb == "function") return cb(await _findOne(this.filename, query, projection));
    return _findOne(this.filename, query, projection)
  }

  // Inserts a document

  async insert (data, cb) {
    if (cb && typeof cb == "function") return cb(await _insert(this.filename, data));
    return _insert(this.filename, data)
  }

  // Updates matching documents

  async update (query, operators, projection, cb) {
    projection = projection || {};
    if (cb && typeof cb == "function") return cb(await _update(this.filename, query, operators));
    return _update(this.filename, query, operators)
  }

  // Removes matching document

  async remove(query, cb) {
    if (cb && typeof cb == "function") return cb(await _remove(this.filename, query));
    return _remove(this.filename, query)
  }

} 

export { Datastore }

