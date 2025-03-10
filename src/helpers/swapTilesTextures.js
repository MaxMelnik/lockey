function swapTilesTextures(tile1, tile2) {
    let tempTexture = tile1.texture.key;
    tile1.setTexture(tile2.texture.key);
    tile2.setTexture(tempTexture);
}

module.exports = swapTilesTextures;