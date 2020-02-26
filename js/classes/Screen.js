class Screen {
    constructor(screen, text, buttons) {
        this.screen = screen;
        this.text = text;
        this.buttons = buttons;
        this.isShowed;

        this.create();
    }

    create() {
        let label = document.createElement('div'); 
        label.classList.add("title");
        label.textContent = this.text;

        this.screen.append(label);

        if(!this.buttons) {
            return;
        }
        else if (Array.isArray(this.buttons)) {
            this.buttons.forEach(button => {this.screen.append(button)});
        }
        else {
            this.screen.append(this.buttons)
        }
    }

    show() {
        this.isShowed = true;
        this.screen.classList.add("active");
    }

    hide() {
        this.isShowed = false;
        this.screen.classList.remove("active");
    }
}
