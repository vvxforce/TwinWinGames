import './utils.js'

export default class SlotMachine {
    constructor(app, reelWidth, reelHeight) {
        this.app = app;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.symbols = [
            'assets/M00_000.jpg', 'assets/M01_000.jpg', 'assets/M02_000.jpg',
            'assets/M03_000.jpg', 'assets/M04_000.jpg', 'assets/M05_000.jpg',
            'assets/M06_000.jpg', 'assets/M07_000.jpg', 'assets/M08_000.jpg',
            'assets/M10_000.jpg', 'assets/M11_000.jpg', 'assets/M12_000.jpg'
        ];
        this.reelWidth = reelWidth;
        this.reelHeight = reelHeight;
        this.reels = [];
        this.isPlaying = false;
        this.createReels();
        this.createSpinButton()
    }

    createReels() {
        this.reelContainer = new PIXI.Container();
        this.reelContainer.x = this.app.screen.width * .035;
        this.app.stage.addChild(this.reelContainer);

        for (let i = 0; i < 5; i++) {
            const reel = new PIXI.Container();
            reel.x = i * this.reelWidth;
            reel.scale.set(2)
            this.reelContainer.addChild(reel);
            this.reels.push(reel);

            for (let j = 0; j < 12; j++) {
                const symbol = PIXI.Sprite.from(window.utils.shuffleArray(this.symbols)[j]);
                symbol.y = j * this.reelHeight;
                symbol.scale.set(1);
                reel.addChild(symbol);
            }
        }
    }

    createSpinButton() {
        const bottom = new PIXI.Graphics();
        bottom.beginFill(0x000000);
        bottom.drawRect(0, this.app.screen.height * .65, this.app.screen.width, 250);
        bottom.endFill();
        this.app.stage.addChild(bottom);

        const spinButton = new PIXI.Text('Spin', {
            fontSize: 72,
            fill: '#FFF',
        });
        spinButton.interactive = true;
        spinButton.buttonMode = true;
        spinButton.x = this.app.renderer.width / 2 - spinButton.width / 2;
        spinButton.y = this.app.renderer.height * .75;
        this.app.stage.addChild(spinButton);
        spinButton.on('pointerdown', () => {
            if (!this.isPlaying) {
                this.isPlaying = true;
                this.start()
            }
        })
    }

    start() {
        for (const reel of this.reels) {
            this.spinReel(reel);
        }
    }

    spinReel(reel) {
        const randHeight = gsap.utils.random(1, 12, 1)
        reel.children.forEach((symbol) => {
            const startTL = gsap.timeline({
                    onComplete: () => {
                        this.isPlaying = false;
                    }
                })
                .to(symbol, 1, {
                    y: symbol.y + this.reelHeight * randHeight,
                    ease: 'back.out(.5)'
                })
                .pause()
            startTL.restart()
        })
    }

    loop(dt) {
        for (const reel of this.reels) {
            reel.children.forEach((symbol) => {
                if (symbol.y + symbol.height * .5 >= this.reelHeight * 12) {
                    symbol.y -= this.reelHeight * 12
                }
            });
        }
    }
}