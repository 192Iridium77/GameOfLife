/* RULES:
 *  1. Any live cell with fewer than two live neighbours dies,
 *    as if caused by underpopulation.
 *  2. Any live cell with two or three live neighbours lives
 *    on to the next generation.
 *  3. Any live cell with more than three live neighbours dies,
 *    as if by overpopulation.
 *  4. Any dead cell with exactly three live neighbours becomes a live cell,
 *    as if by reproduction.
 */


// set up matrix method so an m by n board can be initialized with constant a
Array.matrix = function(m,n,constant) {
  var a, i ,j, mat = [];
  for (i = 0; i < m; i++) {
    a = [];
    for (j=0; j<n; j++) {
      a[j] = constant;
    }
    mat[i] = a;
  }
  return mat;
};


// create game of life board
var dim = 5;
var board = Array.matrix(dim, dim, 0);

board[2][3] = 2;
board[2][2] = 4;
board[1][2] = 1;
console.table(board); // TODO problem: every iteration of the array is being printed as all zeros!?!?!

function process_board (board) {
  for (var t = 0; t < 4; t++) {
    // iterate board
    var board_copy = board;
    for (i = 0; i < board.length; i++) {
      for (j = 0; j < board[i].length; j++) {
        var n = count_neighbors(board_copy, i, j);
        //console.log(n);
        if (board_copy[i][j] == 1 && check_condition1(n)) {
          board[i][j] = 0;
        }
        if (board_copy[i][j] == 0 && check_condition2(n)) {
          board[i][j] = 1;
        }
      }
    }
    //console.table(board);
  }
}

// implement rule1, check given position against a copy of the board
function count_neighbors(board, x, y) {
  var neighbors = 0;
  // conditional logic
  try {
    if (board[x-1][y-1] == 1) {
      neighbors += 1
    }
  } catch (e) {}
  try {
    if (board[x][y-1] == 1) {
      neighbors += 1
    }
  } catch (e) {}
  try {
    if (board[x+1][y-1] == 1) {
      neighbors += 1
    }
  } catch (e) {}
  try {
    if (board[x-1][y] == 1) {
      neighbors += 1
    }
  } catch (e) {}
  try {
    if (board[x+1][y-1] == 1) {
      neighbors += 1
    }
  } catch (e) {}
  try {
    if (board[x][y+1] == 1) {
      neighbors += 1
    }
  } catch (e) {}
  try {
    if (board[x+1][y+1] == 1) {
      neighbors += 1
    }
  } catch (e) {}
  return neighbors;
};

function check_condition1(neighbors) {
  if (neighbors < 2) {
    return true;
  }
  else if (neighbors > 3) {
    return true;
  }
  else {
    return false;
  }
};

function check_condition2(neighbors) {
  if (neighbors == 3) {
    return true;
  }
  else {
    return false;
  }
};

function display_board(board, dim) {
  document.getElementById("array").innerHTML = "-".repeat(2*dim + 1) + "<br>";
  for (i = 0; i < board.length; i++) {
    for (j = 0; j < board[i].length; j++) {
      document.getElementById("array2").innerHTML = "|" + board[i][j];
    }
    document.getElementById("array3").innerHTML = "|<br>";
  }
  document.getElementById("array4").innerHTML = "-".repeat(2*dim + 1) + "<br>";
};

process_board(board);

