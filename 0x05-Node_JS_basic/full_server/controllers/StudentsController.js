import { readDatabase } from '../utils.js';

class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const students = await readDatabase('../database.csv');
      const fields = Object.keys(students).sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));

      // Prepare the response message
      let responseMessage = 'This is the list of our students\n';
      fields.forEach((field) => {
        const numStudents = students[field].length;
        const studentList = students[field].join(', ');
        responseMessage += `Number of students in ${field.toUpperCase()}: ${numStudents}. List: ${studentList}\n`;
      });

      res.status(200).send(responseMessage);
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    try {
      const { major } = req.query;

      // Check if the major parameter is provided and valid
      if (!major || (major !== 'CS' && major !== 'SWE')) {
        res.status(500).send('Major parameter must be CS or SWE');
        return;
      }

      const students = await readDatabase('../database.csv');
      
      // Get the list of students for the specified major
      const studentsList = students[major] || [];

      // Prepare the response message
      const responseMessage = `List: ${studentsList.join(', ')}`;

      res.status(200).send(responseMessage);
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }
}

export default StudentsController;
