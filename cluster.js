const cluster = require("cluster");
const os = require("os");
const express = require("express");

let app = express();

let cpus = os.cpus().length;

console.log(cpus);

if (cluster.isPrimary) {
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
} else {
  app.get("/", (req, res) => {
    return res.json({ msg: `process id is ${process.pid}` });
  });
  app.listen(3000, () => {
    console.log("Server is running on this port 3000");
  });
}
