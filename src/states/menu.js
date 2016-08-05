class Menu extends Phaser.State {

    constructor() {
        super();
    }
    getHeader(t) {
        var header = this.game.add.text( this.game.world.centerX,this.game.world.centerY, t);
        header.font = 'Bungee';
        header.fontSize = 60;
        header.padding.set(10, 16);
        header.stroke = '#000000';
        header.strokeThickness = 8;
        header.fill='pink';
        header.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        header.anchor.set(.5, .5);
        const tween = this.game.add.tween(header.scale)
            .to({ x: 1  , y: 2.5 }, 500, Phaser.Easing.Quadratic.In, false, 0, -1, true);
        tween.start();    
        return header;
    }
    create() {
        //add background image
        // this.background = this.game.add.sprite(0, 0, 'background');
        // this.background.height = this.game.world.height;
        // this.background.width = this.game.world.width;
        this.filter = new Phaser.Filter(this.game, null, this.game.cache.getShader('bacteria'));

        this.filter.addToWorld(0, 0, this.game.world.width, this.game.world.height);
        //add some fancy transition effects
        this.ready = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'text_ready');
        this.ready.anchor.set(0.5, 0.5);
        this.ready.visible = false;
        this.go = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'text_go');
        this.go.anchor.set(0.5, 0.5);
        this.go.visible = false;

        //add intro text
        this.menuText = this.getHeader('Hace lo que te digo');

        this.input.onDown.add(this.onInputDown, this);
        this.input.onDown.add(this.justFuckingStart, this);
        this.canContinueToNextState = true;
    }

    update() { 
        this.filter.update();
    }

    justFuckingStart() {
        this.game.state.start('simonsays');

    }
    //create some cool tweens and apply them to 'this.ready' and 'this.go'
    onInputDown() {
        if (!this.canContinueToNextState) { //do not allow tweens to be created multiple times simultaneously
            return;
        }

        this.canContinueToNextState = false;
        this.ready.visible = true;
        this.menuText.visible = false;
        this.go.angle = -15;

        //create some tweens - http://phaser.io/docs/2.5.0/Phaser.Tween.html#to
        const ready_tween = this.game.add.tween(this.ready.scale)
            .to({ x: 1.5, y: 1.5 }, 500, Phaser.Easing.Linear.In, false, 0, -1, true);

        const go_tween = this.game.add.tween(this.go)
            .to({ angle: 15 }, 200, Phaser.Easing.Linear.In, false, 0, -1, true);

        //when the 'ready' tween is done, hide it and show 'go'. perform a shaking/rotating tween on 'go'. When 'go' is done, start the game
        var go_tween_repeat_num = 3; //how many times these tweens should loop
        var ready_tween_repeat_num = 3;

        const go_tween_loop = function () {
            go_tween_repeat_num -= 0.5;
            if (go_tween_repeat_num < 1) {
                this.go.visible = false;
                this.game.state.start('simonsays');
            }
        };
        const ready_tween_loop = function () {
            ready_tween_repeat_num -= 0.5;
            if (ready_tween_repeat_num < 1) {
                this.ready.visible = false;
                this.go.visible = true;

                go_tween.start();
            }
        };
        ready_tween.onLoop.add(ready_tween_loop, this);
        go_tween.onLoop.add(go_tween_loop, this);


        ready_tween.start();
    }

}

export default Menu;
