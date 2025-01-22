import axios, { endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

export async function getCourse(id: string) {
  const URL = id ? `${endpoints.course.details}?courseId=${id}` : '';

  const res = await axios.get(URL);

  return res.data;
}
