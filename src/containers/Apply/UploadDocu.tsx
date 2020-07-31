import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import FileUpload from 'components/FileUpload';
import {
  ArrowIcon,
  InfoIcon,
  RunIcon,
  CloseIcon,
  CircledPlusIcon,
  BackIcon,
  CircledCheckIcon,
} from 'components/Icons';
import Button from 'components/Button';
import { BottomModal, Modal } from 'components/Modal';
import StepFlow from 'components/StepFlow';
import { TRouterParam } from './types';

import { uploadFile } from 'services/uploadFile/service';
import { IParam as IUploadParam } from 'services/uploadFile/types';
import { deleteFile } from 'services/deleteFile/service';
import { IParam as IDeleteParam } from 'services/deleteFile/types';

import SmallUploadDocu from 'assets/document-upload.png';
import MediumUploadDocu from 'assets/document-upload@2x.png';
import LargeUploadDocu from 'assets/document-upload@3x.png';

import SmallDropIcon from 'assets/dropped.png';
import MediumDropIcon from 'assets/dropped@2x.png';
import LargeDropIcon from 'assets/dropped@3x.png';
import { IPLAppData } from 'services/getPLApplication/types';
import { ILoading } from 'redux/reducers/types';
import { IPLAppState } from 'redux/reducers';
import Loading from 'components/Loading';

type TProps = {
  title: string;
  onOpen?: (v: boolean) => void;
};

type StateProps = {
  plApplication: IPLAppData & ILoading;
};

type TDocuItem = {
  [key: string]: string;
};

const addressTypes = [
  'VOTER ID',
  'AADHAAR CARD',
  'PASSPORT',
  'DRIVING LICENSE',
  'GAS BILL',
  'ELECTRICITY BILL',
  'RENTAL AGREEMENT',
  'LIC POLICY',
  'COMPANY ACCOMODATION PROOF',
  'POST PAID MOBILE BILL',
];

export const docuTypes = [
  'panCard',
  'salarySlip',
  'bankStatement',
  'addressProof',
];

const DocuItem: React.FC<TProps> = ({ title, onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="mmk-upload-docu-item mt-24"
      onClick={() => {
        setIsOpen(!isOpen);
        onOpen && onOpen(!isOpen);
      }}
    >
      <div className="mmk-upload-docu-item-title">{title}</div>
      <ArrowIcon direction={isOpen ? 'up' : 'down'} />
    </div>
  );
};

const UploadDocu: React.FC<StateProps> = ({ plApplication }) => {
  const [openIncome, setopenIncome] = useState(false);
  const [uploadedDocs, setuploadedDocs] = useState<Array<TDocuItem>>([]);
  const [openModal, setopenModal] = useState(false);
  const [addressType, setaddressType] = useState('');
  const [openSkipModal, setopenSkipModal] = useState(false);
  const [salarySlips, setsalarySlips] = useState(['']);
  const [bankstatements, setbankstatements] = useState(['']);
  const [loading, setloading] = useState(false);
  const { type } = useParams<TRouterParam>();

  const history = useHistory();

  const actionComplete = (type: string) => {
    const docs = uploadedDocs.filter((item) => item.docuType.includes(type));

    return docs.length;
  };

  const checkDisable = () => {
    let res = false;

    docuTypes.forEach((type) => {
      const docs = uploadedDocs.filter((item) => item.docuType.includes(type));
      res = res || !docs.length;
    });

    return res;
  };

  const uploadDocu = (file: File | undefined, type: string) => {
    setloading(true);
    if (!!file) {
      const param: IUploadParam = {
        file: file,
        documentType: type,
        sourceName: 'PLONLINE',
        filePassword: '',
        applicationID: (plApplication.data.list.appID || '').toString(),
      };

      uploadFile(param).then((res) => {
        if (!res.isProtected) {
          setloading(false);
          setuploadedDocs([
            ...uploadedDocs,
            {
              docuType: type,
              docID: res.uploadDetails.recordID.toString(),
              s3key: res.uploadDetails.S3FileName,
            },
          ]);
        }
      });
    } else {
      const file = uploadedDocs.filter((item) => item.docuType === type)[0];
      const param: IDeleteParam = {
        documentID: file.docID,
        documentS3Key: file.s3key,
      };

      deleteFile(param).then((res) => {
        setloading(false);
      });
    }
  };

  return (
    <>
      <Link
        to={type === 'short' ? '/apply/9/short' : '/apply/14'}
        className="go-back"
      >
        <BackIcon size={24} />
      </Link>
      <StepFlow
        total={type === 'short' ? 10 : 15}
        step={type === 'short' ? 10 : 15}
      />
      <div className="mmk-upload-docu">
        <img
          className="mmk-upload-docu-img"
          src={SmallUploadDocu}
          alt="upload document img"
          srcSet={`${MediumUploadDocu}, ${LargeUploadDocu}`}
        />
        <h3 className="color-text-blue-dark mt-16">Hardwork pays</h3>
        <div className="mmk-upload-docu-desc">
          Uploading documents makes it easier to process your application.
        </div>

        <label className="mt-16">
          Please only upload JPEG, JPG, and PDF files which are less than 4 mb.
        </label>

        <div className="mmk-upload-docu-items">
          <div className="mmk-upload-docu-upload-item">
            <div className="mmk-upload-docu-item-label">
              <label className="mr-8">1. PAN Card</label>
              {!!actionComplete(docuTypes[0]) && (
                <CircledCheckIcon checked color="#37d47e" size={16} />
              )}
            </div>
            <FileUpload
              onChange={(file) => uploadDocu(file, docuTypes[0])}
              accept=".pdf,.jpeg,.jpg"
              className="mt-8"
              size={4}
            />
            <div className="mmk-upload-docu-item-label mt-24">
              <label className="mr-8">2. Last 3 months salary slip</label>

              {!!actionComplete(docuTypes[1]) && (
                <CircledCheckIcon checked color="#37d47e" size={16} />
              )}
            </div>
            {salarySlips.map((item, index) => (
              <FileUpload
                className="mt-8"
                accept=".pdf,.jpeg,.jpg"
                key={index.toString()}
                onChange={(file) =>
                  uploadDocu(file, `${docuTypes[1]}-${index}`)
                }
              />
            ))}
            <div
              className="mmk-address-add"
              onClick={() => setsalarySlips([...salarySlips, ''])}
            >
              <h6>ADD MORE DOCUMENTS</h6>
              <CircledPlusIcon color="#3ba3ff" />
            </div>
            <div className="mmk-upload-docu-item-label mt-8">
              <label className="mr-8">3. Bank Statement</label>
              {!!actionComplete(docuTypes[2]) && (
                <CircledCheckIcon checked color="#37d47e" size={16} />
              )}
            </div>
            {bankstatements.map((item, index) => (
              <FileUpload
                className="mt-8"
                accept=".pdf,.jpeg,.jpg"
                key={index.toString()}
                onChange={(file) =>
                  uploadDocu(file, `${docuTypes[2]}-${index}`)
                }
              />
            ))}
            <div className="mmk-upload-docu-accordion-desc">
              <InfoIcon color="#999" />
              <div>Last 90 days</div>
            </div>
            <div
              className="mmk-address-add"
              onClick={() => setbankstatements([...bankstatements, ''])}
            >
              <h6>ADD MORE DOCUMENTS</h6>
              <CircledPlusIcon color="#3ba3ff" />
            </div>
            <div className="mmk-upload-docu-item-label mt-8">
              <label className="mr-8">4. Current address proof</label>
              {!!actionComplete(docuTypes[3]) && (
                <CircledCheckIcon checked color="#37d47e" size={16} />
              )}
            </div>
            <div
              className="mmk-company-type mt-8"
              onClick={() => setopenModal(!openModal)}
            >
              <div>
                <span className="mmk-company-type-value">{addressType}</span>
                {!addressType && (
                  <span className="mmk-company-type-placeholder">
                    Select address type
                  </span>
                )}
              </div>
              <div>
                <ArrowIcon direction="down" />
              </div>
            </div>
            <FileUpload
              className="mt-16"
              accept=".pdf,.jpeg,.jpg"
              onChange={(file) => uploadDocu(file, docuTypes[3])}
            />
            <div className="mmk-upload-docu-accordion-desc">
              <InfoIcon color="#999" />
              <div>
                Address mentioned should be same as current residential address
              </div>
            </div>
          </div>

          <DocuItem title="Optional" onOpen={(v) => setopenIncome(v)} />
          {openIncome && (
            <div className="mmk-upload-docu-accordion">
              <label htmlFor="">Company ID card (recommended)</label>
              <FileUpload className="mt-8" accept=".pdf,.jpeg,.jpg" />
              <div className="mmk-upload-docu-accordion-desc">
                <RunIcon color="#3ba3ff" />
                <div>
                  Providing Compnay ID card may help waive physical address
                  verification
                </div>
              </div>

              <label className="mt-16" htmlFor="">
                Form 16 (optional)
              </label>
              <FileUpload className="mt-8" accept=".pdf,.jpeg,.jpg" />

              <label className="mt-16" htmlFor="">
                Appointment letter (optional)
              </label>
              <FileUpload className="mt-8" accept=".pdf,.jpeg,.jpg" />
            </div>
          )}
          <Button
            text="REVIEW"
            disabled={checkDisable()}
            onClick={() => history.push(`/application-summary/${type}`)}
          />
          <div
            onClick={() => setopenSkipModal(true)}
            className="mmk-upload-docu-skip"
          >
            SKIP
          </div>
        </div>
        {openModal && (
          <BottomModal>
            <div
              onClick={() => setopenModal(false)}
              className="mmk-company-modal-close"
            >
              <CloseIcon />
            </div>
            <h3 className="mmk-company-modal-title">Address Proof Type</h3>
            <div className="mmk-company-modal-types">
              {addressTypes.map((item, index) => (
                <div
                  onClick={() => {
                    setaddressType(item);
                    setTimeout(() => setopenModal(false), 100);
                  }}
                  className="mmk-loan-duration-item"
                  key={index.toString()}
                >
                  {item}
                </div>
              ))}
            </div>
          </BottomModal>
        )}
        {openSkipModal && (
          <Modal>
            <div
              onClick={() => setopenSkipModal(false)}
              className="mmk-company-modal-close"
            >
              <CloseIcon />
            </div>
            <img
              className="mt-16"
              src={SmallDropIcon}
              width="72"
              height="72"
              srcSet={`${MediumDropIcon}, ${LargeDropIcon}`}
            />
            <h3 className="mmk-company-modal-title">Are you sure?</h3>
            <div className="mmk-bank-salary-modal-content">
              You will get an opportunity to review your application
            </div>
            <div className="mt-16 mb-24 mmk-bank-salary-modal-gold-loan">
              <Button
                onClick={() => setopenSkipModal(false)}
                text="CONTINUE UPLOAD"
              />
              <div
                onClick={() => history.push(`/application-saved`)}
                className="mmk-upload-docu-skip"
              >
                SAVE & CONTINUE LATER
              </div>
              <div
                onClick={() => history.push(`/application-summary/${type}`)}
                className="mmk-upload-docu-skip"
              >
                SKIP AND REVIEW
              </div>
            </div>
          </Modal>
        )}
      </div>
      {loading && <Loading />}
    </>
  );
};

const mapStateToProps = (action: IPLAppState): StateProps => {
  return { plApplication: action.plApplicationDetail };
};

export default connect(mapStateToProps)(UploadDocu);
