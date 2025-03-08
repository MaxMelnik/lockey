const fs = require('fs');

function readSquareArray(filePath = 'maps/001-lockey.map') {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');

        // Convert text file into a 2D array
        return fileContent
            .trim()
            .split('\r\n')
            .map(row => row.split(' ').map(String));
    } catch (error) {
        console.error("🚨 Error reading file:", error);
        return null;
    }
}

module.exports = readSquareArray;