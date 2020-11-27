import { Datastore } from "../src/mod.ts";
import { resolve } from 'https://deno.land/std/path/mod.ts';

let db 

Deno.test('Creating datastore collection', () => {
    return new Promise((res) => {
        db = new Datastore({ filename: "./db.db", autoload: true, onLoad: () => {
            res()
        } })
    })

})

Deno.test('Inserting Document', async () => {
    await db.insert({ name: 'denyn' })
})

Deno.test('Updating Documents', async () => {
    await db.update({ 
        name: 'denyn'
    },{
        $set: {
            name: 'Denyn'
        }
    })
})

Deno.test('Finding with callback', async () => {
    return new Promise((res) => {
        db.find({ name: 'Denyn' }, {}, docs => {
            res()
        });
    })
})

Deno.test('Finding with await', async () => {
    await db.find({ name: 'Denyn'})
})

Deno.test('Removing documents', async () => {
    await db.remove({ name: 'denyn'})
})
