const fs = require("fs");
const readline = require("readline");

const loadInput = async (isTest = false) => {
  const fileStream = fs.createReadStream(
    isTest ? "test_input.txt" : "input.txt"
  );

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const lines = [];
  for await (const line of rl) {
    const [start, finish] = line.split(" -> ");
    const [x1, y1] = start.split(",");
    const [x2, y2] = finish.split(",");
    lines.push({
      x1: Number(x1),
      y1: Number(y1),
      x2: Number(x2),
      y2: Number(y2),
    });
  }
  return lines;
};

const exercise1 = (lines) => {
  const dangerPoints = {};
  lines.forEach(({ x1, x2, y1, y2 }) => {
    const x = Math.min(x1, x2);
    const y = Math.min(y1, y2);
    if (x1 === x2) {
      for (let i = y; i <= Math.max(y1, y2); i++) {
        if (dangerPoints[`${x},${i}`]) {
          dangerPoints[`${x},${i}`]++;
        } else {
          dangerPoints[`${x},${i}`] = 1;
        }
      }
    } else if (y1 === y2) {
      for (let i = x; i <= Math.max(x1, x2); i++) {
        if (dangerPoints[`${i},${y}`]) {
          dangerPoints[`${i},${y}`]++;
        } else {
          dangerPoints[`${i},${y}`] = 1;
        }
      }
    }
  });
  return Object.keys(dangerPoints).filter((key) => dangerPoints[key] > 1)
    .length;
};

const exercise2 = (lines) => {
  const dangerPoints = {};
  lines.forEach(({ x1, x2, y1, y2 }) => {
    const stepX = (x2 - x1) / (Math.abs(x2 - x1) || 1);
    const stepY = (y2 - y1) / (Math.abs(y2 - y1) || 1);
    for (
      let i = 0, j = 0;
      Math.abs(i) <= Math.abs(x2 - x1) && Math.abs(j) <= Math.abs(y2 - y1);
      i += stepX, j += stepY
    ) {
      const x = x1 + i;
      const y = y1 + j;
      if (dangerPoints[`${x},${y}`]) {
        dangerPoints[`${x},${y}`]++;
      } else {
        dangerPoints[`${x},${y}`] = 1;
      }
    }
  });
  return Object.keys(dangerPoints).filter((key) => dangerPoints[key] > 1)
    .length;
};

loadInput(false).then((lines) => {
  console.log(exercise1(lines));
  console.log(exercise2(lines));
});
