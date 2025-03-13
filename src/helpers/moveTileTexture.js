function moveTileTexture(tile1, tile2) {
    tile2.setTexture(tile1.texture.key);
    if (tile1.originalTexture === '7') return tile1.setTexture(tile1.originalTexture);
    tile1.setTexture('0');
}

module.exports = moveTileTexture;