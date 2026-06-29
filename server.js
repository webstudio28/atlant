const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const app = next({ dev: false });
const handle = app.getRequestHandler();
const port = Number(process.env.PORT) || 3000;

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res, parse(req.url, true)).catch((err) => {
      console.error("Request error:", req.url, err);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
    });
  }).listen(port, () => {
    console.log(`Next.js server listening on port ${port}`);
  });
}).catch((err) => {
  console.error("Failed to prepare Next.js app:", err);
  process.exit(1);
});
