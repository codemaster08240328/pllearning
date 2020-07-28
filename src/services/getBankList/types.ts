export interface IBankOption {
  bankName: string | null;
  bankCode: string | null;
}

export interface IResponse {
  status: number | null;
  isError: boolean;
  data: Array<IBankOption>;
  msg: string | null;
}
