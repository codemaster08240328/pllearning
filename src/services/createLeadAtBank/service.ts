import axios from 'axios';

export const createLeadAtBank = (appID: string) => {
  const endpoint = '/plApp/createApplication';
  const param = {
    customerID: parseInt(localStorage.getItem('user-id') || '0'),
    mobileNNumber: '8885044968',
    source: 'PL-ONLINE',
    bankCode: 'BNKPLHDFC',
    applicationID: appID,
  };

  return axios.post(endpoint, param);
};
