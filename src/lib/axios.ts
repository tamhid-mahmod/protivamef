import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CONFIG.serverUrl });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  centre: {
    details: '/api/centre/centreDetails',
    listByDivisionAndDistrict: '/api/centre/getCentresByDivisionAndDistrict',
    listCoursesByCentre: '/api/centre/getCoursesByCentre',
  },
  category: {
    details: '/api/category/getCategoryDetails',
  },
  course: {
    details: '/api/course/getCourseDetails',
    slug: '/api/course/getCoursesBySlug',
  },
  district: {
    listByDivision: '/api/district/getDistrictsByDivision',
  },
  student: {
    details: '/api/student/studentDetails',
  },
};
