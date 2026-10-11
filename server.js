// Passenger-compatible startup file for cPanel "Setup Node.js App".
// Phusion Passenger needs a literal .js file it can require() — it cannot
// run the `next start` CLI directly. This thin wrapper boots the production
// Next.js server and listens on the PORT assigned by the panel.
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Request handler error:', err);
      res.statusCode = 500;
      res.end('Internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`MedFlow System ready on port ${port}`);
  });
});
