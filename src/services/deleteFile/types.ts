export interface IParam {
  documentID: string;
  documentS3Key: string;
}

export interface IResponse {
  status: number;
  msg: string;
  success: {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    serverStatus: number;
    warningCount: number;
    message: string;
    protocol41: boolean;
    changedRows: number;
  };
}
