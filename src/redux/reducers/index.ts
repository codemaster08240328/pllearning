import { combineReducers } from 'redux';
import { plApplication } from './plApplication';
import { IPLAppData } from '../../services/getPLApplication/types';
import { ILoading } from './types';

export interface IPLAppState {
  plApplicationDetail: IPLAppData & ILoading;
}

export default combineReducers({
  plApplicationDetail: plApplication,
});
