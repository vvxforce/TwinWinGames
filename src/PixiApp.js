import SlotMachine from "./SlotMachine";

export default class PixiApp {
    constructor() {
        this.create();
    }

    create() {
        this.app = new PIXI.Application({
            width: 800,
            height: 600,
            transparent: false,
            antialias: true
        });

        this.app.gameContainer = new PIXI.Container()
        this.app.stage.addChildAt(this.app.gameContainer, 0)
        document.body.appendChild(this.app.view);
        window.app = this.app;
        this.slotMachine = new SlotMachine(app, 150, 65);
    }

    start() {
        this.app.ticker.add(dt => this.loop(dt));
    }

    stop() {
        this.app.ticker.stop()
    }
    loop(dt) {
        this.slotMachine.loop(dt)
    }
}