import * as express from 'express';
import * as http from 'http';
const svg2img = require('svg2img');
const app = express();

var svgString = [
  '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="236" height="120" ',
  'viewBox="0 0 236 120">',
  '<rect x="14" y="23" width="200" height="50" fill="#55FF55" stroke="black" stroke-width="1" />',
  '</svg>'
].join('');

app.get('/svg', ((req, res) => {
  res.send(svgString)
}))

app.get('/png', ((req, res) => {
  svg2img(svgString, { format: 'png', 'quality':75} as any, function(error, buffer) {
    res.send(buffer);
  });}))

//initialize a simple http server
const server = http.createServer(app);

const port = process.env.PORT || 8999;
server.listen(port, () => {
  console.log(`Server started`);
  console.log(JSON.stringify(server.address()));
});
