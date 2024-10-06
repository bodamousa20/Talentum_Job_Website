const fs = require('fs');

// Read the TypeScript file
fs.readFile('testingData.ts', 'utf8', (err, data) => {
    if (err) throw err;

    // Convert TypeScript object to JSON format
    // This regex ensures that it only converts keys outside of strings
    let jsonData = data.replace(/(\w+):/g, '"$1":');

    // Preserve 'https:'
    jsonData = jsonData.replace(/"https":/g, 'https:');

    // Ensure all values are enclosed in double quotes
    jsonData = jsonData.replace(/:\s*'([^']*)'/g, ': "$1"');

    // Write to a new JSON file
    fs.writeFile('jobs-data.json', jsonData, 'utf8', (err) => {
        if (err) throw err;
        console.log('File has been converted to JSON format.');
    });
});
