class Element {
    constructor(matrix, cords) {
        this.matrix = matrix;
        this.cords = cords;
    }

    show() {
        for(let cord of this.cords) {
            this.matrix.setCell(cord[0], cord[1], this.value);  
        }
    }

    randomShow() {  
        let randomCord1;
        let randomCord2;      
        do {
            randomCord1 = this._randomInteger(1, this.matrix.length);
            randomCord2 = this._randomInteger(1, this.matrix.length);
        } while (this.matrix.getCell(randomCord1, randomCord2));

        this.matrix.setCell(randomCord1, randomCord2, this.value);  
    }

    _randomInteger(min, max) {
        // получить случайное число от (min-0.5) до (max+0.5)
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }
}