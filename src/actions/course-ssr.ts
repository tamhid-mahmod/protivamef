import axios, { endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

export async function getCourse(id: string) {
  const URL = id ? `${endpoints.course.details}?courseId=${id}` : '';

  const res = await axios.get(URL);

  return res.data;
}

export async function getCoursesBySlug(slug: string) {
  const URL = slug ? `${endpoints.course.slug}?slug=${slug}` : '';

  const res = await axios.get(URL);

  return res.data;
}
