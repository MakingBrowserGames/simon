import Boot from './states/boot';
import Game from './states/game';
import Gameover from './states/gameover';
import Menu from './states/menu';
import Preloader from './states/preloader';
import Simonsays from './states/simonsays';
import ISayState from './states/ISayState';


const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'simon-game');
//  The Google WebFont Loader will look for this object, so create it before loading the script.
var WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function () { game.time.events.add(Phaser.Timer.SECOND, loaded, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
        families: ['Revalia','Fontdiner Swanky']
    }

};

game.state.add('boot', new Boot());
game.state.add('game', new Game());
game.state.add('gameover', new Gameover());
game.state.add('menu', new Menu());
game.state.add('preloader', new Preloader());
game.state.add('simonsays', new Simonsays());
game.state.add('ISayState', new ISayState());

game.state.start('boot');

function loaded() {
    console.log('fonts loaded');
}