function Botonauth({ children, color, ...props }) {
  const estilo = {
    backgroundColor: color,
    color: "white",
    width: "70%",
    alignSelf: "center",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    textAlign: "center"
  };

  return (
    <button style={estilo} {...props}>
      {children}
    </button>
  );
}

export default Botonauth;

