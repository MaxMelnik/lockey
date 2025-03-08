const Phaser = require('phaser');

const config = {
    type: Phaser.WEBGL,
    width: 400,
    height: 400,
    parent: 'game-container',
    scene: {
        preload: preload,
        create: create
    }
};

let game = new Phaser.Game(config);

function preload() {
    console.log("preload");
    this.load.image('tile', '../img/tile.png'); // Replace with your tile image
}

function create() {
    let gridSize = 4;
    let tileSize = 100;
    let tiles = [];

    // Create tiles in a 4x4 grid
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            let tile = this.add.sprite(col * tileSize, row * tileSize, 'tile').setOrigin(0, 0);
            tiles.push(tile);
        }
    }

    this.input.on('pointerdown', (pointer) => {
        console.log("Pointer Down Event Fired!");
        console.log(`Clicked at: ${pointer.x}, ${pointer.y}`);
    });
}
