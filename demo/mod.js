import Datastore from 'https://x.nest.land/dndb@0.1.0/mod.ts'
import { Application } from "https://deno.land/x/abc@v1/mod.ts";

const app = new Application();

const db = new Datastore({filename: "./database.db", autoload:true})


app.get("/:username", async (ctx) => {
  const { username } = ctx.params;
  let dbResponse = await db.findOne({username})
  return JSON.stringify(dbResponse, null, 2);
});

app.post("/:username", async (ctx) => {
  const { username } = ctx.params;
  let doc = await db.insert({username})
  return JSON.stringify(doc, null, 2)
})

app.start({ port: 3000 });

console.log("http://localhost:3000");