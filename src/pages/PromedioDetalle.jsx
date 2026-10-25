import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PromedioDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [promedio, setPromedio] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setError("No hay token de autenticación");
      return;
    }

    fetch(`https://backendpromedio.onrender.com/api/promedios/${id}`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error("No se pudo obtener el promedio");
        return res.json();
      })
      .then(data => setPromedio(data))
      .catch(err => setError(err.message));
  }, [id]);

  if (error) {
    return <p style={{ color: "red", padding: "20px" }}>Error: {error}</p>;
  }

  if (!promedio) {
    return <p style={{ padding: "20px", color: "#0d2b45" }}>Cargando detalles...</p>;
  }

  return (
    <div style={{ padding: "30px", backgroundColor: "#ffffff", minHeight: "100vh", color: "#0d2b45", fontFamily: "sans-serif" }}>
      <h2>Detalle del Promedio #{promedio.id}</h2>
      
      <table style={{ width: "100%", maxWidth: "600px", borderCollapse: "collapse", marginTop: "20px", backgroundColor: "#ffffff", color: "#0d2b45", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
        <tbody>
          <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
            <th style={{ padding: "12px", textAlign: "left", backgroundColor: "#f8fafc", color: "#0d2b45", width: "40%" }}>ID</th>
            <td style={{ padding: "12px", color: "#0d2b45" }}>{promedio.id}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
            <th style={{ padding: "12px", textAlign: "left", backgroundColor: "#f8fafc", color: "#0d2b45" }}>Precio Mediares</th>
            <td style={{ padding: "12px", color: "#0d2b45" }}>${promedio.preciomediares}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
            <th style={{ padding: "12px", textAlign: "left", backgroundColor: "#f8fafc", color: "#0d2b45" }}>Kg de la Mediares</th>
            <td style={{ padding: "12px", color: "#0d2b45" }}>{promedio.novillokg}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
            <th style={{ padding: "12px", textAlign: "left", backgroundColor: "#f8fafc", color: "#0d2b45" }}>Kg Totales Utilizables</th>
            <td style={{ padding: "12px", color: "#0d2b45" }}>{promedio.totalkg}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
            <th style={{ padding: "12px", textAlign: "left", backgroundColor: "#f8fafc", color: "#0d2b45" }}>Costo Real</th>
            <td style={{ padding: "12px", color: "#0d2b45" }}>${promedio.costoreal?.toFixed(2)}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
            <th style={{ padding: "12px", textAlign: "left", backgroundColor: "#f8fafc", color: "#0d2b45" }}>Total compra</th>
            <td style={{ padding: "12px", color: "#0d2b45" }}>${promedio.totalcompra?.toFixed(2)}</td>
          </tr>
          <tr>
            <th style={{ padding: "12px", textAlign: "left", backgroundColor: "#f8fafc", color: "#0d2b45" }}>Fecha de Creación</th>
            <td style={{ padding: "12px", color: "#0d2b45" }}>{promedio.created ? new Date(promedio.created).toLocaleDateString() : "Sin fecha"}</td>
          </tr>
        </tbody>
      </table>
      
      <br />
      <button 
        onClick={() => navigate("/promedios")} 
        style={{ marginTop: "15px", padding: "10px 20px", backgroundColor: "#0d2b45", color: "#ffffff", border: "none", cursor: "pointer", borderRadius: "4px" }}
      >
        Volver a la lista
      </button>
    </div>
  );
}

export default PromedioDetalle;
