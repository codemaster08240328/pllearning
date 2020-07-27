import { IPLAppData } from '../../services/getPLApplication/types';

export interface ILoading {
  loading: boolean;
}

export interface IPLAppAction {
  type: string;
  payload?: IPLAppData;
}
