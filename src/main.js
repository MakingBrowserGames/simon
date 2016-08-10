import Boot from './states/boot';
import Gameover from './states/gameover';
import Menu from './states/menu';
import Preloader from './states/preloader';
import SimonSaysState from './states/simonsays';

const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'simon-game');
game.state.add('boot', new Boot());
game.state.add('gameover', new Gameover());
game.state.add('menu', new Menu());
game.state.add('preloader', new Preloader());
game.state.add('simonsays', new SimonSaysState());

game.state.start('boot');
