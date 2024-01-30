/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
const express = require('express');
const fs = require('fs').promises;

const app = express();
const PORT = 1245;

function countStudents(fileName) {
  const students = {};
  const fields = {};
  let length = 0;

  return fs.readFile(fileName, 'utf-8')
    .then((fileContent) => {
      const lines = fileContent.trim().split('\n');
      for (let i = 1; i < lines.length; i++) { // Start from 1 to exclude header
        if (lines[i].trim() !== '') {
          length += 1;
          const [firstname, , , field] = lines[i].split(',');
          if (!students[field]) {
            students[field] = [];
          }
          students[field].push(firstname);
          fields[field] = (fields[field] || 0) + 1;
        }
      }
      return { students, fields, length };
    })
    .catch((error) => {
      throw new Error('Cannot load the database');
    });
}

// Define routes
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const fileName = process.argv[2]; // Read the file name from command-line arguments
  if (!fileName) {
    return res.status(400).send('Error: Please provide the database file name.');
  }

  countStudents(fileName)
    .then(({ students, fields, length }) => {
      let responseText = 'This is the list of our students\n';
      for (const [field, studentList] of Object.entries(students)) {
        responseText += `Number of students in ${field}: ${studentList.length}. List: ${studentList.join(', ')}\n`;
      }
      res.send(responseText);
    })
    .catch((error) => {
      res.status(500).send('Error: Cannot load the database');
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
