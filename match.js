
var symbols = ["Blue", "Green", "Purple", "Red", "Yellow"];
var board = [];
var rows = 9;
var columns = 9;
var score = 0;

var currTile;
var otherTile;

window.onload = function() {
    startGame();

    window.setInterval(function(){
        crushSymbol();
        slideSymbol();
        generateSymbol();
    }, 100);
}

function randomSymbols() {
    return symbols[Math.floor(Math.random() * symbols.length)]; //0 - 4.99
}

function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // <img id= "0-0" src="./images/Red.png">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomSymbols() + ".png";

            //Drag Functionality
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }

    console.log(board);
}

function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {

    if (currTile.src.includes("Blank") || otherTile.src.includes("Blank")) {
        return;
    }

    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c-1 && r == r2;
    let moveRight = c2 == c+1 && r == r2;

    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

        let validMove = checkValid();
        if (!validMove) {
            if (isAdjacent) {
                let currImg = currTile.src;
                let otherImg = otherTile.src;
                currTile.src = otherImg;
                otherTile.src = currImg;
            }
        }
    }
}

function crushSymbol() {
    crushFive();
    crushFour();
    crushThree();
    document.getElementById("score").innerText = score;
}

function crushThree() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let symbol1 = board[r][c];
            let symbol2 = board[r][c+1];
            let symbol3 = board[r][c+2];
            if (symbol1.src == symbol2.src && symbol2.src == symbol3.src && !symbol1.src.includes("Blank")) {
                symbol1.src = "./images/Blank.png";
                symbol2.src = "./images/Blank.png";
                symbol3.src = "./images/Blank.png";
                score += 30;
            }
        }
    }

    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let symbol1 = board[r][c];
            let symbol2 = board[r+1][c];
            let symbol3 = board[r+2][c];
            if (symbol1.src == symbol2.src && symbol2.src == symbol3.src && !symbol1.src.includes("Blank")) {
                symbol1.src = "./images/Blank.png";
                symbol2.src = "./images/Blank.png";
                symbol3.src = "./images/Blank.png";
                score += 30;
            }
        }
    }
}

function crushFour() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-3; c++) {
            let symbol1 = board[r][c];
            let symbol2 = board[r][c+1];
            let symbol3 = board[r][c+2];
            let symbol4 = board[r][c+3];
            if (symbol1.src == symbol2.src && symbol2.src == symbol3.src && symbol3.src == symbol4.src && !symbol1.src.includes("Blank")) {
                symbol1.src = "./images/Blank.png";
                symbol2.src = "./images/Blank.png";
                symbol3.src = "./images/Blank.png";
                symbol4.src = "./images/Blank.png";
                score += 40;
            }
        }
    }

    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-3; r++) {
            let symbol1 = board[r][c];
            let symbol2 = board[r+1][c];
            let symbol3 = board[r+2][c];
            let symbol4 = board[r+3][c];
            if (symbol1.src == symbol2.src && symbol2.src == symbol3.src && symbol3.src == symbol4.src && !symbol1.src.includes("Blank")) {
                symbol1.src = "./images/Blank.png";
                symbol2.src = "./images/Blank.png";
                symbol3.src = "./images/Blank.png";
                symbol4.src = "./images/Blank.png";
                score += 40;
            }
        }
    }
}

function crushFive() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-4; c++) {
            let symbol1 = board[r][c];
            let symbol2 = board[r][c+1];
            let symbol3 = board[r][c+2];
            let symbol4 = board[r][c+3];
            let symbol5 = board[r][c+4];
            if (symbol1.src == symbol2.src && symbol2.src == symbol3.src && symbol3.src == symbol4.src && symbol4.src == symbol5.src && !symbol1.src.includes("Blank")) {
                symbol1.src = "./images/Blank.png";
                symbol2.src = "./images/Blank.png";
                symbol3.src = "./images/Blank.png";
                symbol4.src = "./images/Blank.png";
                symbol5.src = "./images/Blank.png";
                score += 50;
            }
        }
    }

    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-4; r++) {
            let symbol1 = board[r][c];
            let symbol2 = board[r+1][c];
            let symbol3 = board[r+2][c];
            let symbol4 = board[r+3][c];
            let symbol5 = board[r+4][c];
            if (symbol1.src == symbol2.src && symbol2.src == symbol3.src && symbol3.src == symbol4.src && symbol4.src == symbol5.src && !symbol1.src.includes("Blank")) {
                symbol1.src = "./images/Blank.png";
                symbol2.src = "./images/Blank.png";
                symbol3.src = "./images/Blank.png";
                symbol4.src = "./images/Blank.png";
                symbol5.src = "./images/Blank.png";
                score += 50;
            }
        }
    }
}

function checkValid () {

    //check rows
    if (crushSymbol() = crushThree()) {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns-2; c++) {
                let symbol1 = board[r][c];
                let symbol2 = board[r][c+1];
                let symbol3 = board[r][c+2];
                if (symbol1.src == symbol2.src && symbol2.src == symbol3.src && !symbol1.src.includes("Blank")) {
                    symbol1.src = "./images/Blank.png";
                    symbol2.src = "./images/Blank.png";
                    symbol3.src = "./images/Blank.png";
                    score += 30;
                }
            }
        }

        for (let c = 0; c < columns; c++) {
            for (let r = 0; r < rows-2; r++) {
                let symbol1 = board[r][c];
                let symbol2 = board[r+1][c];
                let symbol3 = board[r+2][c];
                if (symbol1.src == symbol2.src && symbol2.src == symbol3.src && !symbol1.src.includes("Blank")) {
                    symbol1.src = "./images/Blank.png";
                    symbol2.src = "./images/Blank.png";
                    symbol3.src = "./images/Blank.png";
                    score += 30;
                }
            }
        }
    }

    else if (crushSymbol() = crushFour()) {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns-3; c++) {
                let symbol1 = board[r][c];
                let symbol2 = board[r][c+1];
                let symbol3 = board[r][c+2];
                let symbol4 = board[r][c+3];
                if (symbol1.src == symbol2.src && symbol2.src == symbol3.src && symbol3.src == symbol4.src && !symbol1.src.includes("Blank")) {
                    symbol1.src = "./images/Blank.png";
                    symbol2.src = "./images/Blank.png";
                    symbol3.src = "./images/Blank.png";
                    symbol4.src = "./images/Blank.png";
                    score += 40;
                }
            }
        }

        for (let c = 0; c < columns; c++) {
            for (let r = 0; r < rows-3; r++) {
                let symbol1 = board[r][c];
                let symbol2 = board[r+1][c];
                let symbol3 = board[r+2][c];
                let symbol4 = board[r+3][c];
                if (symbol1.src == symbol2.src && symbol2.src == symbol3.src && symbol3.src == symbol4.src && !symbol1.src.includes("Blank")) {
                    symbol1.src = "./images/Blank.png";
                    symbol2.src = "./images/Blank.png";
                    symbol3.src = "./images/Blank.png";
                    symbol4.src = "./images/Blank.png";
                    score += 40;
                }
            }
        }
    }

    else if (crushSymbol() = crushFive()) {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns-4; c++) {
                let symbol1 = board[r][c];
                let symbol2 = board[r][c+1];
                let symbol3 = board[r][c+2];
                let symbol4 = board[r][c+3];
                let symbol5 = board[r][c+4];
                if (symbol1.src == symbol2.src && symbol2.src == symbol3.src && symbol3.src == symbol4.src && symbol4.src == symbol5.src && !symbol1.src.includes("Blank")) {
                    symbol1.src = "./images/Blank.png";
                    symbol2.src = "./images/Blank.png";
                    symbol3.src = "./images/Blank.png";
                    symbol4.src = "./images/Blank.png";
                    symbol5.src = "./images/Blank.png";
                    score += 50;
                }
            }
        }

        for (let c = 0; c < columns; c++) {
            for (let r = 0; r < rows-4; r++) {
                let symbol1 = board[r][c];
                let symbol2 = board[r+1][c];
                let symbol3 = board[r+2][c];
                let symbol4 = board[r+3][c];
                let symbol5 = board[r+4][c];
                if (symbol1.src == symbol2.src && symbol2.src == symbol3.src && symbol3.src == symbol4.src && symbol4.src == symbol5.src && !symbol1.src.includes("Blank")) {
                    symbol1.src = "./images/Blank.png";
                    symbol2.src = "./images/Blank.png";
                    symbol3.src = "./images/Blank.png";
                    symbol4.src = "./images/Blank.png";
                    symbol5.src = "./images/Blank.png";
                    score += 50;
                }
            }
        }
    }

    else {
        return false;
    }
}

function slideSymbol() {
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for (let r = columns-1; r >= 0; r--) {
            if (!board[r][c].src.includes("Blank")) {
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        } 

        for (let r = ind; r>= 0; r--) {
            board[r][c].src = "./images/Blank.png";
        }
    }
}

function generateSymbol () {
    for (let c = 0; c < columns; c++) {
        if (board[0][c].src.includes("Blank")) {
            board[0][c].src = "./images/" + randomSymbols() + ".png"
        }
    }
}