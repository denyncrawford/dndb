# Demo

This demo shows you how to use DnDB in a backend environment.

## Steps

- Download this folder
- Run the demo with the permission flags.

```bash
deno run -A --unstable https://deno.land/x/dndb@0.3.1/demo/mod.js
```

You can start playing with the new demo UI. Fist try to insert a document typing
an username and clicking 'Make Query'.

It is also a REST API, so you can:

- Make a POST request at /:your_username to add a username in your database.
- Make a GET request at /all to get all the users collection.
- Make a GET request at /all/:your_username to get the matching users
  collection.
- Make a GET request at /:your_username to get the matching user document.
- Make a PUT request at /all/:your_username/:new_username to update all the
  matching users.
- Make a PUT request at /:your_username/:new_username to update the mathcing
  user document.
- Make a DELETE request at /all to remove all the users collection.
- Make a DELETE request at /all/:your_username to remove all the matching user
  documents.
- Make a DELETE request at /:your_username to remove the matching user document.
