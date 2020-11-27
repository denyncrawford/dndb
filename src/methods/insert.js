import { writeFile } from '../storage.ts';
import { v1 } from "https://deno.land/std/uuid/mod.ts";

export default async (filename ,data) => {
    if(Array.isArray(data)) {
        data.forEach(async o => {
            o._id = o._id || v1.generate();
            await writeFile(filename, o);
        });
    } else {
        data._id = data._id || v1.generate();
        await writeFile(filename, data)
    }
    return data;
}