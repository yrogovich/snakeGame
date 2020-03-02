"use strict"

window.onload = function(e) {
    // Globals
    let gameWrapper =  document.querySelector('#game-wrapper');
    let gameCanvas = document.querySelector('#game');
    let gameSpeed = 200; 
    let snake;

    let scoreSpan = document.querySelector('#game-info .score');
    // let score = 0;

    let matrix = new Matrix(gameCanvas, 20);

    let retryButton = Helpers.createButton('Retry', 'retry');
    let newGameButton = Helpers.createButton('New game', 'newGame');

    //Listeners
    retryButton.addEventListener('click', createGame);
    newGameButton.addEventListener('click', createGame);

    matrix.create();

    //Screens
    let gameOverScreen = new Screen(gameWrapper, 'Game Over', retryButton); 
    let mainScreen = new Screen(gameWrapper, 'Snake', newGameButton);   
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
        }
        snake.setDirection(direction);
    });

    //Game timer
    let timer;

    function createGame() {
        if(snake){
            resetLevel();
        }
        createLevel();

        timer = setInterval(() => {
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
        }, gameSpeed);

        mainScreen.hide();
    }

    function createLevel() {
        // Create food
        (new Food(matrix)).randomShow();

        //Create walls
        (new Wall(matrix, [1, 1], 6, 'down')).show();
        (new Wall(matrix, [20, 20], 6, 'up')).show();

        snake = new Snake(matrix, [10, 10], 3, 'right');
        snake.show();
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

