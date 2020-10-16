"use strict"

window.onload = function(e) {
    // Globals
    let body = document.querySelector('body');
    let gameWrapper =  document.querySelector('#game-wrapper');
    let gameCanvas = document.querySelector('#game');
    let gameSpeed = 200; 
    let snake;

    let scoreSpan = document.querySelector('#game-info .score');

    let matrix = new Matrix(gameCanvas, 20);

    // Buttons
    let retryButton = Helpers.createButton('Retry', 'retry');
    let newGameButton = Helpers.createButton('New game', 'newGame');
    let continueButton = Helpers.createButton('Continue', 'continue');

    matrix.create();

    //Screens
    let gameOverScreen = new Screen(gameWrapper, 'Game Over', retryButton); 
    let mainScreen = new Screen(gameWrapper, 'Snake', newGameButton);   
    let pauseScreen = new Screen(gameWrapper, 'Pause', continueButton);   
    mainScreen.show();  


    //Listeners
    retryButton.addEventListener('click', createGame);
    newGameButton.addEventListener('click', createGame);
    continueButton.addEventListener('click', gameContinue);
    window.addEventListener('blur', gamePause);

    //Game timer
    let timer;
    // Level
    let level = new Level(matrix, snake);

    // Swipe controls
    let swiper = new Swipe(body);
        swiper.onLeft(() => level.snake.setDirection('left'));
        swiper.onRight(() => level.snake.setDirection('right'));
        swiper.onUp(() => level.snake.setDirection('up'));
        swiper.onDown(() => level.snake.setDirection('down'));
        swiper.run();
    
    // Keyboard controls
    document.addEventListener('keydown', function(e) {
        console.log(e);
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
        if(level.snake) {
            level.snake.setDirection(direction);
        }
    });

  
    function gameContinue() {
        pauseScreen.hide();
        timer = setInterval(checkGame, gameSpeed);
    }

    function gamePause() {
        pauseScreen.show();
        clearInterval(timer);
    }

    function createGame() {
        if(snake != 'undefined'){
            level.reset();
            gameOverScreen.hide();
            scoreSpan.innerHTML = 0;
        }
        if (Screen.isShowed) {
            return;
        }

        level.create();
        timer = setInterval(checkGame, gameSpeed);
        mainScreen.hide();
    }

    function checkGame() {   
        level.snake.move();

        if (!level.snake.alive) {
            gameOverScreen.show();
            clearInterval(timer);
        }

        if(level.snake.meal) {
            level.score += 1;
            scoreSpan.innerHTML = level.score;
            (new Food(matrix)).randomShow();
            level.snake.meal = false;
        }
    }
}

