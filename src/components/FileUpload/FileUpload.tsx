import React, { useState, useRef, MouseEvent } from 'react';
import { IProps, Event } from './types';
import { UploadIcon, CircledCloseIcon, AlertIcon } from '../Icons';

import PDFViewer from 'pdf-viewer-reactjs';

import './style.scss';

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
        console.log(res);
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
    setFile(undefined);
    setfilecontent('');
    setcomponentError(false);

    if (onChange) {
      onChange(undefined);
    }
  };

  const reviewClick = (e: MouseEvent) => {
    e.stopPropagation();
    console.log(file?.type);
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
      {/* {filecontent && <PDFViewer document={{ base64: filecontent }} />} */}
      {filecontent && <img src={filecontent} />}
      {/* {file && (
        <embed src={URL.createObjectURL(file)} className="preview-docu" />
      )} */}
    </>
  );
};

export default FileUpload;
