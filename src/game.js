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
    this.load.image('1', '../img/active-tile-000-shadowed.png');
    this.load.image('0', '../img/active-tile-000-active.png');
    this.load.image('L', '../img/active-tile-000-L.png');
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

    this.input.on('pointerdown', (pointer) => {
        console.log("Pointer Down Event Fired!");
        console.log(`Clicked at: ${pointer.x}, ${pointer.y}`);
    });
}
