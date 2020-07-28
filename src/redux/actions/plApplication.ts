import * as Redux from 'redux';
import _ from 'lodash';
import { FETCH_PL_APPLICATION, FETCH_PL_APPLICATION_SUCCESS } from './actions';
import { getPLApplicationDetails } from 'services/getPLApplication/service';
import { savePLApplicationDetails } from 'services/saveApplication/service';
import { IPLAppAction } from '../reducers/types';
import { IPLAppData } from 'services/getPLApplication/types';
import { IParam } from 'services/saveApplication/types';
import { IPLAppState } from '../reducers';

const fetchApplicationSuccess = (res: IPLAppData): IPLAppAction => ({
  type: FETCH_PL_APPLICATION_SUCCESS,
  payload: { ...res },
});

export const fetchApplication = () => (dispatch: Redux.Dispatch) => {
  getPLApplicationDetails().then((res) => {
    dispatch(fetchApplicationSuccess(res));
  });
};

export const saveApplication = (param: IParam) => (
  dispatch: Redux.Dispatch,
  getState: () => IPLAppState
) => {
  dispatch({
    type: FETCH_PL_APPLICATION,
  });

  const plApplication = getState().plApplicationDetail;
  const params = {
    ...plApplication.data.list.applicationDetails,
    addressInformation: plApplication.data.list.addressInformationDetails,
    emailAddresses: plApplication.data.list.emailInformationDetails,
    businessRegistrationNames:
      plApplication.data.list.businessRegistrationDetails,
    isNewApplication: plApplication.data.list.isNewApp,
    businessRegistrationType: null, // TODO: should check with BE team
    fastTrackPoint: true, // TODO: should check with BE team
    nonPreferredSalaryCreditedBank: null, // TODO: should check with BE team
    ...param,
  };

  const updatedPlApplication = _.merge(plApplication, {
    data: {
      list: {
        applicationDetails: param,
      },
    },
  });

  savePLApplicationDetails(params).then((res) => {
    dispatch(fetchApplicationSuccess(updatedPlApplication));
  });
};

export const addAddress = (param: IParam) => (
  dispatch: Redux.Dispatch,
  getState: () => IPLAppState
) => {
  // dispatch({
  //   type: FETCH_PL_APPLICATION,
  // });

  const plApplication = getState().plApplicationDetail;

  const params = {
    ...plApplication.data.list.applicationDetails,
    addressInformation: plApplication.data.list.addressInformationDetails.concat(
      param.addressInformation || [
        {
          seqNo: null,
          city: null,
          state: null,
          isActive: null,
          addressType: null,
          addressLine1: null,
          addressLine2: null,
          zipCode: null,
          source: null,
        },
      ]
    ),
  };

  const updatedPlApplication = _.merge(plApplication, {
    data: {
      list: {
        addressInformationDetails: param.addressInformation,
      },
    },
  });

  savePLApplicationDetails(params).then((res) => {
    dispatch(fetchApplicationSuccess(updatedPlApplication));
  });
};
