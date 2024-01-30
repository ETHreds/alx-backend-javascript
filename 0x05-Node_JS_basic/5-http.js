const http = require('http');
const countStudents = require('./3-read_file_async');
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
