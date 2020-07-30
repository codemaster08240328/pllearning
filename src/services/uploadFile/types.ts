export interface IParam {
  file: File;
  documentType: string;
  applicationID: string;
  sourceName: string;
  filePassword: string;
}

export interface IResponse {
  status: number;
  isProtected: boolean;
  uploadDetails: {
    status: number;
    msg: string;
    responseCode: string;
    S3FileName: string;
    recordID: number;
  };
  msg: string;
}
