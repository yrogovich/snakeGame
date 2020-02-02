class Wall extends Element {
    constructor(matrix, cords, length, direction) {
        super(matrix, cords);
        this.value = 'wall';

        let x = this.cords[0][0];
        let y = this.cords[0][1];

        for (let i = 0; i < length; i++) {
            switch (direction) {
                case 'left':
                    x--;
                    break;
                case 'right':
                    x++;
                    break;
                case 'up':
                    y--;
                    break;
                case 'down':
                    y++;
                    break;
            }

            if(x <= this.matrix.length && x >= 1 && y <= this.matrix.length && y >= 1) {
                this.cords.push([x, y]);
            }
        }
    }
}