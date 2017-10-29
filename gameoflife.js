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
}
// TODO figure out how to work this into the app object

var app = {
  //dim: 5,
  //board : Array.matrix(this.dim, this.dim, 0),
  board : [[0,0,0,0,0],
          [0,0,1,0,0],
          [0,1,0,1,0],
          [0,0,1,0,0],
          [0,0,0,0,0]],

  process_board : function (board) {
    for (let t = 0; t < 6; t++) {
      // iterate board
      let board_copy = this.board;
      for (i = 0; i < this.board.length; i++) {
        for (j = 0; j < this.board[i].length; j++) {
          let n = this.count_neighbors(board_copy, i, j);
          console.log(i,j,n);
          // TODO broken by the time it gets to the third iteration
          if (board_copy[i][j] === 1 && this.check_condition1(n)) {
            board[i][j] = 0;
          }
          if (board_copy[i][j] === 0 && this.check_condition2(n)) {
            board[i][j] = 1;
          }
        }
      }
      console.log("interation number: " + (t + 1));
      console.table(board);
    }
  },

  // implement rule1, check given position against a copy of the board
  count_neighbors: function (board, x, y) {
    let neighbors = 0;
    let l = board.length - 1;
    // TODO make this less complex
    if (!(x === 0 || y === 0)) {
      if (board[x-1][y-1] === 1) {
        console.log("top left worked");
        neighbors += 1
      }
    }
    if (y !== 0) {
      if (board[x][y-1] === 1) {
        neighbors += 1
      }
    }
    if (!(x === l || y === 0)) {
      if (board[x+1][y-1] === 1) {
        neighbors += 1
      }
    }
    if (x !== 0) {
      if (board[x-1][y] === 1) {
        neighbors += 1
      }
    }
    if (!(x === l || y === 0)) {
      if (board[x+1][y-1] === 1) {
        neighbors += 1
      }
    }
    if (y !== l) {
      if (board[x][y+1] === 1) {
        neighbors += 1
      }
    }
    if (!(x === l || y === l)) {
      if (board[x+1][y+1] === 1) {
        neighbors += 1
      }
    }
    return neighbors;
  },

  check_condition1 : function (neighbors) {
    if (neighbors < 2) {
      return true;
    }
    else if (neighbors > 3) {
      return true;
    }
    else {
      return false;
    }
  },

  check_condition2 : function (neighbors) {
    if (neighbors === 3) {
      return true;
    }
    else {
      return false;
    }
  },

  display_board : function (board, dim) {
    document.getElementById("array").innerHTML = "-".repeat(2*dim + 1) + "<br>";
    for (i = 0; i < board.length; i++) {
      for (j = 0; j < board[i].length; j++) {
        document.getElementById("array2").innerHTML = "|" + board[i][j];
      }
      document.getElementById("array3").innerHTML = "|<br>";
    }
    document.getElementById("array4").innerHTML = "-".repeat(2*dim + 1) + "<br>";
  }
  
}


// create game of life board
console.log("initial board state: ")
console.table(app.board);
console.log("running game...")
app.process_board(app.board);
