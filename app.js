document.addEventListener('DOMContentLoaded', () => {  //after html is loaded,then js works

    const grid = document.querySelector('.grid');
    let width = 10;
    let bombAmt = 20;
    let squares = [];
    let isGameOver = false;
    let flags = 0;

    //create board
    function createBoard() {

        const bombArray = Array(bombAmt).fill('bomb');
        const emptyArray = Array(width * width - bombAmt).fill('valid');  //fills all the indexes with a particular value

        const gameArray = emptyArray.concat(bombArray)  //joins 2 arrays

        const shuffledArray = gameArray.sort(   //sorts randomly (shuffles randomly)
            () => Math.random() - 0.5  //-0.5 randomly rearranges the array , range of 0-1 chnages to -0.5 to 0.499
        )

        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            square.setAttribute('id', i);  //unique id o number i
            square.classList.add(shuffledArray[i]);   //class= valid or bomb
            grid.appendChild(square);
            squares.push(square);

            //normal click
            square.addEventListener('click', function (e) {
                click(square);
            })

            //control and left click
            square.oncontextmenu= function(e){
                e.preventDefault();
                addFlag(square); 
            }
        }

        //add numbers
        for (let i = 0; i < squares.length; i++) {

            //squares.length=100
            let total = 0;
            const isLeftEdge = (i % width === 0)
            const isRightEdge = (i % width === width - 1)

            if (squares[i].classList.contains('valid')) {

                if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) total++;
                if (i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) total++;
                if (i > 10 && squares[i - width].classList.contains('bomb')) total++;
                if (i > 11 && !isLeftEdge && squares[i - 1 - width].classList.contains('bomb')) total++;
                if (i < 98 && !isRightEdge && squares[i + 1].classList.contains('bomb')) total++;
                if (i < 90 && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb')) total++;
                if (i < 88 && !isRightEdge && squares[i + width + 1].classList.contains('bomb')) total++;
                if (i < 89 && squares[i + width].classList.contains('bomb')) total++;

                squares[i].setAttribute('data', total);
                console.log(squares[i])
            }

        }






    }

    createBoard();

    ///flag function

    function addFlag(square) {
        if (isGameOver) return
        if (!square.classList.contains('checked') && (flags < bombAmt)) {
          if (!square.classList.contains('flag')) {
            square.classList.add('flag')
            square.innerHTML = ' 🚩'
            flags ++
         
            checkForWin()
          } else {
            square.classList.remove('flag')
            square.innerHTML = ''
            flags --;
          }
        }
      }

    ///click function

    function click(square) {

        let currentID = square.id;
        if (isGameOver) return;
        if (square.classList.contains('checked') || square.classList.contains('flag')) return;
        if (square.classList.contains('bomb')) {
            gameOver(square);
        }
        else {

            let total = square.getAttribute('data');
            if (total != 0) {
                square.classList.add('checked');
                square.innerHTML = total;
                return;
            }
            checkSquare(square, currentID);

        }
        square.classList.add('checked');
    }

    //check square

    function checkSquare(square, currentID) {

        const isLeftEdge = currentID % width === 0;
        const isRightEdge = currentID % width === 9;

        setTimeout(() => {

            if (currentID > 0 && !isLeftEdge) {
                const newID = squares[parseInt(currentID) - 1].id;
                const newSquare = document.getElementById(newID);
                click(newSquare);
            }

            if (currentID > 9 && !isRightEdge) {
                const newID = squares[parseInt(currentID) + 1 - width].id;
                const newSquare = document.getElementById(newID);
                click(newSquare);
            }

            if (currentID > 10) {
                const newID = squares[parseInt(currentID) - width].id;
                const newSquare = document.getElementById(newID);
                click(newSquare);
            }

            if (currentID > 11 && !isLeftEdge) {
                const newID = squares[parseInt(currentID) - 1 - width].id;
                const newSquare = document.getElementById(newID);
                click(newSquare);
            }

            if (currentID < 98 && !isRightEdge) {
                const newID = squares[parseInt(currentID) + 1].id;
                const newSquare = document.getElementById(newID);
                click(newSquare);
            }

            if (currentID < 90 && !isLeftEdge) {
                const newID = squares[parseInt(currentID) - 1 + width].id;
                const newSquare = document.getElementById(newID);
                click(newSquare);
            }


            if (currentID < 88 && !isRightEdge) {
                const newID = squares[parseInt(currentID) + 1 + width].id;
                const newSquare = document.getElementById(newID);
                click(newSquare);
            }
            if (currentID < 89) {
                const newID = squares[parseInt(currentID) + width].id;
                const newSquare = document.getElementById(newID);
                click(newSquare);
            }

        }, 10);
    }

    function gameOver(square) {
        isGameOver = true;
        console.log("Game Over");

        //display all the bombs
        squares.forEach(square => {
            if (square.classList.contains('bomb')) {
                square.innerHTML = '💣'
            }
        }
        )
    }

    function win(){
        let matches=0;

        for(let i=0;i<squares.length;i++){
            if (squares[i].classList.contains("flag") && squares[i].classList.contains("bomb") ){
                matches++;
            }
            if(matches==bombAmt){
                console.log("You Won")
                isGameOver=true;
            }
        }
    }
})