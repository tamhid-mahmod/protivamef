import axios, { endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

export async function getDistrictsByDivision(divisionId: string) {
  const URL = divisionId ? `${endpoints.district.listByDivision}?divisionId=${divisionId}` : '';

  const res = await axios.get(URL);

  return res.data;
}
