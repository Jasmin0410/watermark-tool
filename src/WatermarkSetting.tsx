import styled from "styled-components";

type WatermarkSettingProps = {
	stageRef: any;
	image: HTMLImageElement;
	watermarkText?: string;
	opacity: number;
	fontSize: number;
	setText: (text: string) => void;
	setOpacity: (opacity: number) => void;
	setFontSize: (fontSize: number) => void;
};

const WatermarkSettingContainer = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  zindex: 10;
  background: var(--bg);
  padding: 8px;
  boxsizing: border-box;
  gap: 8px;
  alignitems: center;
  marginbottom: 6px;
  flexwrap: wrap;
  font:
    12px Arial,
    sans-serif;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const handleExport = async function (stageRef: any, image: HTMLImageElement) {
	const stage = stageRef.current;
	const pixelRatio = image.naturalWidth / stage.width();
	const link = document.createElement("a");

	link.href = stageRef.current.toDataURL({
		pixelRatio,
	});
	link.download = "watermarked.png";
	link.click();
};

export default function WatermarkSetting({
	stageRef,
	image,
	watermarkText,
	opacity,
	fontSize,
	setText,
	setOpacity,
	setFontSize,
}: WatermarkSettingProps) {
	return (
		<WatermarkSettingContainer>
			<Label>
				Text:
				<input
					type="text"
					value={watermarkText}
					onChange={function (e) {
						setText(e.target.value);
					}}
					style={{ padding: "3px 5px", width: "200px", fontSize: "12px" }}
				/>
			</Label>
			<Label>
				Opacity:
				<input
					type="range"
					min="0.05"
					max="1"
					step="0.05"
					value={opacity}
					onChange={function (e) {
						setOpacity(parseFloat(e.target.value));
					}}
					style={{ width: "70px" }}
				/>
				<span style={{ minWidth: "24px" }}>{opacity.toFixed(2)}</span>
			</Label>
			<Label>
				Size:
				<input
					type="range"
					min="14"
					max="60"
					step="2"
					value={fontSize}
					onChange={function (e) {
						setFontSize(parseInt(e.target.value));
					}}
					style={{ width: "70px" }}
				/>
				<span style={{ minWidth: "20px" }}>{fontSize}</span>
			</Label>
			<button
				onClick={() => {
					handleExport(stageRef, image);
				}}
				style={{
					padding: "4px 10px",
					cursor: "pointer",
					fontSize: "12px",
					background: "#333",
					color: "white",
					border: "none",
					borderRadius: "3px",
				}}
			>
				Export PNG
			</button>
		</WatermarkSettingContainer>
	);
}
