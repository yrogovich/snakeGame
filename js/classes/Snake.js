class Snake extends Element{
    constructor(matrix, cords, direction = '') {
        super(matrix, cords);
        this.value = 'snake'
        this.direction = direction;
        this.newDirection = direction;
        this.alive = true; 
        this.meal = false;
    }

    move() {
        if(!this.alive) {
            return;
        }

        this.direction = this.newDirection;

        let head = this.cords[0].slice();
        
        switch(this.direction) {
            case 'right':
                head[0]++;
                break;
            case 'left':
                head[0]--;
                break;
            case 'up':
                head[1]--;
                break;
            case 'down':
                head[1]++;
                break;
        }

        if(!this._checkAlive(head)) {
            this.alive = false;
            return;
        }

       let nextCell = this.matrix.getCell(head[0], head[1]);
       switch (nextCell) {
            case 'snake':
            case 'wall':
                this.alive = false;
                return;

            case 'food':
                this.meal = true;
                break;
       
            default:
                let tail = this.cords.pop();
                this.matrix.setCell(tail[0], tail[1], '');
                break;
       }
       

        this.cords.unshift(head);
        this.matrix.setCell(head[0], head[1], 'snake');
    }

    _checkAlive(head) {
        return head[0] >= 1 && head[0] <= this.matrix.length &&
                head[1] >= 1 && head[1] <=this.matrix.length;
    }

    setDirection(direction) {
        switch(direction) {
            case 'ArrowRight':
            case 'right':
                if(this.direction !== 'left') {
                    this.newDirection = 'right';
                }
                break;
            case 'ArrowLeft':
            case 'left':
                if(this.direction !== 'right') {
                    this.newDirection = 'left';
                }
                break;
            case 'ArrowUp':
            case 'up':
                if(this.direction !== 'down') {
                    this.newDirection = 'up';
                }
                break;
            case 'ArrowDown':
            case 'down':
                if(this.direction !== 'up') {
                    this.newDirection = 'down';
                }
                break;
        }
    }
}