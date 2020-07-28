import axios, { AxiosResponse } from 'axios';

import { IResponse } from './types';

export const fetchBankItems = async (param: string): Promise<IResponse> => {
  try {
    const endpoint = `/getBanksListPLRequest/${param}`;
    const res: AxiosResponse<IResponse> = await axios.get(endpoint);

    return res.data;
  } catch (e) {
    return {
      isError: true,
      msg: 'Bad request',
      status: 400,
      data: [],
    };
  }
};
