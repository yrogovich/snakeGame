"use strict"

window.onload = function (e) {
    let gameCanvas = document.querySelector('#game');
    let scoreSpan = document.querySelector('#game-info .score');
    
    let score = 0;

    let matrix = new Matrix(gameCanvas, 20);
    matrix.create();

    (new Food(matrix)).randomShow();

    (new Wall(matrix, [[5, 2]], 5, 'down')).show();
    (new Wall(matrix, [[17, 10]], 5, 'down')).show();


    let snake = new Snake(matrix, [[10,10], [10,11], [10,12]], 'right');
    snake.show();

    // Mobile device controls
    let controls = document.querySelectorAll('#controls button');
    for(let control of controls) {
        control.addEventListener('click', function (e) {    
            snake.setDirection(this.className);
        });
    }
    
    // Keyboard controls
    document.addEventListener('keydown', function(e) {
        snake.setDirection(e.key);
    });

    let timer = setInterval(() => {
        snake.move();

        if (!snake.alive) {
            this.clearInterval(timer);
            this.alert('game over');
        }

        if(snake.meal) {
            scoreSpan.innerHTML =  ++score;
            (new Food(matrix)).randomShow();
            snake.meal = false;
        }
    }, 200);
}

