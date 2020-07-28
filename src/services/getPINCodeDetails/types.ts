export interface IPinDetail {
  state: string | null;
  district: string | null;
  city: string | null;
}

export interface IResponse {
  error: boolean;
  status: number | null;
  message: string | null;
  data: IPinDetail;
}
