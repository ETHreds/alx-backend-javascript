/* eslint-disable no-plusplus */
// full_server/utils.js
import fs from 'fs';

function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (error, data) => {
      if (error) {
        reject(error); // Reject the promise with the error
      } else {
        const students = {};
        const lines = data.trim().split('\n');

        for (let i = 1; i < lines.length; i++) { // Start from 1 to exclude header
          if (lines[i].trim() !== '') {
            const [firstname, , , field] = lines[i].split(',');
            if (!students[field]) {
              students[field] = [];
            }
            students[field].push(firstname);
          }
        }

        resolve(students);
      }
    });
  });
}

export default readDatabase;
