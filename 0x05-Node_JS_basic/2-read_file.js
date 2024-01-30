const fs = require('fs');

function countStudents(path) {
  try {
    // Read the database file synchronously
    const fileContent = fs.readFileSync(path, 'utf-8');

    // Split the content into rows
    const rows = fileContent.trim().split('\n');

    // Parse the rows into an array of student objects
    const students = rows
      .filter((row) => row.trim() !== '') // Exclude empty lines
      .slice(1) // Exclude header row
      .map((row) => {
        const [firstname, lastname, age, field] = row.split(',');
        return {
          firstname, lastname, age: +age, field,
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
  } catch (error) {
    // Throw an error if the database is not available
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
