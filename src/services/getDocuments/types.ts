export interface IParam {
  appID: string | null;
}

export type TDocumentInfo = {
  documentID: number | null;
  documentName: string | null;
  documentType: string | null;
  documentSubType: string | null;
  encryptionType: string | null;
  decryptedDocumentKey: string | null;
  encryptedDocumentKey: string | null;
  uploadedBy: string | null;
  uploadedOn: string | null;
  encryptionName: string | null;
};

export interface IResponse {
  status: number;
  msg: string;
  message: string;
  documentInfo: Array<TDocumentInfo>;
}
