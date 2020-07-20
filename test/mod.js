
import Datastore from 'https://x.nest.land/dndb@0.0.2/mod.js'
import { resolve } from 'https://deno.land/std/path/mod.ts';
import { __ } from 'https://deno.land/x/dirname/mod.ts';
const { __dirname } = __(import.meta)

// Creating datastore collection

const db = new Datastore({filename: resolve(__dirname, "./db.db"), autoload:true})

// Inserting Document

await db.insert({name:"denyn"});

// Updating Documents

let update = await db.update({name:"denyn"},{$set: {name:"Denyn"}});

// Finding with callback

db.find({name:"Denyn"}, {}, (doc) => {
  console.log(doc);
});

// Removing documents

let remove = await db.remove({_id: "3bddda30-c9da-11ea-a831-89bf3cffb9a3"})

// Finding with await

let data = await db.find({name:"Denyn"})

console.log(update,remove,data);