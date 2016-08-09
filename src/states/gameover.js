import NiceText from '../prefabs/NiceText';

class GameOverState extends Phaser.State {

    constructor() {
        super();
    }

    create() {
        //add background image
        var city = this.game.add.tileSprite(
            0, 0,
            this.game.width,
            this.game.height,
            'city-bg'
        );
        // city.anchor.setTo(0,1);
        city.tileScale.setTo(this.game.world.height/city.texture.height);
        // var trees = this.game.add.tileSprite(
        //     0, 0,
        //     self.game.width, 
        //     self.game.height, 
        //     'arboles'
        // );
        // scale = this.game.world.height / trees.texture.height;
        // trees.tileScale.setTo(scale);
        // trees.anchor.setTo(0,0);
        // trees.tilePosition.setTo(0,0);
        // trees.height = this.game.world.height;
        // trees.width = this.game.world.width;
        this.game.add.sound('perdiste').play();
        //add intro text
        this.gameoverText = new NiceText(this.game, this.game.world.centerX,
        32, 'Game Over!'  
        );
        this.gameoverText.fontSize=90;
        this.gameoverText.anchor.setTo(.5,0);
        this.game.add.existing(this.gameoverText);

        this.scoreText = new NiceText(this.game, 
            this.game.world.centerX, 
            this.gameoverText.bottom, 
            'Score = ' + this.game.global.score
        );
        this.game.add.existing(this.scoreText);
        // this.scoreText = this.add.text(this.game.world.centerX, this.game.world.centerY, 'Score = ' + this.game.global.score, {
        //     font: '42px Arial',
        //     fill: '#ffffff',
        //     align: 'center'
        // });
        this.scoreText.anchor.set(0.5,0);

        this.input.onDown.add(this.onInputDown, this);

        //prevent accidental click-thru by not allowing state transition for a short time
        this.canContinueToNextState = false;
        this.game.time.events.add(Phaser.Timer.SECOND * .5, function() {
            this.canContinueToNextState = true;
        }, this);

        this.saveVarsToLocalStorage();
        this.resetGlobalVariables();
        // this.trees = trees;
        this.cityBackground=city;
    }

    saveVarsToLocalStorage() {
        var max = localStorage['maxScore'] || 0; //default value of 0 is it does not exist
        if (this.game.global.score > max) {
            localStorage['maxScore'] = this.game.global.score;
        }
    }

    resetGlobalVariables() {
        this.game.global.score = 0;
    }
    update() {
        this.cityBackground.tilePosition.x -= .1;
        // this.trees.tilePosition.x -= .3;
    }

    onInputDown() {
        if (this.canContinueToNextState) {
            this.game.state.start('menu');
        }
    }

}

export default GameOverState;