const http = require('http');
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

        resolve({ students, fieldCounts });
      })
      .catch((error) => {
        // Reject the Promise if there's an error
        reject(new Error('Cannot load the database'));
      });
  });
}

// Create the HTTP server
const app = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  // Handle requests based on the URL path
  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    // Call the countStudents function to get the student list asynchronously
    countStudents(process.argv[2])
      .then(({ students, fieldCounts }) => {
        let responseContent = 'This is the list of our students\n';
        responseContent += `Number of students: ${students.length}\n`;
        Object.keys(fieldCounts).forEach((field) => {
          responseContent += `Number of students in ${field}: ${fieldCounts[field].length}. List: ${fieldCounts[field].join(', ')}\n`;
        });

        // Send the response
        res.end(responseContent);
      })
      .catch((error) => {
        res.statusCode = 500;
        res.end(`Error: ${error.message}`);
      });
  } else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
});

// Start the HTTP server and make it listen on port 1245
const PORT = 1245;
app.listen(PORT, () => {});
