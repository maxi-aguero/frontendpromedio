
function Containerauth({ children, color } ) {
  const estilo = {
   

    backgroundColor: color,
    display: "flex",
    flexWrap: "wrap",           

    justifyContent: "center",
    alignItems: "center",
    height: "100vh",

  };

  return <div style={estilo}>{children}</div>;
}
export default Containerauth;