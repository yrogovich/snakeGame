class Wall extends Element {
    constructor(matrix, cords, length = 1, direction = 'down') {
        super(matrix, cords);
        this.value = 'wall';
        this.length = length;
        this.direction = direction;

        if(this.length > 1) this.create();
    }
}