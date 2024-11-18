import "./Box.css";

export default function Box({ width, height, color }) {
  return (
    <div
      className="box"
      style={{
        width: width || "100px",
        height: height || "100px",
        backgroundColor: color || "blue",
      }}
    ></div>
  );
}