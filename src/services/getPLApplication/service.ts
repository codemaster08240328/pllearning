import axios, { AxiosResponse } from 'axios';
import { IPLAppData, IParam } from './types';

export const getPLApplicationDetails = (): Promise<IPLAppData> => {
  const endpoint = '/personalLoan/getPersonalLoanRequest';

  const param: IParam = {
    customerID: parseInt(localStorage.getItem('user-id') || '0'),
    campaignCode: localStorage.getItem('campaign-code') || '',
  };

  return axios
    .post(endpoint, param)
    .then((res: AxiosResponse<IPLAppData>) => res.data);
};
