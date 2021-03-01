import React, {useMemo} from 'react';
import {useDropzone} from 'react-dropzone';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function FileUpload(props) {
  const [files,setFiles] = React.useState([])

  const onDrop = React.useCallback((accFiles, rejFiles) => {
    const mappedAcc = accFiles.map((file) => ({ file,errors:[] }));
    // setFiles((curr) => [...curr, ...mappedAcc, ...rejFiles]);
    // setFiles([...mappedAcc, ...rejFiles])
    
    
    for (const pair of Object.entries(mappedAcc)) {
      setFiles(pair[1].file.path)
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({onDrop,
    accept: ['image/*', 'video/*', '.pdf'],
                    maxSize: 300 * 1024, // 300KB
                  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  return (
    <div className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} onChange={props.handlefileChange} id={props.label} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {files}
    </div>
  );
}

export default FileUpload