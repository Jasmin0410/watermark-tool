import { useState, useRef } from "react";
import { Stage, Layer, Image, Text, Group } from "react-konva";
import styled from "styled-components";
import WatermarkSetting from "./WatermarkSetting";

const PreViewContainer = styled.div`
  width: 100%;
  position: relative;
  zindex: 0;
`;

type WatermarkPreViewProps = {
  image: HTMLImageElement;
};

export default function WatermarkPreView({ image }: WatermarkPreViewProps) {
  const stageRef = useRef(null);
  const [text, setText] = useState("Watermark");
  const [opacity, setOpacity] = useState(0.5);
  const [fontSize, setFontSize] = useState(20);

  const width = image.width * 0.8;
  const height = image.height * 0.8;
  const preViewWidth = Math.min(width, 800);
  const preViewHeight = (height / width) * preViewWidth;
  var positions = [];
  for (var x = -width; x < width * 2; x += 180) {
    for (var y = -height; y < height * 2; y += 120) {
      positions.push({ x: x, y: y });
    }
  }

  return (
    <PreViewContainer>
      <WatermarkSetting
        stageRef={stageRef}
        image={image}
        watermarkText={text}
        opacity={opacity}
        fontSize={fontSize}
        setText={setText}
        setOpacity={setOpacity}
        setFontSize={setFontSize}
      />
      <Stage
        ref={stageRef}
        width={preViewWidth}
        height={preViewHeight}
        style={{ border: "1px solid #ccc" }}
      >
        <Layer>
          <Image image={image} width={preViewWidth} height={preViewHeight} />
          <Group>
            {positions.map(function (pos, i) {
              return (
                <Text
                  key={i}
                  x={pos.x}
                  y={pos.y}
                  text={text}
                  fontSize={fontSize}
                  fontFamily="Arial"
                  fill="white"
                  opacity={opacity}
                  rotation={-30}
                />
              );
            })}
          </Group>
        </Layer>
      </Stage>
    </PreViewContainer>
  );
}
