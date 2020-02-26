class Helpers {
    static randomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }
    static createButton(text, dataAction, classes) {
        let button = document.createElement('button'); 

        if(Array.isArray(classes)) {
            classes = classes.join(' ');
        }
        
        button.textContent = text;
        button.dataset.action = dataAction;
        button.classList = classes;

        return button;
    }
}