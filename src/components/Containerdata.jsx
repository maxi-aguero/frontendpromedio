function Containerdata({ children }) {
  const estilo = {
    padding: "20px",

    display: "flex",
    gap: "10px",
    flexDirection: "column",

    justifyContent: "center",
    alignItems: "center",
  };

  return <div style={estilo}>{children}</div>;
}
export default Containerdata;


