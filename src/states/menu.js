import ParalaxMountains from '../prefabs/ParalaxMountains';
import NiceText from '../prefabs/NiceText';
class Menu extends Phaser.State {

    constructor() {
        super();
    }
    getHeader(t) {
        var header = new NiceText(this.game, this.game.world.centerX, this.game.world.centerY, t);
        header.anchor.set(.5, .5);
        this.game.add.existing(header);
        return header;
    }
    create() {

        //Set the games background colour
        this.game.stage.backgroundColor = '#697e96';
        //add background image
        this.mountains= new ParalaxMountains(this.game);
        //add some fancy transition effects
        this.ready = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'text_ready');
        this.ready.anchor.set(0.5, 0.5);
        this.ready.visible = false;
        this.go = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'text_go');
        this.go.anchor.set(0.5, 0.5);
        this.go.visible = false;

        //add intro text
        this.menuText = this.getHeader('Oli, Hace lo que te digo');

        this.input.onDown.add(this.justFuckingStart, this);
        this.canContinueToNextState = true;
    }

    update() {
        this.mountains.update();
    }

    justFuckingStart() {
        this.game.state.start('simonsays');

    }
}

export default Menu;
