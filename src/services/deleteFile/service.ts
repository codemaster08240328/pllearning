import axios, { AxiosResponse } from 'axios';
import { IParam, IResponse } from './types';

export const deleteFile = (param: IParam): Promise<IResponse> => {
  const endpoint = '/deleteDocument';
  return axios
    .post(endpoint, param)
    .then((res: AxiosResponse<IResponse>) => res.data);
};
