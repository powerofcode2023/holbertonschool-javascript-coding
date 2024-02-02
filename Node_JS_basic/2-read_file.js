const fs = require('fs');
const readline = require('readline');

const results = [];

const countStudents = (path) => {
  let stCount = 0;
  let FIELD = '';
  let FIELD2 = '';
  let stByField = 0;
  let stByField2 = 0;
  const LIST_OF_FIRSTNAMES = [];
  const LIST_OF_FIRSTNAMES2 = [];

  try {
    fs.readFileSync(path, 'utf8');
  } catch (error) {
    throw new Error('Cannot load the database');
  }

  const readStream = fs.createReadStream(path);

  const readInterface = readline.createInterface({
    input: readStream,
  });

  // Event handler for reading lines
  readInterface.on('line', (line) => {
    const row = line.split(',');
    results.push(row);
  });

  // Event handler for the end of file
  readInterface.on('close', () => {
    results.forEach((e, i) => {
      if (i !== 0) {
        if (e[i] !== 0) {
          stCount += 1;
        }
        if (!FIELD) [, , , FIELD] = e;
        if (e[3] === FIELD) {
          LIST_OF_FIRSTNAMES.push(` ${e[0]}`);
          stByField += 1;
        } else {
          [, , , FIELD2] = e;
          LIST_OF_FIRSTNAMES2.push(` ${e[0]}`);
          stByField2 += 1;
        }
      }
    });

    process.stdout.write(`Number of students: ${stCount}\n`);

    process.stdout.write(`Number of students in ${FIELD}: ${stByField}. List:${LIST_OF_FIRSTNAMES}\n`);
    process.stdout.write(`Number of students in ${FIELD2}: ${stByField2}. List:${LIST_OF_FIRSTNAMES2}\n`);
  });
};

module.exports = countStudents;
