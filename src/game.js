const Phaser = require('phaser');

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
    this.load.image('tile-blank', '../img/active-tile-000-blank.png');
    this.load.image('tile-L', '../img/active-tile-000-L.png');
}

function create() {
    let gridVerticalSize = 9;
    let gridHorizontalSize = 14;
    let tileSize = 80;
    let tiles = [];

    for (let row = 0; row < gridVerticalSize; row++) {
        for (let col = 0; col < gridHorizontalSize; col++) {
            let tile = this.add.sprite(col * tileSize, row * tileSize, 'tile-L').setOrigin(0, 0);
            tiles.push(tile);
        }
    }

    this.input.on('pointerdown', (pointer) => {
        console.log("Pointer Down Event Fired!");
        console.log(`Clicked at: ${pointer.x}, ${pointer.y}`);
    });
}
