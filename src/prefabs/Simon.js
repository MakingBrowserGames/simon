/* eslint-disable no-console*/
//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class Simon extends Phaser.Sprite {

    //initialization code in the constructor
    constructor(game, x, y, frame) {
        super(game, x, y, 'simon', frame);
        this.buttons = {
            TOP_LEFT: 'TOP_LEFT',
            TOP_RIGHT: 'TOP_RIGHT',
            BOTTOM_RIGHT: 'BOTTOM_RIGHT',
            BOTTOM_LEFT: 'BOTTOM_LEFT'
        };
        this.actions = {
            TOP_LEFT: this.topLeft,
            TOP_RIGHT: this.topRight,
            BOTTOM_RIGHT: this.bottomRight,
            BOTTOM_LEFT: this.bottomLeft
        };
        this.actionsSounds = {
            TOP_LEFT: this.game.add.sound('track1'),
            TOP_RIGHT: this.game.add.sound('track2'),
            BOTTOM_RIGHT: this.game.add.sound('track3'),
            BOTTOM_LEFT: this.game.add.sound('track4')
        };
        this.anchor.setTo(0.5, 0.5);
        this.timer = this.game.time.create(false);
        this.timer.start();
        this.inputEnabled = true;
        this.buttonSignal = new Phaser.Signal();
        this.buttonSignal.add((button) => {
            console.log('button pressed', button);
        }, this);
        // this.events.onInputDown.add(this.onTap, this);
        var w = Math.floor(this.width / 2), h = Math.floor(this.height / 2);
        var texture = this.game.add.renderTexture(w,h, 'button');
        this.buttonSprites = {
            TOP_LEFT:this.game.add.image( -w,-h, texture),
            TOP_RIGHT:this.game.add.image( 0,-h, texture),
            BOTTOM_RIGHT:this.game.add.image( 0,0, texture),
            BOTTOM_LEFT:this.game.add.image( -w,0, texture)
        };
        Object.keys(this.buttonSprites).forEach(function(k) {
            var element = this.buttonSprites[k];
            element.inputEnabled=true;
            element.anchor.setTo(0);
            element.events.onInputDown.add(() => {
                this.play(k);
                this.buttonSignal.dispatch(k);
            }, this);
            this.addChild(element);
        }, this);
    }

    getAction(button) {
        var self = this;
        return Object.keys(this.buttons).filter((k) => {
            return button == self.buttons[k];
        }).map((k) => {
            return self.actions[k];
        }).shift();
    }

    onTap(e) {
        console.log('tap!', e, e.position);
    }

    play(button) {
        var buttons = this.buttons,
            frame;
        switch (button) {
        case buttons.TOP_LEFT:
            frame = 1;
            break;
        case buttons.TOP_RIGHT:
            frame = 2;

            break;
        case buttons.BOTTOM_RIGHT:

            frame = 3;
            break;
        case buttons.BOTTOM_LEFT:
            frame = 4;

            break;

        default:
            frame = 0;
            break;
        }
        this.frame = frame;
        this.actionsSounds[button].play();
        this.outGoTheLights();
    }
    topLeft() {
        this.frame = 1;
        this.outGoTheLights();
    }
    topRight() {
        this.frame = 2;
        this.outGoTheLights();
    }
    bottomRight() {
        this.frame = 3;
        this.outGoTheLights();
    }
    bottomLeft() {
        this.frame = 4;
        this.outGoTheLights();
    }
    outGoTheLights() {
        var self = this;
        this.timer.removeAll();
        this.timer.add(1500, () => {
            self.frame = 0;
        });
    }
    //Load operations (uses Loader), method called first
    preload() {

    }

    //Setup code, method called after preload
    create() {

    }

    //Code ran on each frame of game
    update() {

    }

    //Called when game is paused
    paused() {

    }

    //You're able to do any final post-processing style effects here.
    render() {

    }

    //Called when switching to a new state
    shutdown() {

    }

}

export default Simon;