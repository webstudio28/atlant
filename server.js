const { parse } = require("url");
const next = require("next");

const app = next({ dev: false });
const handle = app.getRequestHandler();

const prepared = app.prepare();

prepared.catch((err) => {
  console.error("Failed to prepare Next.js app:", err);
  process.exit(1);
});

// cPanel / Phusion Passenger loads this file and calls the exported handler.
// Do not call .listen() here — Passenger owns the HTTP server.
module.exports = prepared.then(
  () => (req, res) =>
    handle(req, res, parse(req.url, true)).catch((err) => {
      console.error("Request error:", req.url, err);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
    })
);
