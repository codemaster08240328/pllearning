import axios, { AxiosResponse } from 'axios';
import { IResponse } from './types';

export const getCompanyList = async (param: string): Promise<IResponse> => {
  try {
    const endpoint = `/personalLoan/hdfc/companiesList/${param}`;
    const res: AxiosResponse<IResponse> = await axios.get(endpoint);

    return res.data;
  } catch (e) {
    return {
      error: true,
      status: 400,
      message: 'Bad Request',
      data: [],
    };
  }
};
