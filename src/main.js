import Phaser from "phaser"

class RyuDemo extends Phaser.Scene {

    constructor()
    {
        super();
    }

    preload ()
    {
        const textoCargando = this.add.text(config.width / 2, config.height / 2, 'Cargando...', {
            fontSize: 45 + 'px',
            fill: '#ffa',
            fontFamily: 'verdana, arial, sans-serif',
            fontStyle: 'bold'
        });

        textoCargando.setOrigin(0.5, 0.5);
        textoCargando.setStroke('#f91', 16);
        textoCargando.setShadow(2, 2, '#111', 2, false, true);

        this.load.atlas('ryu', 'assets/sf2ryu.png', 'assets/sf2ryu.json');
        this.load.image('sea', 'assets/sf2boat.png');
        this.load.image('ground', 'assets/sf2floor.png');

        this.load.audio('mix-audio', 'assets/meowmix-77110.mp3');
    }

    create ()
    {
        this.mixAudio = this.sound.add('mix-audio');

        this.add.image(100, 130, 'sea').setScale(3);
        this.add.image(400, 500, 'ground').setScale(3);

        var info = ['Tocar pantalla...', 'Centro IMI'];

        this.texto = this.add.text(config.width / 3, config.height / 1.5, info[0], {
            fontSize: 50 + 'px',
            fill: '#ffa',
            fontFamily: 'verdana, arial, sans-serif',
            fontStyle: 'bold'
        });

        this.texto.setOrigin(0.5, 0);
        this.texto.setStroke('#f41', 16);
        this.texto.setShadow(2, 2, '#111', 2, false, true);

        this.texto2 = this.add.text(config.width / 2, config.height / 1.2, info[1], {
            fontSize: 40 + 'px',
            fill: '#ffa',
            fontFamily: 'verdana, arial, sans-serif',
            fontStyle: 'bold'
        });

        this.texto2.setOrigin(0.5, 0);
        this.texto2.setStroke('#fa1', 12);
        this.texto2.setShadow(2, 2, '#111', 2, false, true);

        this.tweens.add(
        {
            targets: this.texto,
            y: 10,
            ease: 'Elastic',
            duration: 3000
        });

        this.anims.create({
            key: 'hadoken',
            frames: this.anims.generateFrameNames('ryu', { prefix: 'frame_', end: 15, zeroPad: 2 }),
            yoyo: false,
            repeat: -1
        });

        var ryu = this.add.sprite(400, 350).play('hadoken').setScale(3);

        this.input.on('pointerup', function () {

            //  Toggle 'yoyo' at runtime
            ryu.anims.yoyo = !ryu.anims.yoyo;

            //info[1] = 'yoyo: ' + ryu.anims.yoyo;
            //text.setText(info);

        });

        this.mixAudio.play();
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    //scene: {preload: preload, create: create}
    scene: [RyuDemo]
};

var game = new Phaser.Game(config);
