import axios from 'axios';

export const submitPLOnline = (appID: string) => {
  const endpoint = '/submitApplicationPlOnline';

  const param = {
    isEligible: 1,
    applicationID: appID,
    customerID: parseInt(localStorage.getItem('user-id') || '0'),
    crmProgressRank: 2,
    crmProgressStatus: 'ACCEPTED',
    errorCode: '',
    errorComments: '',
  };

  return axios.post(endpoint, param);
};
