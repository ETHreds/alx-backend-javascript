export default function getStudentsByLocation(students, city) {
  const studentFromCity = students.filter((student) => student.location === city);
  return studentFromCity;
}
