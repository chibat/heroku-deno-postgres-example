#!/usr/bin/env -S deno run --allow-net --allow-env=DATABASE_URL,PORT --unstable --unsafely-ignore-certificate-errors

import { Pool } from "https://deno.land/x/postgres@v0.11.3/mod.ts";

const DEFAULT_PORT = 8080;
const envPort = Deno.env.get("PORT");
const port = envPort ? Number(envPort) : DEFAULT_PORT;

if (isNaN(port)) {
  console.error("Port is not a number.");
  Deno.exit(1);
}

const listener = Deno.listen({ port });
console.log("http://localhost:" + port);

const POOL_CONNECTIONS = 2;
const dbUrl = Deno.env.get("DATABASE_URL");
const dbPool = new Pool(dbUrl, POOL_CONNECTIONS);

for await (const conn of listener) {
  (async () => {
    const requests = Deno.serveHttp(conn);
    for await (const { respondWith } of requests) {
      const client = await dbPool.connect();
      const result = await client.queryArray("SELECT table_name FROM information_schema.tables limit 1");
      await client.release();
      respondWith(new Response(JSON.stringify(result.rows), {headers: {"content-type": "application/json"}}));
    }
  })();
}

