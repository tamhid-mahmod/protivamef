import axios, { endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

export async function getStudent(id: string) {
  const URL = id ? `${endpoints.student.details}?studentId=${id}` : '';

  const res = await axios.get(URL);

  return res.data.json;
}
