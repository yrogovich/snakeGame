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
            randomCord1 = Helpers.randomInteger(1, this.matrix.length);
            randomCord2 = Helpers.randomInteger(1, this.matrix.length);
        } while (this.matrix.getCell(randomCord1, randomCord2));

        this.matrix.setCell(randomCord1, randomCord2, this.value);  
    }
}