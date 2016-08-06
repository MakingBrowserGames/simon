/* eslint-disable no-console*/
class Preloader extends Phaser.State {

    constructor() {
        super();
    }

    preload() {
        //setup loading bar
        this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
        this.load.setPreloadSprite(this.asset);
        //Setup loading and its events
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.loadResources();
        this.game.load.start();
    }

    loadResources() {
        //  Load the Google WebFont Loader script
        this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js');
        this.game.load.image('mountains-back', 'assets/mountains-back.png');
        this.game.load.image('mountains-mid1', 'assets/mountains-mid1.png');
        this.game.load.image('mountains-mid2', 'assets/mountains-mid2.png');

        this.game.load.image('crosshairs', 'assets/crosshair_red_small.png');
        this.game.load.image('text_go', 'assets/text_go.png');
        this.game.load.image('text_ready', 'assets/text_ready.png');

        this.game.load.spritesheet('target', 'assets/target.png', 128.66, 128);
        this.game.load.spritesheet('simon', 'assets/simon.png', 170, 170);

        this.game.load.audio('gunshot', 'assets/gunshot.wav');
        this.game.load.audio('ding', 'assets/ding.wav');
        this.game.load.audio('track1', 'assets/track1.mp3');
        this.game.load.audio('track2', 'assets/track2.mp3');
        this.game.load.audio('track3', 'assets/track3.mp3');
        this.game.load.audio('track4', 'assets/track4.mp3');

        //  From http://glslsandbox.com/e#20193.0
        this.game.load.shader('bacteria', 'assets/bacteria.frag');
    }

    onLoadComplete() {
        WebFont.load({
            google: {
                families: ['Bungee', 'Creepster', 'Revalia', 'Fontdiner Swanky']
            },
            active: () => {
                console.log('preloading complete');
                this.game.state.start('menu');
            }
        });
    }
}

export default Preloader;
