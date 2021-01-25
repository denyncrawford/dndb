import { _find, _insert, _findOne, _update, _updateOne, _remove, _removeOne } from './methods/mod.js';
import { init } from './storage.ts';
import DataStoreOptions from './types/ds.options.ts'
import { EventEmitter, resolve } from '../deps.ts'
import Executor from './executor.ts'

/**
 * Represents the Datastore instance.
 * @class
 * @param {object} options - Options to build the datastore.
*/

class Datastore extends EventEmitter {
    public filename: string;
    private bufSize?: number;
    private executor: Executor = new Executor();

    /**
     * Builds the datastore with the given options.
     * @constructor
     * @param {object} options - Options to build the datastore.
     */

    constructor({
        filename, 
        autoload, 
        timeStamp,
        bufSize
    } : DataStoreOptions) {
        super();
        this.filename = filename ? resolve(Deno.cwd(), filename) : resolve(Deno.cwd(), "./database.json");
        this.bufSize = bufSize;
        if (autoload) this.loadDatabase().then(() => {
            this.emit('load')
        })        
    };

    /**
    * Loads the database on first load and ensures that path exists.
    * @method
    */

    async loadDatabase () {
        return init(this.filename)
    }

    /**
    * Finds multiple matching documents.
    * @method find
    * @param {object | string} query - Query object
    * @param {object | string} projection - Projection object
    * @callback Optional callback
    * @return Promise
    */

    async find (query: {any: any}, projection: any = {}, cb: (x: any) => any) {
        if (cb && typeof cb == 'function') return cb(await this.executor.add(_find, [this.filename, query, projection, this.bufSize]));
        return this.executor.add(_find, [this.filename, query, projection, this.bufSize])
    }

    /**
    * Find first matching document.
    * @method findOne
    * @param {object | string} query - Query object
    * @param {object | string} projection - Projection object
    * @callback Optional callback
    * @return Promise
    */

    async findOne(query: {any: any}, projection: any = {}, cb: (x: any) => any) {
        projection = projection || {};
        if (cb && typeof cb == 'function') return cb(await this.executor.add(_findOne, [this.filename, query, projection, this.bufSize]));
        return this.executor.add(_findOne, [this.filename, query, projection, this.bufSize])
    }

    /**
    * Insert a document.
    * @method insert
    * @param {object} data - Data Insertion
    * @callback Optional callback
    * @return Promise
    */

    async insert (data: any, cb: (x: any) => any) {
        if (cb && typeof cb == 'function') cb(await this.executor.add(_insert, [this.filename, data]))
        return this.executor.add(_insert, [this.filename, data])
    }

    /**
    * Update multiple matching documents
    * @method update
    * @param {object | string} query - Query object
    * @param {object} operatos - Aggregation operators
    * @callback Optional callback
    * @return Promise
    */

    async update (query: {any: any}, operators: any, cb: (x: any) => any) {
        if (cb && typeof cb == "function") return cb(await this.executor.add(_update, [this.filename, query, operators, this.bufSize]));
        return this.executor.add(_update, [this.filename, query, operators, this.bufSize])
    }

    /**
    * Update first matching document
    * @method updateOne
    * @param {object | string} query - Query object
    * @param {object} operatos - Aggregation operators
    * @callback Optional callback
    * @return Promise
    */

    async updateOne (query: {any: any}, operators: any, cb: (x: any) => any) {
        if (cb && typeof cb == "function") return cb(await this.executor.add(_updateOne, [this.filename, query, operators, this.bufSize]));
        return this.executor.add(_updateOne, [this.filename, query, operators, this.bufSize])
    }

    /**
    * Remove multiple matching documents
    * @method removeOne
    * @param {object | string} query - Query object
    * @callback Optional callback
    * @return Promise
    */

    async remove(query: any, cb: (x: any) => any) {
        if (cb && typeof cb == "function") return cb(await this.executor.add(_remove, [this.filename, query, this.bufSize]));
        return this.executor.add(_remove, [this.filename, query, this.bufSize])
    }

    /**
    * Remove first matching document
    * @method removeOne
    * @param {object | string} query - Query object
    * @callback Optional callback
    * @return Promise
    */

    async removeOne(query: any, cb: (x: any) => any) {
        if (cb && typeof cb == "function") return cb(await this.executor.add(_removeOne, [this.filename, query, this.bufSize]));
        return this.executor.add(_removeOne, [this.filename, query, this.bufSize])
    }

} 

export { Datastore }

