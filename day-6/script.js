const loadInput = async (isTest = false) => {
  const testInput = [3, 4, 3, 1, 2];
  const input = [
    4, 3, 3, 5, 4, 1, 2, 1, 3, 1, 1, 1, 1, 1, 2, 4, 1, 3, 3, 1, 1, 1, 1, 2, 3,
    1, 1, 1, 4, 1, 1, 2, 1, 2, 2, 1, 1, 1, 1, 1, 5, 1, 1, 2, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 4, 2, 1, 1, 2, 1, 3, 1, 1, 2, 2,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 3, 2, 2, 3, 1, 1, 1, 4, 1, 1, 1, 1, 5,
    1, 1, 1, 5, 1, 1, 3, 1, 1, 2, 4, 1, 1, 3, 2, 4, 1, 1, 1, 1, 1, 5, 5, 1, 1,
    1, 1, 1, 1, 4, 1, 1, 1, 3, 2, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 5, 4, 1, 5, 1,
    3, 4, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 2, 1, 2, 3, 5, 1, 1, 1, 1, 3, 5, 1,
    1, 1, 2, 1, 1, 4, 1, 1, 5, 1, 4, 1, 2, 1, 3, 1, 5, 1, 4, 3, 1, 3, 2, 1, 1,
    1, 2, 2, 1, 1, 1, 1, 4, 5, 1, 1, 1, 1, 1, 3, 1, 3, 4, 1, 1, 4, 1, 1, 3, 1,
    3, 1, 1, 4, 5, 4, 3, 2, 5, 1, 1, 1, 1, 1, 1, 2, 1, 5, 2, 5, 3, 1, 1, 1, 1,
    1, 3, 1, 1, 1, 1, 5, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 3, 3,
    1, 1, 5, 1, 3, 5, 5, 1, 1, 1, 2, 1, 2, 1, 5, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1,
  ];
  return isTest ? testInput : input;
};

const populate = (input, days) => {
  const map = {};
  input.forEach((fish) => {
    if (map[fish] === undefined) {
      map[fish] = 0;
    }
    map[fish] += 1;
  });
  let y = map;
  for (let i = 0; i < days; i++) {
    console.log(i);
    let x = {};
    Object.keys(y).forEach((fish) => {
      const count = y[fish];
      if (Number(fish) === 0) {
        x[6] = (x[6] || 0) + count;
        x[8] = (x[8] || 0) + count;
      } else {
        x[fish - 1] = (x[fish - 1] || 0) + count;
      }
    });
    y = x;
  }
  return y;
};

const calculatePopulation = (population) =>
  Object.keys(population).reduce((acc, x) => acc + population[x], 0);

loadInput(false).then((input) => {
  console.log(calculatePopulation(populate(input, 256)));
});
