import axios, { endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

export async function getCategory(id: string) {
  const URL = id ? `${endpoints.category.details}?categoryId=${id}` : '';

  const res = await axios.get(URL);

  return res.data;
}
