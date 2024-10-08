export default function getListStudentsIds(students) {
  if (Array.isArray(students)) {
    const studentsId = students.map((student) => student.id);
    return studentsId;
  }
  return [];
}
