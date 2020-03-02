class Wall extends Element {
    constructor(matrix, cords, length, direction) {
        super(matrix, cords);
        this.value = 'wall';
        this.length = length;
        this.direction = direction;

        this.create();
    }
}