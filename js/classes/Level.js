class Level {
   score = 0;

   constructor(matrix, snake, levelName = "No name") {
      this.matrix = matrix;
      this.snake = new Snake(this.matrix);
      this.levelName = levelName;
   }

   create() {    
      this.snake.show();

      /* Level
      (new Wall(matrix, [6, 8], 5, 'down')).show();
      (new Wall(matrix, [14, 8], 5, 'down')).show();
      (new Wall(matrix, [8, 6], 5, 'right')).show();
      (new Wall(matrix, [8, 14], 5, 'right')).show();
      (new Wall(matrix, [10, 10])).show();
      (new Wall(matrix, [3, 3], 2, 'right')).show();
      (new Wall(matrix, [18, 3], 2, 'left')).show();
      (new Wall(matrix, [3, 18], 2, 'right')).show();
      (new Wall(matrix, [18, 18], 2, 'left')).show(); 
      */

      for (let i = 0; i < 10; i++) {
          (new Wall(this.matrix)).randomShow();    
      }

      (new Food(this.matrix)).randomShow();
   }   

   reset() {
      this.matrix.destroy();
      this.matrix.create();

      this.score = 0;
      this.snake.alive = true;
      
      this.snake.destroy();
      this.snake = new Snake(this.matrix);
  }
}