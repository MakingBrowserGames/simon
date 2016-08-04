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
    var simon = this.simon = new Simon(this.game, this.game.world.centerX, this.game.world.centerY);
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
    this.keys.TOP_LEFT.onDown.add(() => this.simon.play('TOP_LEFT'));
    this.keys.TOP_RIGHT.onDown.add(() => this.simon.play('TOP_RIGHT'));
    this.keys.BOTTOM_RIGHT.onDown.add(() => this.simon.play('BOTTOM_RIGHT'));
    this.keys.BOTTOM_LEFT.onDown.add(() => this.simon.play('BOTTOM_LEFT'));

    this.score = this.add.text(0, 0, 'Score: 0', {
      font: '42px Arial',
      fill: '#ffffff',
      align: 'left'
    });
    this.score.anchor.set(0);
    this.actionSequence = [];
    this.timer = this.game.time.create(false);
    this.timer.start();
    this.test();
  }

  generateNewAction() {
    this.actionSequence.push(this.randomButton());
    this.score.text = 'Score: ' + this.actionSequence.length;
  }
  test() {
    for (var i = 0; i < 10; i++) {
      this.generateNewAction()
    }

    this.playSequence();
  }
  playSequence() {
    this.game.input.enabled = false;
    this.score.style.fill = 'red';
    this.currentlyPlaying = this.actionSequence.slice();
    this.playNext();
  }

  playNext() {
      if (this.currentlyPlaying.length > 0) {

        var self = this;
        var next = this.currentlyPlaying.shift();
        this.simon.play(next);
        // next.call(this.simon);

        this.timer.add(1500, () => {
          self.playNext();
        }, self);

      } else {
        console.log('finished playing sequence');
        // this.game.state.start('ISayState');
        this.game.input.enabled = true;
        this.score.style.fill = '#ffffff';
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