import axios, { endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

export async function getCentre(id: string) {
  const URL = id ? `${endpoints.centre.details}?centreId=${id}` : '';

  const res = await axios.get(URL);

  return res.data;
}
