import { timed } from "https://cdn.skypack.dev/@thi.ng/bench";
import { Datastore } from "../../src/mod.ts";

const db = new Datastore({ filename: "./db.db", autoload: true });

timed(async () => {
  await db.insert({ name: "Denyn" });
}, "Insert");

timed(async () => {
  let docs = await db.find({ name: "Denyn" });
}, "Find");

timed(async () => {
  let docs = await db.findOne({ name: "Denyn" });
}, "Find One");

timed(async () => {
  await db.update({ name: "Denyn" }, { $set: { name: "Juan" } });
}, "Update");

timed(async () => {
  await db.updateOne({ name: "Denyn" }, { $set: { name: "Juan" } });
}, "Update One");

timed(async () => {
  await db.removeOne({ name: "Juan" });
}, "Delete One");

timed(async () => {
  await db.remove({ name: "Juan" });
}, "Delete");
