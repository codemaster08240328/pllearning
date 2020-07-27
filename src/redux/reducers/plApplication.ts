import * as actions from '../actions/actions';
import { IPLAppData } from '../../services/getPLApplication/types';
import { IPLAppAction, ILoading } from './types';

export const initAppData = {
  list: {
    appID: null,
    isNewApp: false,
    isApplicationFinished: false,
    isFintechEligibility: null,
    applicationDetails: {
      seqNo: null,
      addressLine1: null,
      addressLine2: null,
      state: null,
      city: null,
      zipCode: null,
      currResidenceSince: null,
      residenceType: null,
      employmentType: null,
      organizationType: null,
      employerName: null,
      workExpInCurrentOrg: null,
      totalWorkExp: null,
      netMonthlySalary: null,
      salaryCreditBank: null,
      businessType: null,
      businessName: null,
      totalBussTenure: null,
      itrCount: null,
      grossAnnualTurnover: null,
      grossAnnualProfit: null,
      requiredPLAmount: null,
      hasObligations: null,
      createdOn: null,
      createdBy: null,
      updatedOn: null,
      updatedBy: null,
      leadQueueCode: null,
      emiEligibility: null,
      customerID: null,
      applicationID: null,
      matchedBank: null,
      errorCode: null,
      errorComments: null,
      panCardUploaded: null,
      addressProofUploaded: null,
      addressProofType: null,
      salariedPaySlipsUploaded: null,
      salariedBankStatementsUploaded: null,
      itrFileUploaded: null,
      businessRegistrationUploaded: null,
      businessPremises: null,
      gstRegistered: null,
      businessRegProof: null,
      yrsAtCurrentCity: null,
      otherIncome: null,
      salaryType: null,
      isSubmitted: null,
      migratedtoCRM: null,
      netAnnualProfit: null,
      residenceOwned: null,
      preferredContactMode: null,
      scheduledDateTime: null,
      lastUserPosition: null,
      submittedOn: null,
      salaryCreditedBankType: null,
      employerType: null,
      callBackDateTime: null,
      canCallAnyTime: null,
      isCallRightNow: null,
      crmProgressRank: null,
      crmProgressStatus: null,
      recordToSync: null,
      isEligible: null,
      lastPosition: null,
      mobileNumber: null,
      creditScore: null,
      errCreditReportCount: null,
      dateofBirth: null,
      panNumber: null,
      firstName: null,
      lastName: null,
      middleName: null,
      pincode: null,
      dateOfLatestCreditScore: null,
      dateOfFirstCreditScore: null,
      leadCategory: null,
      hdfcSavingsAccount: null,
      repayableYears: null,
      yrsAtCurrentResidence: null,
      noOfDependants: null,
      educationalQualification: null,
    },
    businessRegistrationDetails: [],
    addressInformationDetails: [
      {
        addressLine1: null,
        addressLine2: null,
        city: null,
        state: null,
        zipCode: null,
        addressType: null,
        seqNo: null,
        isActive: null,
        source: null,
      },
    ],
    emailInformationDetails: [
      {
        emailAddress: null,
        emailType: null,
        source: null,
        seqNo: null,
        isActive: null,
      },
    ],
  },
};

const initialState: IPLAppData & ILoading = {
  loading: false,
  error: false,
  status: 200,
  message: 'no message',
  data: initAppData,
};

export function plApplication(
  state = initialState,
  action: IPLAppAction
): IPLAppData & ILoading {
  switch (action.type) {
    case actions.FETCH_PL_APPLICATION:
      return {
        ...state,
        loading: true,
      };

    case actions.FETCH_PL_APPLICATION_SUCCESS:
      return { ...state, ...action.payload, loading: false };

    default:
      return state;
  }
}
