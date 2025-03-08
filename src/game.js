const Phaser = require('phaser');
const readSquareArray = require('../src/helpers/readSquareArray');

const config = {
    type: Phaser.WEBGL,
    width: 14*80,
    height: 9*80,
    parent: 'game-container',
    scene: {
        preload: preload,
        create: create
    }
};

let game = new Phaser.Game(config);

function preload() {
    console.log("preload");
    this.load.audio('moveSound', '../assets/sfx/move.mp3');
    this.load.image('0', '../assets/img/tile-000-socket.png');
    this.load.image('1', '../assets/img/tile-000-shadowed.png');
    this.load.image('2', '../assets/img/tile-002-active.png');
    this.load.image('L', '../assets/img/tile-002-active-L.png');
    this.load.image('O', '../assets/img/tile-002-active-O.png');
    this.load.image('C', '../assets/img/tile-002-active-C.png');
    this.load.image('K', '../assets/img/tile-002-active-K.png');
    this.load.image('E', '../assets/img/tile-002-active-E.png');
    this.load.image('Y', '../assets/img/tile-002-active-Y.png');
    this.load.image('P', '../assets/img/tile-002-active-P.png');
    this.load.image('W', '../assets/img/tile-002-active-W.png');
    this.load.image('R', '../assets/img/tile-002-active-R.png');
    this.load.image('down', '../assets/img/tile-002-button-down.png');
    this.load.image('left', '../assets/img/tile-002-button-left.png');
    this.load.image('right', '../assets/img/tile-002-button-right.png');
    this.load.image('up', '../assets/img/tile-002-button-up.png');
}

function create() {
    let gridVerticalSize = 9;
    let gridHorizontalSize = 14;
    let tileSize = 80;
    let tiles = [];

    const map = readSquareArray();
    console.log(map);

    for (let row = 0; row < gridVerticalSize; row++) {
        for (let col = 0; col < gridHorizontalSize; col++) {
            let tile = this.add.sprite(col * tileSize, row * tileSize, map[row][col]).setOrigin(0, 0);
            tiles.push(tile);
        }
    }

    let clickSound = this.sound.add('moveSound');

    this.input.on('pointerdown', (pointer) => {
        console.log("Pointer Down Event Fired!");
        console.log(`Clicked at: ${pointer.x}, ${pointer.y}`);
        clickSound.play();
    });
}
