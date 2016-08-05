/* eslint-disable no-console */
import Simon from '../prefabs/Simon';

//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class SimonSaysState extends Phaser.State {


    //initialization code in the constructor
    constructor(game, parent) {
        super(game, parent);

    }

    //Load operations (uses Loader), method called first
    preload() {

    }

    //Setup code, method called after preload
    create() {
        this.simon = new Simon(this.game, this.game.world.centerX, this.game.world.centerY);
        this.simon.scale.set(2);
        //add background image
        this.background = this.game.add.sprite(0, 0, 'background');
        this.background.height = this.game.world.height;
        this.background.width = this.game.world.width;
        this.game.add.existing(this.simon);

        this.keys = this.game.input.keyboard.addKeys({
            'TOP_LEFT': Phaser.KeyCode.Q,
            'TOP_RIGHT': Phaser.KeyCode.E,
            'BOTTOM_LEFT': Phaser.KeyCode.A,
            'BOTTOM_RIGHT': Phaser.KeyCode.D
        });
        this.keys.TOP_LEFT.onDown.add(() => this.onButton('TOP_LEFT'));
        this.keys.TOP_RIGHT.onDown.add(() => this.onButton('TOP_RIGHT'));
        this.keys.BOTTOM_RIGHT.onDown.add(() => this.onButton('BOTTOM_RIGHT'));
        this.keys.BOTTOM_LEFT.onDown.add(() => this.onButton('BOTTOM_LEFT'));
        this.simon.buttonSignal.removeAll();
        this.simon.buttonSignal.add((button) => {
            this.onButton(button);
        }, this);
        this.score = this.game.add.text(0, 0, 'Score: 0');
        this.score.font = 'Creepster';
        this.score.fontSize = 60;
        this.score.padding.set(10, 16);
        this.score.stroke = '#000000';
        this.score.strokeThickness = 2;
        this.score.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        this.score.anchor.set(0);
        this.statusText = this.add.text(this.game.world.width, 0, 'WAIT', {
            font: 'Fontdiner Swanky',
            fill: '#ffffff',
            align: 'left'
        });
        this.statusText.anchor.set(1, 0);
        this.statusText.font = 'Creepster';
        this.statusText.fontSize = 60;
        this.statusText.padding.set(10, 16);
        this.statusText.stroke = '#000000';
        this.statusText.strokeThickness = 2;
        this.statusText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        this.actionSequence = [];
        this.timer = this.game.time.create(false);
        this.timer.start();
        // this.test();
        // this.nextTurnSignal
        this.nextTurn(true);
    }
    onButton(button) {
        var self = this;
        console.log('Button: ', button);
        this.simon.play(button);
        if (this.currentlyPlaying.length > 0) {
            var expected = this.currentlyPlaying.shift();
            if (button == expected) {
                console.log('its a match');
                if (this.finishedSequence()) {
                    this.timer.add(2000, () => { this.nextTurn(true); });
                }
            } else {
                this.timer.add(2000, () => { this.nextTurn(); });
                console.log('you suck!');
            }
        }
    }
    finishedSequence() {
        return this.currentlyPlaying.length == 0;
    }
    readnput() {
        console.log('your turn!');
        // this.game.state.start('ISayState');
        this.score.style.fill = '#ffffff';
        this.statusText.setText('TU TURNO!');
        this.currentlyPlaying = this.actionSequence.slice();
        this.game.input.enabled = true;
        // new Phaser.Signal();
    }
    nextTurn(addOne) {
        var finishedPlaying = new Phaser.Signal(),
            self = this;

        this.statusText.setText('ESPERA');
        if (addOne) {
            this.generateNewAction();
        }
        finishedPlaying.addOnce(() => {
            self.readnput();
        }, self);
        this.playSequence(finishedPlaying);
    }

    generateNewAction() {
        this.actionSequence.push(this.randomButton());
        this.score.text = 'Score: ' + this.actionSequence.length;
    }
    playSequence(signal) {
        console.log(this.actionSequence);
        this.game.input.enabled = false;
        this.score.style.fill = 'red';
        this.currentlyPlaying = this.actionSequence.slice();
        this.playNext(signal);
    }

    playNext(signal) {
        if (this.currentlyPlaying.length > 0) {
            var self = this;
            var next = this.currentlyPlaying.shift();
            this.simon.play(next);
            // next.call(this.simon);

            this.timer.add(1500, () => {
                self.playNext(signal);
            }, self);

        } else {

            signal.dispatch();
        }
    }
    //Code ran on each frame of game
    // update() {

    // }

    //Called when game is paused
    // paused() {

    // }
    randomButton() {
        // var actions = [this.simon.topLeft, this.simon.topRight, this.simon.bottomRight, this.simon.bottomLeft];
        var r = Math.random() * Object.keys(this.simon.buttons).length;
        r = Math.floor(r);
        return Object.keys(this.simon.buttons)[r];
    }

    //You're able to do any final post-processing style effects here.
    // render() {
    //   // this.simon.re
    // }

    //Called when switching to a new state
    // shutdown() {

    // }

}

export default SimonSaysState;