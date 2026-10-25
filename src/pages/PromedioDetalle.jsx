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
    return <p style={{ padding: "20px", color: "#fff" }}>Cargando detalles...</p>;
  }

  return (
    <div style={{ padding: "20px", backgroundColor: "#0f111a", minHeight: "100vh", color: "#fff" }}>
      <h2>Detalle del Promedio #{promedio.id}</h2>
      
      <p><strong>Precio Mediares:</strong> ${promedio.preciomediares}</p>
      <p><strong>Kg de la Mediares:</strong> {promedio.novillokg}</p>
      <p><strong>Kg Totales Utilizables:</strong> {promedio.totalkg}</p>
      <p><strong>Costo Real:</strong> ${promedio.costoreal?.toFixed(2)}</p>
      <p><strong>Fecha de Creación:</strong> {promedio.created ? new Date(promedio.created).toLocaleDateString() : "Sin fecha"}</p>
      
      <br />
      <button onClick={() => navigate("/promedios")}>Volver a la lista</button>
    </div>
  );
}

export default PromedioDetalle;
