
//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class ParalaxMountains {

    //initialization code in the constructor
    constructor(game) {
        // super(game, parent);
        // super(game, 0, 0, game.add.renderTexture(game.width, game.height, 'paralax'),0);
        this.game = game;
        // this.parent = parent;
        this.ready=false;
        this.mountainsBack = this.game.add.tileSprite(0,
            this.game.height - this.game.cache.getImage('mountains-back').height,
            this.game.width,
            this.game.cache.getImage('mountains-back').height,
            'mountains-back'
        );
        // this.addChild(this.mountainsBack);
        this.mountainsMid1 = this.game.add.tileSprite(0,
            this.game.height - this.game.cache.getImage('mountains-mid1').height,
            this.game.width,
            this.game.cache.getImage('mountains-mid1').height,
            'mountains-mid1'
        );
        // this.addChild(this.mountainsMid1);

        this.mountainsMid2 = this.game.add.tileSprite(0,
            this.game.height - this.game.cache.getImage('mountains-mid2').height,
            this.game.width,
            this.game.cache.getImage('mountains-mid2').height,
            'mountains-mid2'
        );
        // this.addChild(this.mountainsMid2);
        this.ready = true;
        // return this
    }

    // Load operations (uses Loader), method called first
    // preload() {

    // }

    //Setup code, method called after preload
    // create() {
    //     ;
    // }

    //Code ran on each frame of game
    update() {
        if (!this.ready) return;
        this.mountainsBack.tilePosition.x -= 0.05;
        this.mountainsMid1.tilePosition.x -= 0.3;
        this.mountainsMid2.tilePosition.x -= 0.75;
    }
    // postUpdate(){

    // }
    //Called when game is paused
    paused() {

    }

    // //You're able to do any final post-processing style effects here.
    // render() {
    //     // this.
    // }

    //Called when switching to a new state
    shutdown() {

    }

}

export default ParalaxMountains;
