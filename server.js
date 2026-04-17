const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const mime = {'.html':'text/html;charset=utf-8','.css':'text/css','.js':'application/javascript','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.pdf':'application/pdf','.svg':'image/svg+xml'};
http.createServer((req, res) => {
  const url = decodeURIComponent(req.url);
  const fp = path.join(root, url);
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found: ' + url); return; }
    const ext = path.extname(fp).toLowerCase();
    res.writeHead(200, {'Content-Type': mime[ext]||'application/octet-stream'});
    res.end(data);
  });
}).listen(8080, () => console.log('Server running on http://localhost:8080'));
