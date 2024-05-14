import { useEffect, useState, useCallback } from "react";
import convertFromHeic from "heic-convert";
import "./styles.css";
import Dropzone from "./Dropzone";

const convertHeicFileToPng = async (file: File) => {
  const inputBuffer = new Uint8Array(await file.arrayBuffer());

  const outputBuffer = await convertFromHeic({
    buffer: inputBuffer, // the HEIC file buffer
    format: "PNG" // output format
  });

  return new Blob([outputBuffer], { type: "image/png" });
};

export default function App() {
  const [src, setSrc] = useState("");
  const [data, setData] = useState<Blob | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // Do something with the files
    console.log(acceptedFiles);
    const file = acceptedFiles[0];
    setData(null);

    if (file.type === "image/heic" || file.type === "image/heif") {
      setData(await convertHeicFileToPng(file));
    } else {
      setData(file);
    }
  }, []);

  useEffect(() => {
    if (!data) {
      setSrc("");
      return;
    }
    setSrc(URL.createObjectURL(data));
    return () => {};
  }, [data]);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(src);
    };
  }, [src]);

  return (
    <div className="App">
      <h1>HEIC reader</h1>
      <Dropzone onDrop={onDrop} />
      <br />
      {src && <img src={src} width={300} alt="dropzone proessing result" />}
    </div>
  );
}
