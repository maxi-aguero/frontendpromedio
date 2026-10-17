function Container({ children, color }) {
  const estilo = {
    backgroundColor: color,
    padding: "20px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",            
    justifyContent: "flex-start",
  };

  return <div style={estilo}>{children}</div>;
}
export default Container;
