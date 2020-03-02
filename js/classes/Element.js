class Element {
    constructor(matrix, cords) {
        this.matrix = matrix;
        this.cords = cords;
    }

    create() {
        let x = this.cords[0];
        let y = this.cords[1];

        this.cords = [];

        for (let i = 1; i <= this.length; i++) {
            if( x <= this.matrix.length && x >= 1 &&
                y <= this.matrix.length && y >= 1 ) {
                this.cords.push([x, y]);
            }

            switch (this.direction) {
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
        }
    }

    show() {
        if(Array.isArray(this.cords[0])) {
            for(let cord of this.cords) {
                this.matrix.setCell(cord[0], cord[1], this.value);  
            }
        }
        else {
            this.matrix.setCell(this.cords[0], this.cords[1], this.value);  
        }
    }

    randomShow() {  
        let randomCord1;
        let randomCord2;      
        do {
            randomCord1 = Helpers.randomInteger(1, this.matrix.length);
            randomCord2 = Helpers.randomInteger(1, this.matrix.length);
        } while (this.matrix.getCell(randomCord1, randomCord2));

        this.matrix.setCell(randomCord1, randomCord2, this.value);  
    }
}