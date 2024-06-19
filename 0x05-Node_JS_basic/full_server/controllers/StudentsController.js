/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import path from 'path';
import readDatabase from '../utils';

class StudentsController {
  static getAllStudents(_req, res) {
    const csvFileName = 'database.csv'; // Name of your CSV file
    const csvFilePath = path.resolve(process.cwd(), csvFileName);
    readDatabase(csvFilePath)
      .then((data) => {
        let brief = 'This is the list of our students\n';
        const fields = Object.keys(data)
          .sort((a, b) => a.toLocaleLowerCase().localeCompare(b.toLowerCase()));
        fields.forEach((field) => {
          const students = data[field];
          brief += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`;
        });
        return res.status(200).send(brief.trim());
      })
      .catch((_error) => res.status(500).send('Cannot load the database'));
  }

  static getAllStudentsByMajor(req, res) {
    const { major } = req.params;
    if (major !== 'CS' && major !== 'SWE') {
      return res.status(500).send('Major parameter must be CS or SWE');
    }
    const csvFileName = 'database.csv'; // Name of your CSV file
    const csvFilePath = path.resolve(process.cwd(), csvFileName);
    readDatabase(csvFilePath)
      .then((data) => {
        const LIST_OF_FIRSTNAMES_IN_THE_FIELD = data[major].join(', ') || [];
        return res.status(200).send(`List: ${LIST_OF_FIRSTNAMES_IN_THE_FIELD}`);
      })
      .catch((_error) => res.status(500).send('Cannot load the database'));
  }
}

export default StudentsController;
