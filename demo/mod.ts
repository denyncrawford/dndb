/*jshint esversion: 8 */

import { Datastore } from "dndb/mod.ts";
import { opine, serveStatic } from "https://deno.land/x/opine@1.0.0/mod.ts";
import { dirname, join } from "std/path/mod.ts";
const __dirname = dirname(import.meta.url);
const app = opine();
const db = new Datastore({ filename: "./database.db", autoload: true });

app.use(serveStatic(join(__dirname, "public")));

app.get("/", async (_req, res) => {
  await res.sendFile(join(__dirname, "./public/index.html"));
});

// Get all the users from the collection

app.get("/all", async (_req, res) => {
  const doc = await db.find({});
  res.send(JSON.stringify(doc, null, 2));
});

// Get all users that match in username

app.get("/all/:match", async (req, res) => {
  const { match } = req.params;
  const doc = await db.find({ username: match });
  res.send(JSON.stringify(doc, null, 2));
});

// Get exact first match user

app.get("/:username", async (req, res) => {
  const { username } = req.params;
  const doc = await db.findOne({ username }, { username: 0 });
  res.send(JSON.stringify(doc, null, 2));
});

// Post a new user

app.post("/:username", async (req, res) => {
  const { username } = req.params;
  const doc = await db.insert({ username, name: username });
  res.send(JSON.stringify(doc, null, 2));
});

// Delete one user

app.delete("/:username", async (req, res) => {
  const { username } = req.params;
  const doc = await db.removeOne({ username });
  res.send(JSON.stringify(doc, null, 2));
});

// Delete all users that matches

app.delete("/all/:username", async (req, res) => {
  const { username } = req.params;
  const doc = await db.remove({ username });
  res.send(JSON.stringify(doc, null, 2));
});

// Delete all users

app.delete("/all", async (_req, res) => {
  const doc = await db.remove({});
  res.send(JSON.stringify(doc, null, 2));
});

// Update first user that match username

app.put("/:username/:newUsername", async (req, res) => {
  const { username, newUsername } = req.params;
  const doc = await db.updateOne(
    { username },
    { $set: { username: newUsername } },
  );
  res.send(JSON.stringify(doc, null, 2));
});

// Update all users that match username

app.put("/all/:username/:newUsername", async (req, res) => {
  const { username, newUsername } = req.params;
  const doc = await db.update({ username }, {
    $set: { username: newUsername },
  });
  res.send(JSON.stringify(doc, null, 2));
});

app.listen(3000);

console.log("http://localhost:3000");
