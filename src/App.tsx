import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import WatermarkPreView from "./WatermarkPreView";
import WatermarkSetting from "./WatermarkSetting";

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
    const loadedImage = new window.Image();
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
  const [text, setText] = useState("Watermark");
  const [opacity, setOpacity] = useState(0.5);
  const [fontSize, setFontSize] = useState(20);
  const image = useLoadedImage(imageFile);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop: (acceptedFiles) => setImageFile(acceptedFiles[0] ?? null),
  });

  return (
    <>
      <h3>Watermark Tool</h3>
      <WatermarkSetting
        watermarkText={text}
        opacity={opacity}
        fontSize={fontSize}
        setText={setText}
        setOpacity={setOpacity}
        setFontSize={setFontSize}
      />
      {image ? (
        <WatermarkPreView
          image={image}
          watermarkText={text}
          opacity={opacity}
          fontSize={fontSize}
        />
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
