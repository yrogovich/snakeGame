"use strict"

window.onload = function (e) {
    let gameCanvas = document.querySelector('#game');
    let matrix = new Matrix(gameCanvas, 20);
    matrix.create();

    for (let i = 0; i < 5; i++) {
        (new Food(matrix)).randomShow();
    }
   


    (new Wall(matrix, [[7,1], [7,2], [7,3], [7,4]])).show();

    let snake = new Snake(matrix, [[10,10], [10,11], [10,12]], 'right');
    snake.show();

    document.addEventListener('keydown', function(e) {

        /*
        * Защита от смены курса змеи
        */
        switch(e.key) {
            case 'ArrowRight':
                snake.direction = 'right';
                break;
            case 'ArrowLeft':
                snake.direction = 'left';
                break;
            case 'ArrowUp':
                snake.direction = 'up';
                break;
            case 'ArrowDown':
                snake.direction = 'down';
                break;
        }
    });

    let timer = setInterval(() => {
        snake.move();

        if (!snake.alive) {
            this.clearInterval(timer);
            this.alert('game over');
        }

        /*
        * Создать новый фрукт если змея съела старый
        */
       if(snake.meal) {
        (new Food(matrix)).randomShow();
        snake.meal = false;
       }
    }, 200);
}

