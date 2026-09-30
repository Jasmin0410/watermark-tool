import { Stage, Layer, Image, Text, Group } from "react-konva";
import styled from "styled-components";

const PreViewContainer = styled.div`
  width: 100%;
  position: relative;
  zindex: 0;
	border: 1px dotted #ccc;
`;

type WatermarkPreViewProps = {
	image: HTMLImageElement;
	watermarkText?: string;
	opacity?: number;
	fontSize?: number;
};

export default function WatermarkPreView({
	image,
	watermarkText,
	opacity,
	fontSize,
}: WatermarkPreViewProps) {
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
			<Stage width={preViewWidth} height={preViewHeight}>
				<Layer>
					<Image image={image} width={preViewWidth} height={preViewHeight} />
					<Group>
						{positions.map(function (pos, i) {
							return (
								<Text
									key={i}
									x={pos.x}
									y={pos.y}
									text={watermarkText}
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
