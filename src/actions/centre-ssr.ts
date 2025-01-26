import axios, { endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

export async function getCentre(id: string) {
  const URL = id ? `${endpoints.centre.details}?centreId=${id}` : '';

  const res = await axios.get(URL);

  return res.data;
}

// ----------------------------------------------------------------------

export async function getCentresByDivisionAndDistrict(divisionId: string, districtId: string) {
  const params = new URLSearchParams({
    divisionId,
    districtId,
  });

  const URL =
    divisionId && districtId ? `${endpoints.centre.listByDivisionAndDistrict}?${params}` : '';

  const res = await axios.get(URL);

  return res.data;
}

// ----------------------------------------------------------------------

export async function getCoursesByCentre(centreId: string) {
  const params = new URLSearchParams({
    centreId,
  });

  const URL = centreId ? `${endpoints.centre.listCoursesByCentre}?${params}` : '';

  const res = await axios.get(URL);

  return res.data;
}
