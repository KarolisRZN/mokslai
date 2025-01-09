require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const os = require("os");

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// keys
app.put("/alpha", (req, res) => {
  const sortedKeys = Object.keys(req.body).sort();
  const sortedJson = {};
  sortedKeys.forEach((key) => {
    sortedJson[key] = req.body[key];
  });
  res.json(sortedJson);
});

// Flatten JSON
app.put("/flatten", (req, res) => {
  const flattenedJson = {};
  for (const key in req.body) {
    if (Array.isArray(req.body[key])) {
      flattenedJson[key] = req.body[key].join(",");
    } else {
      flattenedJson[key] = req.body[key];
    }
  }
  res.json(flattenedJson);
});

// health status system
app.get("/status", (req, res) => {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMemPct = (((totalMem - freeMem) / totalMem) * 100).toFixed(1);

  const cpus = os.cpus();
  const cpuLoad =
    (cpus.reduce((acc, cpu) => {
      const total = Object.values(cpu.times).reduce(
        (acc, time) => acc + time,
        0
      );
      return acc + (1 - cpu.times.idle / total);
    }, 0) /
      cpus.length) *
    100;

  const status = {
    "mem-used-pct": usedMemPct,
    "cpu-used-pct": cpuLoad.toFixed(1),
  };
  res.json(status);
});

app.listen(port, () => {
  console.log(`JSON transformer service running on port ${port}`);
});
