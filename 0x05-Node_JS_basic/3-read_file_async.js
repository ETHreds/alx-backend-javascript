/* eslint-disable no-unused-vars */
const fs = require('fs').promises;

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8')
      .then((fileContent) => {
        // Split the content into rows
        const rows = fileContent.trim().split('\n');

        // Parse the rows into an array of student objects
        const students = rows
          .filter((row) => row.trim() !== '') // Exclude empty lines
          .slice(1) // Exclude header row
          .map((row) => {
            const [firstname, , , field] = row.split(','); // Ignore lastname and age
            return {
              firstname, field,
            };
          });

        // Count the number of students in each field
        const fieldCounts = {};
        students.forEach((student) => {
          if (!fieldCounts[student.field]) {
            fieldCounts[student.field] = [];
          }
          fieldCounts[student.field].push(student.firstname);
        });

        // Log the number of students in each field and their first names
        console.log(`Number of students: ${students.length}`);
        Object.keys(fieldCounts).forEach((field) => {
          console.log(`Number of students in ${field}: ${fieldCounts[field].length}. List: ${fieldCounts[field].join(', ')}`);
        });

        resolve(); // Resolve the Promise once processing is complete
      })
      .catch((error) => {
        // Reject the Promise if there's an error
        reject(new Error('Cannot load the database'));
      });
  });
}
module.exports = countStudents;
