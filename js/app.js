"use strict"

window.onload = function(e) {
    // Globals
    let gameWrapper =  document.querySelector('#game-wrapper');
    let gameCanvas = document.querySelector('#game');
    let gameSpeed = 200; 
    let snake;

    let scoreSpan = document.querySelector('#game-info .score');
    let score = 0;

    let matrix = new Matrix(gameCanvas, 20);

    let retryButton = Helpers.createButton('Retry', 'retry');
    let newGameButton = Helpers.createButton('New game', 'newGame');
    let continueButton = Helpers.createButton('Continue', 'continue');

    //Listeners
    retryButton.addEventListener('click', createGame);
    newGameButton.addEventListener('click', createGame);
    continueButton.addEventListener('click', gameContinue);

    matrix.create();

    //Screens
    let gameOverScreen = new Screen(gameWrapper, 'Game Over', retryButton); 
    let mainScreen = new Screen(gameWrapper, 'Snake', newGameButton);   
    let pauseScreen = new Screen(gameWrapper, 'Pause', continueButton);   
    mainScreen.show();  

    // Swipe controls
    var swiper = new Swipe(document.querySelector('body'));
        swiper.onLeft(() => snake.setDirection('left'));
        swiper.onRight(() => snake.setDirection('right'));
        swiper.onUp(() => snake.setDirection('up'));
        swiper.onDown(() => snake.setDirection('down'));
        swiper.run();
    
    // Keyboard controls
    document.addEventListener('keydown', function(e) {
        let direction;
        switch(e.key) {
            case 'ArrowRight':
                direction = 'right';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'Escape':
                if(pauseScreen.isShowed) {
                    gameContinue();
                } else {
                    gamePause();
                }
                break;
        }
        snake.setDirection(direction);
    });

    //Game timer
    let timer;

    function gameContinue() {
        pauseScreen.hide();
        timer = setInterval(checkGame, gameSpeed);
    }
    function gamePause() {
        pauseScreen.show();
        clearInterval(timer);
    }

    function createGame() {
        if(snake){
            resetLevel();
        }
        createLevel();

        timer = setInterval(checkGame, gameSpeed);

        mainScreen.hide();
    }

    function checkGame() {
        if(gameOverScreen.isShowed) return;
    
        snake.move();

        if (!snake.alive) {
            gameOverScreen.show();
            clearInterval(timer);
        }

        if(snake.meal) {
            scoreSpan.innerHTML =  ++score;
            (new Food(matrix)).randomShow();
            snake.meal = false;
        }
    }

    function createLevel() {
        snake = new Snake(matrix, [1, 1], 3, 'right');
        snake.show();

        // Create food
        (new Food(matrix)).randomShow();

        //Create walls
        (new Wall(matrix, [6, 8], 5, 'down')).show();
        (new Wall(matrix, [14, 8], 5, 'down')).show();
        (new Wall(matrix, [8, 6], 5, 'right')).show();
        (new Wall(matrix, [8, 14], 5, 'right')).show();
        (new Wall(matrix, [10, 10])).show();
        (new Wall(matrix, [3, 3], 2, 'right')).show();
        (new Wall(matrix, [18, 3], 2, 'left')).show();
        (new Wall(matrix, [3, 18], 2, 'right')).show();
        (new Wall(matrix, [18, 18], 2, 'left')).show();
    }

    function resetLevel() {
        matrix.destroy();
        matrix.create();

        gameOverScreen.hide();
        score = 0;
        snake.alive = true;
        scoreSpan.innerHTML = score;
       
        snake.destroy();
    }
}

