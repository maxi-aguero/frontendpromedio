import { useNavigate } from "react-router-dom";
import { useState } from "react";

function IndexButton({ texto, color, to }) {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  const estilo = {
    backgroundColor: hover ? "yellow" : color,
    color: "white",
    padding: "20px",
    border: "3px solid violet",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "6px",
    marginBottom: "10px",
    width: "220px",
    cursor: "pointer"
  };

  const textoEstilo = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "100%"
  };

  return (
    <div
      style={estilo}
      onClick={() => navigate(to)} 
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span style={textoEstilo}>{texto}</span>
    </div>
  );
}

export default IndexButton;