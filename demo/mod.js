import Datastore from '../mod.ts'
import { Application } from "https://deno.land/x/abc@v1/mod.ts";

const app = new Application();

const db = new Datastore({filename: "./database.db", autoload:true})

// Get all the users

app.get("/all", async ctx => {
  let dbResponse = await db.find({})
  return JSON.stringify(dbResponse, null, 2);
})

// Get all users that match in username

app.get("/all/:match", async ctx => {
  const { match } = ctx.params;
  let dbResponse = await db.find({username: match})
  return JSON.stringify(dbResponse, null, 2);
})

// Get exact first match user

app.get("/:username", async (ctx) => {
  const { username } = ctx.params;
  let dbResponse = await db.findOne({username}, {username:0})
  return JSON.stringify(dbResponse, null, 2);
});

// Post a new user

app.post("/:username", async (ctx) => {
  const { username } = ctx.params;
  let doc = await db.insert({username, name:username})
  return JSON.stringify(doc, null, 2)
})

// Delete one user

app.delete("/:username", async (ctx) => {
  const { username } = ctx.params;
  let doc = await db.removeOne({username})
  return JSON.stringify(doc, null, 2)
})

// Delete all users

app.delete("/all/:username", async (ctx) => {
  const { username } = ctx.params;
  let doc = await db.remove({username})
  return JSON.stringify(doc, null, 2)
})

// Update first user that match username

app.put("/:username/:newUsername", async (ctx) => {
  const { username, newUsername } = ctx.params;
  let doc = await db.updateOne({username}, {$set: {username:newUsername}})
  return JSON.stringify(doc, null, 2)
})

// Update all users that match username

app.put("/all/:username/:newUsername", async (ctx) => {
  const { username, newUsername } = ctx.params;
  let doc = await db.update({username}, {$set: {username:newUsername}})
  return JSON.stringify(doc, null, 2)
})

app.start({ port: 3000 });

console.log("http://localhost:3000");