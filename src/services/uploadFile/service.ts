import axios, { AxiosResponse } from 'axios';
import { IParam, IResponse } from './types';

export const uploadFile = (param: IParam): Promise<IResponse> => {
  const formData = new FormData();
  formData.append('file', param.file);
  formData.append('documentType', param.documentType);
  formData.append('customerID', localStorage.getItem('user-id') || '0');
  formData.append('applicationID', param.applicationID);
  formData.append('sourceName', param.sourceName);
  formData.append('filePassword', param.filePassword);

  const endpoint = '/uploadDocument';
  const header = {
    'Content-Type': 'multipart/form-data',
    // 'MMK-Auth': localStorage.getItem('mmk-auth'), // production
    'MMK-Auth': 'MmkAuthKey_777608ab-1c2f-4ba6-926d-f0537ed3ae15', // development
  };

  return axios
    .post(endpoint, formData, { headers: header })
    .then((res: AxiosResponse<IResponse>) => res.data);
};
