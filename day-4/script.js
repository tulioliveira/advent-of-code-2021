const fs = require("fs");
const readline = require("readline");

let calls;

const loadInput = async (isTest = false) => {
  calls = isTest
    ? [
        "7",
        "4",
        "9",
        "5",
        "11",
        "17",
        "23",
        "2",
        "0",
        "14",
        "21",
        "24",
        "10",
        "16",
        "13",
        "6",
        "15",
        "25",
        "12",
        "22",
        "18",
        "20",
        "8",
        "19",
        "3",
        "26",
        "1",
      ]
    : [
        "17",
        "2",
        "33",
        "86",
        "38",
        "41",
        "4",
        "34",
        "91",
        "61",
        "11",
        "81",
        "3",
        "59",
        "29",
        "71",
        "26",
        "44",
        "54",
        "89",
        "46",
        "9",
        "85",
        "62",
        "23",
        "76",
        "45",
        "24",
        "78",
        "14",
        "58",
        "48",
        "57",
        "40",
        "21",
        "49",
        "7",
        "99",
        "8",
        "56",
        "50",
        "19",
        "53",
        "55",
        "10",
        "94",
        "75",
        "68",
        "6",
        "83",
        "84",
        "88",
        "52",
        "80",
        "73",
        "74",
        "79",
        "36",
        "70",
        "28",
        "37",
        "0",
        "42",
        "98",
        "96",
        "92",
        "27",
        "90",
        "47",
        "20",
        "5",
        "77",
        "69",
        "93",
        "31",
        "30",
        "95",
        "25",
        "63",
        "65",
        "51",
        "72",
        "60",
        "16",
        "12",
        "64",
        "18",
        "13",
        "1",
        "35",
        "15",
        "66",
        "67",
        "43",
        "22",
        "87",
        "97",
        "32",
        "39",
        "82",
      ];
  const fileStream = fs.createReadStream(
    isTest ? "test_input.txt" : "input.txt"
  );

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const defaultScore = {};
  for (let i = 0; i < 5; i++) {
    defaultScore[`x${i}`] = 0;
    defaultScore[`y${i}`] = 0;
  }

  let i = 0;
  let boards = [];
  let board = {
    score: { ...defaultScore },
  };
  for await (const line of rl) {
    if (i <= 4) {
      line
        .split(" ")
        .filter((value) => value.length)
        .forEach((value, j) => {
          board[value] = {
            x: i,
            y: j,
            called: false,
          };
        });
      i++;
    } else {
      i = 0;
      boards.push(board);
      board = {
        score: { ...defaultScore },
      };
    }
  }
  boards.push(board);
  return boards;
};

const checkWinner = (boards) =>
  boards.find(
    (board) =>
      Object.keys(board.score).filter((key) => board.score[key] === 5).length >
      0
  );

const checkWinnerIndex = (boards, winners) =>
  boards.findIndex(
    (board, index) =>
      winners.indexOf(index) === -1 &&
      Object.keys(board.score).filter((key) => board.score[key] === 5).length >
        0
  );

const calculateScore = (board, lastCalled) => {
  let uncalled = 0;
  Object.keys(board)
    .filter((key) => key !== "score")
    .forEach((key) => {
      const item = board[key];
      uncalled += item.called ? 0 : parseInt(key);
    });
  return uncalled * parseInt(lastCalled);
};

const firstWinner = () => {
  loadInput(false).then((boards) => {
    let winner = undefined;
    let lastCalled;
    for (let count = 0; count < calls.length && winner === undefined; count++) {
      boards.forEach((board) => {
        if (board[calls[count]]) {
          board[calls[count]].called = true;
          board.score[`x${board[calls[count]].x}`]++;
          board.score[`y${board[calls[count]].y}`]++;
        }
      });
      lastCalled = calls[count];
      winner = checkWinner(boards);
    }
    console.log(winner, lastCalled);
    console.log(calculateScore(winner, lastCalled));
  });
};

const lastWinner = () => {
  loadInput().then((boards) => {
    let winners = [];
    let lastCalled;
    for (
      let count = 0;
      count < calls.length && winners.length < boards.length;
      count++
    ) {
      boards.forEach((board) => {
        if (board[calls[count]]) {
          board[calls[count]].called = true;
          board.score[`x${board[calls[count]].x}`]++;
          board.score[`y${board[calls[count]].y}`]++;
        }
      });
      lastCalled = calls[count];
      let winnerIndex;
      do {
        winnerIndex = checkWinnerIndex(boards, winners);
        if (winnerIndex > -1) {
          winners.push(winnerIndex);
        }
      } while (winnerIndex > -1);

      console.log(winners.length, boards.length);
    }
    console.log(boards[winners.at(-1)]);
    console.log(lastCalled);
    console.log(calculateScore(boards[winners.at(-1)], lastCalled));
  });
};

lastWinner();
// firstWinner();
