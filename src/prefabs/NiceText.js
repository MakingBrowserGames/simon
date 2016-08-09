
class NiceText extends Phaser.Text {
    constructor(game, x, y, text, style) {
        super(game, x, y, text, style);
        this.font = 'Permanent Marker';
        this.fontSize = 60;
        this.padding.set(10, 16);
        this.stroke = '#000000';
        this.strokeThickness = 8;
        this.fill = 'pink';
        this.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
    }

}

export default NiceText;