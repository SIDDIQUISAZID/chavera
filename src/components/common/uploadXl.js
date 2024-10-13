import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ExcelDropzone = ({ onExcelUpload }) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the accepted files
    onExcelUpload(acceptedFiles);
  }, [onExcelUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: '.xlsx, .xls',
    onDrop,
  });

  return (
    <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
      <input {...getInputProps()} />
      <p>Drag & drop Excel files here, or click to select files</p>
    </div>
  );
};

export default ExcelDropzone;
