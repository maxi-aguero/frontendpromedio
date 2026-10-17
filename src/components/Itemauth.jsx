function Itemauth({ children, color } ) {
  const estilo = {
    
    backgroundColor: color,
    padding: "20px",
    color: "white",
    borderRadius: "8px",

    display: "flex",
    
    flexDirection: "column", /* organiza en columna */
    alignItems: "center",    /* centra horizontalmente */
    justifyContent: "center",/* centra verticalmente si hay altura definida */

    width: "320px",
    

  };

  return <div style={estilo}>{children}</div>;
}
export default Itemauth;