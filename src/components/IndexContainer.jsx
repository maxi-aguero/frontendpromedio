function IndexContainer({ children, color }) {
  const estilo = {
    backgroundColor: color,
    padding: "20px",
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",           // <--- Ocupa el 100% de la pantalla/línea
    boxSizing: "border-box"
  };

  return <div style={estilo}>{children}</div>;
}

export default IndexContainer;
