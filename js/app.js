"use strict"

window.onload = function(e) {
    // Globals
    let gameCanvas = document.querySelector('#game');
    let gameScreen = document.querySelector('#game-screen');
    let gameSpeed = 100; 

    //Score counter
    let scoreSpan = document.querySelector('#game-info .score');
    let score = 0;

    //Buttons and their eventListeners
    let retryButton = Helpers.createButton('Retry', 'retry');
    retryButton.addEventListener('click', function(e) {
        gameOverScreen.hide();
        score = 0;
        snake.alive = true;
        scoreSpan.innerHTML = score;

        snake.destroy();
        snake = new Snake(matrix, [[3,10], [2,10], [1,10]], 'right');
    });

    //Screens
    let gameOverScreen = new Screen(gameScreen, 'Game Over', retryButton); 

    //Create matrix
    let matrix = new Matrix(gameCanvas, 20);
    matrix.create();

    //Create foods
    (new Food(matrix)).randomShow();

    //Create walls
    (new Wall(matrix, [[5, 2]], 5, 'down')).show();
    (new Wall(matrix, [[17, 11]], 5, 'down')).show();

    //Create snake
    let snake = new Snake(matrix, [[3,10], [2,10], [1,10]], 'right');
    snake.show();

    // Mobile device controls
    let controls = document.querySelectorAll('#game-controls button');
    for(let control of controls) {
        control.addEventListener('click', function (e) {  
            let direction;
            switch(this.className) {
                case 'right':
                    direction = 'right';
                    break;
                case 'left':
                    direction = 'left';
                    break;
                case 'up':
                    direction = 'up';
                    break;
                case 'down':
                    direction = 'down';
                    break;
            }  
            snake.setDirection(direction);
        });
    }
    
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
    let timer = setInterval(() => {
        if(gameOverScreen.isShowed) return;

        snake.move();

        if (!snake.alive) {
            gameOverScreen.show();
        }

        if(snake.meal) {
            scoreSpan.innerHTML =  ++score;
            (new Food(matrix)).randomShow();
            snake.meal = false;
        }
    }, gameSpeed);
}

