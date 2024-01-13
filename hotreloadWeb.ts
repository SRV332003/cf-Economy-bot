import { Elysia } from "elysia";
import { type ElysiaWS } from "elysia/ws";

let wsConnections = new Set<ElysiaWS<any, any>>();

function dispatch() {
  wsConnections.forEach(ws => {
    ws.send("hellow world")
  })
}

const port = process.argv[2] || 3001;

const app = new Elysia()
  .ws("/ws", {
    open(ws) {
      wsConnections.add(ws);
    },
    close(ws) {
      wsConnections.delete(ws);
    },
  })
  .get("/restart", () => {
    dispatch();
  })
  .listen(port);

console.log(
  `🦊 Livereload running ${app.server?.hostname}:${app.server?.port}`,
);
