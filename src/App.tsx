import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import WatermarkPreView from "./WatermarkPreView";

const DropzoneContainer = styled.section`
  border: 2px dashed #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
`;

function useLoadedImage(file: File | null) {
  const [loaded, setLoaded] = useState<{
    file: File;
    image: HTMLImageElement;
  } | null>(null);

  useEffect(() => {
    if (!file) return;
    let active = true;
    const objectUrl = URL.createObjectURL(file);
    const loadedImage = new Image();

    loadedImage.onload = () => {
      if (active) setLoaded({ file, image: loadedImage });
    };
    loadedImage.onerror = () => {
      if (active) setLoaded(null);
    };
    loadedImage.src = objectUrl;

    return () => {
      active = false;
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  return loaded?.file === file ? loaded.image : null;
}

function App() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop: (acceptedFiles) => setImageFile(acceptedFiles[0] ?? null),
  });
  const image = useLoadedImage(imageFile);

  return (
    <>
      <h3>Watermark Tool</h3>
      {image ? (
        <WatermarkPreView image={image} />
      ) : (
        <DropzoneContainer>
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Please drag and drop an image here, or tap to select an image</p>
          </div>
        </DropzoneContainer>
      )}
    </>
  );
}

export default App;
