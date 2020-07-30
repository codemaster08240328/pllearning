import axios from 'axios';
import { IParam, IResponse } from './types';

export const getUploadedDocu = (param: IParam): Promise<IResponse> => {
  const endpoint = '/getUploadedDocumentInfo';
  const reqParam = {
    userID: parseInt(localStorage.getItem('user-id') || '0'),
    appID: param.appID,
  };

  return axios.post(endpoint, reqParam).then((res) => res.data);
};
