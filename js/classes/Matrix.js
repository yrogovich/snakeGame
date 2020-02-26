class Matrix {
    constructor(element, length = 20) {
        this.element = element;
        this.cells = [];
        this.length = length;
    }

    create() {
        let matrixCellsLength = this.length * this.length;
        
        for (let i = 0; i < matrixCellsLength; i++) {
            let div = document.createElement('div');
            div.classList.add('field');

            if (i % this.length === 0) {
                div.classList.add('row-start');
            }

            div.setAttribute('data-game', '');
            this.element.appendChild(div);
            this.cells[i] = '';
        }
    }

    getCell(x, y) {
        let num = this._calcCellCords(x, y);
        return this.cells[num];
    }

    setCell(x, y, value) {
        let num = this._calcCellCords(x, y);
        this.cells[num] = value;
        this.element.children[num].setAttribute('data-game', value);
    }

    _calcCellCords(x, y) {
        return (x - 1) + (y - 1) * this.length;
    }
}