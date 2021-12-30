//create Gameboard object (module)
const Gameboard = (() => {
    let board = new Array(9).fill(null);

    return {board};
})();


//create Players ojbect (factory)
const Players = (sign) => {
    const name = "Player " + sign;

    return {sign, name};
}

//create GameFlow object
const gameFlow = (() => {
    const playerX = Players("X");
    const playerO = Players("O");
    let currentPlayer = playerX;
    let gameOver = false;
    let tie = false;
    let display = document.querySelector(".display");

    const squares = document.querySelectorAll('.square');

    const winningSquares = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    //fill square with X or O
    const fillSquare = (square) => {
        if (!gameOver) {
            square.innerText = currentPlayer.sign;
            let squareIndex = square.getAttribute('data-cell');
            Gameboard.board[squareIndex] = currentPlayer.sign;
            checkWinner();
            changePlayer(currentPlayer);
            changeDisplay();
        }
    };

    //applies fillSquare to all squares
    const clickSquares = () => {
        squares.forEach((square) => {
            square.addEventListener('click', () => {fillSquare(square)}, {once: true});
        });
    };
    clickSquares();

    //create function to change players
    const changePlayer = (player) => {
        return currentPlayer = player.sign == "X" ? playerO : playerX;
    };

    // changes text display
    const changeDisplay = () => {
        if (tie) {
            display.innerText = "It's a tie!";
        }

        else if (gameOver) {
            changePlayer(currentPlayer);
            display.innerText = `${currentPlayer.name} wins!`;
        }

        else {
            display.innerText = `${currentPlayer.name}'s turn`;
        }
    }

    //check for winner
    const checkWinner = () => {
        for (let condition of winningSquares) {
            if (condition.every(function(index) {return Gameboard.board[index] == playerO.sign}) || 
            condition.every(function(index) {return Gameboard.board[index] == playerX.sign})) {
                    gameOver = true;
                };
        };

        //checks for tie
        for (let i = 0; i < 9; i++) {
            if (Gameboard.board[i] === null) {
                break;
            };

            if (i == 8) {
                tie = true;
                gameOver = true;
            };
        };

        if (gameOver) {
            squares.forEach((square) => {
                square.removeEventListener('click', () => {fillSquare(square)});
            });
        };
    };

    const resetBtn = document.querySelector('.reset');
    resetBtn.addEventListener('click', () => {
        currentPlayer = playerX;
        gameOver = false;
        tie = false;
        Gameboard.board = new Array(9).fill(null);
        squares.forEach((square) => {
            square.innerText = '';
        });
        changeDisplay();
        clickSquares();
    });

})();