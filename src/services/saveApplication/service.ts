import axios, { AxiosResponse } from 'axios';
import { IResponse, IParam } from './types';

export const savePLApplicationDetails = (param: IParam): Promise<IResponse> => {
  const endpoint = '/personalLoan/savePersonalLoanRequest';

  return axios
    .post(endpoint, param)
    .then((res: AxiosResponse<IResponse>) => res.data);
};
