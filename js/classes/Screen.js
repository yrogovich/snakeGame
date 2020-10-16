class Screen {
    constructor(gameWrapper, text, buttons) {
        this.gameWrapper = gameWrapper;
        this.screen;
        this.text = text;
        this.buttons = buttons;
        this.isShowed;

        this.create();
    }

    create() {
        this.screen = document.createElement('div');
        this.screen.classList.add('game-screen');
        this.gameWrapper.append(this.screen);

        let label = document.createElement('div'); 
        label.classList.add("title");
        label.textContent = this.text;
        this.screen.append(label);

        if(!this.buttons) {
            return;
        }
        else if (Array.isArray(this.buttons)) {
            // TODO: TRY FOR OF
            this.buttons.forEach(button => {this.screen.append(button)});
        }
        else {
            this.screen.append(this.buttons)
        }
    }

    show() {
        if(this.hasActive()) {
            return false; 
        }
        
        this.isShowed = true;
        this.screen.classList.add("active");
    }

    hide() {
        this.isShowed = false;
        this.screen.classList.remove("active");
    }

    hasActive() {
        let screens = document.querySelectorAll('.game-screen.active');
        console.log(screens);
        return Boolean(screens.length);
    }
}
