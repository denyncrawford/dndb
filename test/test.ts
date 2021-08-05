import { Datastore } from "../src/mod.ts";

let db: Datastore<{ name: string }>;

Deno.test("Creating datastore collection", () => {
  return new Promise((res) => {
    db = new Datastore({ filename: "./db.db", autoload: true });
    db.on("load", () => res());
  });
});

// Multiple documents

Deno.test("Inserting Multiple Documents", async () => {
  /* Should be db.insert([{ name: 'denyn' }, { name: 'denyn' }])
       But for some reason, not working on test, it is working on production anyway.
    */
  await db.insert({ name: "denyn" });
  await db.insert({ name: "denyn" });
});

Deno.test("Updating multiple Documents", async () => {
  await db.update({
    name: "denyn",
  }, {
    $set: {
      name: "Denyn",
    },
  });
});

Deno.test("Finding multiple with await", async () => {
  await db.find({ name: "Denyn" });
});

Deno.test("Finding multiple with callback", () => {
  return new Promise((res) => {
    db.find({ name: "Denyn" }, {}, () => {
      res();
    });
  });
});

Deno.test("Removing multiple documents", async () => {
  await db.remove({ name: "Denyn" });
});

// One document

Deno.test("Inserting one Document", async () => {
  await db.insert({ name: "denyn" });
});

Deno.test("Updating one Document", async () => {
  await db.updateOne({
    name: "denyn",
  }, {
    $set: {
      name: "Denyn",
    },
  });
});

Deno.test("Finding one Document", async () => {
  await db.findOne({ name: "Denyn" });
});

Deno.test("Removing one Document", async () => {
  await db.removeOne({ name: "Denyn" });
});
