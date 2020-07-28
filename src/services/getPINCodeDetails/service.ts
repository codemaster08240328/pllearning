import axios, { AxiosResponse } from 'axios';

import { IResponse } from './types';

export const getPINCodeDetail = async (param: string): Promise<IResponse> => {
  const endpoint = `/profile/pincodesInfo/${param}`;
  try {
    const res: AxiosResponse<IResponse> = await axios.get(endpoint);
    return res.data;
  } catch (e) {
    return e.response.data;
  }
};
