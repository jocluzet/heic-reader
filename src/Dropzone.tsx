import { useDropzone } from "react-dropzone";

export interface IDropzoneProps {
  onDrop: (files: File[]) => void;
}

export default function Dropzone({ onDrop }: IDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "image/heic": [],
      "image/heif": []
    }
  });

  return (
    <div style={{ border: "1px solid black" }} {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}
