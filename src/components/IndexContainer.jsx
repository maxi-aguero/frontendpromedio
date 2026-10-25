function IndexContainer({ children, color }) {
  const estilo = {
    backgroundColor: color,
    padding: "20px",
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    justifyContent: "space-between", // Distribuye el espacio entre los botones
    width: "100%",                   // Ocupa toda la línea disponible
    maxWidth: "500px",               // Un ancho máximo para que no se estire demasiado
    boxSizing: "border-box",
    borderRadius: "8px"
  };

  return <div style={estilo}>{children}</div>;
}

export default IndexContainer;