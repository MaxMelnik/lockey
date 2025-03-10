const Phaser = require('phaser');
const readSquareArray = require('../src/helpers/readSquareArray');
const swapTilesTextures = require('../src/helpers/swapTilesTextures');

const config = {
    type: Phaser.WEBGL,
    width: 14 * 80,
    height: 9 * 80,
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
    this.load.image('down-h', '../assets/img/tile-002-button-down-hover.png');
    this.load.image('left-h', '../assets/img/tile-002-button-left-hover.png');
    this.load.image('right-h', '../assets/img/tile-002-button-right-hover.png');
    this.load.image('up-h', '../assets/img/tile-002-button-up-hover.png');
    this.load.image('down-p', '../assets/img/tile-002-button-down-pressed.png');
    this.load.image('left-p', '../assets/img/tile-002-button-left-pressed.png');
    this.load.image('right-p', '../assets/img/tile-002-button-right-pressed.png');
    this.load.image('up-p', '../assets/img/tile-002-button-up-pressed.png');
}

let tileGrid = [];

function create() {
    let gridVerticalSize = 9;
    let gridHorizontalSize = 14;
    let tileSize = 80;
    let controlTiles = ['down', 'left', 'right', 'up'];
    let alphabet = ['L', 'O', 'C', 'K', 'E', 'Y', 'P', 'W', 'R'];
    let tiles = [];

    let clickSound = this.sound.add('moveSound');

    const map = readSquareArray();
    console.log(map);

    for (let row = 0; row < gridVerticalSize; row++) {
        tileGrid[row] = [];
        for (let col = 0; col < gridHorizontalSize; col++) {
            let tileKey = map[row][col];
            let tile = this.add.sprite(col * tileSize, row * tileSize, map[row][col]).setOrigin(0, 0);

            tile.originalTexture = tileKey; // ✅ Store the original texture
            tile.setInteractive(); // ✅ Make the tile interactive

            // ✅ Change tile on hover
            tile.on('pointerover', function () {
                console.log(`🔍 Hovering over tile at (${col}, ${row})`);
                console.log(`🖼️ Current Texture: ${this.texture.key}`);
                if (controlTiles.includes(tile.originalTexture)) this.setTexture(tile.originalTexture + '-h'); // Change to a highlighted tile texture
            });

            // ✅ Revert tile when the cursor leaves
            tile.on('pointerout', function () {
                console.log(`⬅ Leaving tile at (${col}, ${row})`);
                if (controlTiles.includes(tile.originalTexture)) this.setTexture(this.originalTexture); // Revert to original
            });

            tile.on('pointerdown', function () {
                console.log(`Pointer down at tile (${col}, ${row})`);
                if (controlTiles.includes(tile.originalTexture)) {
                    clickSound.play();
                    this.setTexture(tile.originalTexture + '-p')
                }

                if (tile.originalTexture === 'down') {
                    for (let row = gridVerticalSize - 1; row > 0; row--) {
                        for (let col = 0; col < gridHorizontalSize; col++) {
                            if (alphabet.includes(tileGrid[row][col].texture.key) && tileGrid[row + 1][col].texture.key === '0') {
                                swapTilesTextures(tileGrid[row][col], tileGrid[row + 1][col]);
                            }
                        }
                    }
                }

                if (tile.originalTexture === 'left') {
                    for (let row = 0; row < gridVerticalSize; row++) {
                        for (let col = 0; col < gridHorizontalSize; col++) {
                            if (alphabet.includes(tileGrid[row][col].texture.key) && tileGrid[row][col - 1].texture.key === '0') {
                                swapTilesTextures(tileGrid[row][col], tileGrid[row][col - 1]);
                            }
                        }
                    }
                }

                if (tile.originalTexture === 'right') {
                    for (let row = 0; row < gridVerticalSize; row++) {
                        for (let col = gridHorizontalSize - 1; col > 0; col--) {
                            if (alphabet.includes(tileGrid[row][col].texture.key) && tileGrid[row][col + 1].texture.key === '0') {
                                swapTilesTextures(tileGrid[row][col], tileGrid[row][col + 1]);
                            }
                        }
                    }
                }

                if (tile.originalTexture === 'up') {
                    for (let row = 0; row < gridVerticalSize; row++) {
                        for (let col = 0; col < gridHorizontalSize; col++) {
                            if (alphabet.includes(tileGrid[row][col].texture.key) && tileGrid[row - 1][col].texture.key === '0') {
                                swapTilesTextures(tileGrid[row][col], tileGrid[row - 1][col]);
                            }
                        }
                    }
                }
            });

            tile.on('pointerup', function () {
                console.log(`Pointer up at tile (${col}, ${row})`);
                if (controlTiles.includes(tile.originalTexture)) this.setTexture(tile.originalTexture + '-h');
            });

            tileGrid[row][col] = tile;
            tiles.push(tile);
        }
    }
}
