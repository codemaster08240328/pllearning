export interface ICompanyList {
  seqNo: number | null;
  companyName: string | null;
  companySearchString: string | null;
  cin: string | null;
  bnkplhdfc: string | null;
  bnkplicici: string | null;
  bnkplidfc: string | null;
  bnkplbjfnsrv: string | null;
  bnkplsbfc: string | null;
  bnkplrbl: string | null;
  bnkplftn: string | null;
  createdOn: string | null;
  updatedOn: string | null;
  type: string | null;
  isActive: number | null;
  createdByUser: string | null;
}

export interface IResponse {
  error: boolean;
  status: number | null;
  message: string | null;
  data: Array<ICompanyList>;
}
