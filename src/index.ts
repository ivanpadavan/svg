import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import { Chart } from './echarts-ssr';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/chart.png', ((req, res) => {
  const width = +(req.query.width ?? 800);
  const height = +(req.query.height ?? 600);
  const backgroundColor = ('#' + req.query.bgColor ?? 'white').toString();

  console.log(backgroundColor);

  const chart = new Chart(width, height)
  const buffer = chart.renderToBufferSync({
    backgroundColor,
    xAxis: {
      data: ['shirt', 'cardign', 'chiffon shirt', 'pants', 'heels', 'socks']
    },
    yAxis: {},
    series: [
      {
        name: 'Sales',
        type: 'line',
        smooth: true,
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  });
  res.type('png');
  res.send(buffer);
}));

//initialize a simple http server
const server = http.createServer(app);

const port = process.env.PORT || 8999;
server.listen(port, () => {
  console.log(`Server started`);
  console.log(JSON.stringify(server.address()));
});
