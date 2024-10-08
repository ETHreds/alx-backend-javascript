export default function updateStudentGradeByCity(students, city, newGrades) {
  return students
    .filter((student) => student.location === city)// listof students from the provided city
    .map((student) => {
      const gradeInfo = newGrades
        .find((grade) => grade.studentId === student.id); // grade corresponding with student id
      return {
        ...student,
        grade: gradeInfo ? gradeInfo.grade : 'N/A', // if grade is avaiilable add it to tyhe obkect if not N/A
      };
    });
}
