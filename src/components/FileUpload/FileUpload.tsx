import React, { useState, useRef, MouseEvent } from 'react';
import { IProps, Event } from './types';
import { UploadIcon, CircledCloseIcon, AlertIcon, CloseIcon } from '../Icons';

import './style.scss';
import { Modal } from 'components/Modal';
import Button from 'components/Button';

const getBase64 = (file: File) =>
  new Promise<string>((resolve, rejects) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString());
    reader.onerror = (error) => rejects(error);
  });

const FileUpload: React.FC<IProps> = ({
  error,
  onChange,
  accept,
  className: componentClassName,
  size,
}) => {
  const [file, setFile] = useState<File>();
  const [filecontent, setfilecontent] = useState<string>();
  const [componentError, setcomponentError] = useState(false);
  const [preview, setpreview] = useState(false);
  const [openDeleteModal, setopenDeleteModal] = useState(false);

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  let className = 'mmk-file-upload ';
  className += !!error || componentError ? 'mmk-file-upload-error ' : '';
  className += componentClassName || '';

  const handleChange = (event: Event<HTMLInputElement>) => {
    const fileUploaded = event.target.files ? event.target.files[0] : undefined;
    const limitSize: number = size || 5; // default file limit size 5mb

    setFile(fileUploaded);

    fileUploaded &&
      getBase64(fileUploaded).then((res: string) => {
        setfilecontent(res);
      });

    if (!!fileUploaded && fileUploaded.size > 1048576 * limitSize) {
      setcomponentError(true);
      return;
    } else {
      setcomponentError(false);
    }

    if (onChange) {
      onChange(fileUploaded);
    }
  };

  const cancelSelect = (e: MouseEvent) => {
    e.stopPropagation();
    setopenDeleteModal(true);
  };

  const reviewClick = (e: MouseEvent) => {
    e.stopPropagation();
    setpreview(true);
  };

  const okDelete = () => {
    setFile(undefined);
    setfilecontent('');
    setcomponentError(false);

    if (onChange) {
      onChange(undefined);
    }
    setopenDeleteModal(false);
  };

  const cancelDelete = () => {
    setopenDeleteModal(false);
  };

  return (
    <>
      <div
        className={className}
        onClick={() => {
          hiddenFileInput.current?.click();
        }}
      >
        {!file && <span className="placeholder">Upload...</span>}
        {!!file && <span className="input-value">{file.name}</span>}

        {!file && <UploadIcon color="#3ba3ff" />}
        {!!file && (
          <div className="file-upload-action">
            <span onClick={reviewClick}>Review</span>
            <div onClick={cancelSelect} style={{ display: 'flex' }}>
              <CircledCloseIcon />
            </div>
          </div>
        )}

        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleChange}
          className="mmk-file-upload-input"
          accept={accept || ''}
        />
      </div>
      {componentError && (
        <div className="file-upload-error-wrapper">
          <AlertIcon color="#d54c4c" />
          <div className="file-upload-error-wrapper-txt">
            Your file has reached the limit 4mb. Please try again.
          </div>
        </div>
      )}
      {preview && (
        <div className="preview-docu">
          <div className="preview-action" onClick={() => setpreview(false)}>
            <CloseIcon />
          </div>
          <div className="preview-content">
            <embed src={filecontent} type={file?.type} width="100%" />
          </div>
        </div>
      )}

      {openDeleteModal && (
        <Modal>
          <div
            onClick={() => setopenDeleteModal(false)}
            className="mmk-company-modal-close"
          >
            <CloseIcon />
          </div>

          <h3 className="mmk-company-modal-title align-center">
            Are you sure you want to delete this file?
          </h3>

          <div className="delete-modal-actions">
            <Button
              text="YES"
              type="ghost"
              className="yes-button"
              onClick={okDelete}
            />
            <Button
              text="NO"
              type="ghost"
              className="no-button"
              onClick={cancelDelete}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default FileUpload;
