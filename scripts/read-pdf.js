const fs = require('fs');
const pdf = require('pdf-parse');

async function readPdf(filePath) {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);
        console.log(`\n--- CONTENT OF ${filePath} ---`);
        console.log(data.text);
    } catch (err) {
        console.error(`Error reading ${filePath}:`, err);
    }
}

async function main() {
    await readPdf('c:\\Users\\Lenovo\\Documents\\Work\\888232 IPM\\Group project\\Website\\Novel_N_Comic_Web\\novel-comic-web\\Infrastructure Design\\662415024-888343-Relational Model.pdf');
    await readPdf('c:\\Users\\Lenovo\\Documents\\Work\\888232 IPM\\Group project\\Website\\Novel_N_Comic_Web\\novel-comic-web\\Infrastructure Design\\662415024-888343-ER Diagram.pdf');
}

main();
