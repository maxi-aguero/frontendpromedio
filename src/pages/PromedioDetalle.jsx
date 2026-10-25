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

  // 1. Array simulado de cortes mientras el backend lo incorpora
  const cortesSimulados = [
    { producto: "Asado", kg: 22.5, precioKg: 14500 },
    { producto: "Vacío", kg: 12.0, precioKg: 16000 },
    { producto: "Matambre", kg: 8.5, precioKg: 15500 },
    { producto: "Lomo", kg: 6.2, precioKg: 18000 },
    { producto: "Nalga", kg: 15.0, precioKg: 15000 },
    { producto: "Carnaza", kg: 14.77, precioKg: 11000 }
  ];

  // Si el backend ya trae 'cortes' o 'detalles', los usa; si no, usa el array simulado
  const cortes = promedio.cortes || promedio.detalles || cortesSimulados;

  return (
    <div style={{ padding: "30px", backgroundColor: "#ffffff", minHeight: "100vh", color: "#0d2b45", fontFamily: "sans-serif", maxWidth: "900px", margin: "0 auto" }}>
      
      {/* Encabezado y Botón de Volver */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #e2e8f0", paddingBottom: "15px", marginBottom: "20px" }}>
        <h2 style={{ margin: 0, color: "#0d2b45" }}>Detalle del Promedio #{promedio.id}</h2>
        <button 
          onClick={() => navigate("/promedios")} 
          style={{ padding: "8px 16px", backgroundColor: "#0d2b45", color: "#ffffff", border: "none", cursor: "pointer", borderRadius: "4px" }}
        >
          Volver a la lista
        </button>
      </div>

      {/* Tarjetas de Resumen de Datos Generales */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px", marginBottom: "30px" }}>
        
        <div style={{ backgroundColor: "#f8fafc", padding: "15px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "5px" }}>Fecha de Creación</div>
          <div style={{ fontSize: "16px", fontWeight: "bold", color: "#0d2b45" }}>
            {promedio.created ? new Date(promedio.created).toLocaleDateString() : "Sin fecha"}
          </div>
        </div>

        <div style={{ backgroundColor: "#f8fafc", padding: "15px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "5px" }}>Precio Mediares</div>
          <div style={{ fontSize: "16px", fontWeight: "bold", color: "#0d2b45" }}>
            ${(promedio.preciomediares ?? 0).toLocaleString()}
          </div>
        </div>

        <div style={{ backgroundColor: "#f8fafc", padding: "15px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "5px" }}>Kg de la Mediares</div>
          <div style={{ fontSize: "16px", fontWeight: "bold", color: "#0d2b45" }}>
            {promedio.novillokg} kg
          </div>
        </div>

        <div style={{ backgroundColor: "#f8fafc", padding: "15px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "5px" }}>Kg Totales Utilizables</div>
          <div style={{ fontSize: "16px", fontWeight: "bold", color: "#0d2b45" }}>
            {promedio.totalkg} kg
          </div>
        </div>

        <div style={{ backgroundColor: "#f8fafc", padding: "15px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "5px" }}>Costo Real</div>
          <div style={{ fontSize: "16px", fontWeight: "bold", color: "#0d2b45" }}>
            ${(promedio.costoreal ?? 0).toFixed(2)}
          </div>
        </div>

        <div style={{ backgroundColor: "#f8fafc", padding: "15px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "5px" }}>Total Compra</div>
          <div style={{ fontSize: "16px", fontWeight: "bold", color: "#0d2b45" }}>
            ${(promedio.totalcompra ?? 0).toFixed(2)}
          </div>
        </div>

      </div>

      {/* Sección de Desglose de Cortes / Ventas */}
      <h3 style={{ color: "#0d2b45", fontSize: "18px", marginBottom: "15px" }}>
        Desglose de Cortes y Ventas por Producto
      </h3>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#ffffff", color: "#0d2b45", boxShadow: "0 2px 5px rgba(0,0,0,0.05)", borderRadius: "8px", overflow: "hidden" }}>
          <thead>
            <tr style={{ backgroundColor: "#f8fafc", color: "#0d2b45", borderBottom: "2px solid #e2e8f0" }}>
              <th style={{ padding: "12px", textAlign: "left" }}>Producto / Corte</th>
              <th style={{ padding: "12px", textAlign: "right" }}>Kg</th>
              <th style={{ padding: "12px", textAlign: "right" }}>Precio x Kg</th>
              <th style={{ padding: "12px", textAlign: "right" }}>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cortes.length > 0 ? (
              cortes.map((corte, index) => {
                const kgCorte = corte.kg || corte.cantidadKg || 0;
                const precioCorte = corte.precioKg || corte.precio || 0;
                const subtotal = kgCorte * precioCorte;
                return (
                  <tr key={index} style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "12px", fontWeight: "500", color: "#0d2b45" }}>
                      {corte.producto || corte.nombre || "Corte"}
                    </td>
                    <td style={{ padding: "12px", textAlign: "right", color: "#334155" }}>
                      {kgCorte.toFixed(2)} kg
                    </td>
                    <td style={{ padding: "12px", textAlign: "right", color: "#334155" }}>
                      ${precioCorte.toFixed(2)}
                    </td>
                    <td style={{ padding: "12px", textAlign: "right", fontWeight: "600", color: "#0d2b45" }}>
                      ${subtotal.toFixed(2)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" style={{ padding: "20px", textAlign: "center", color: "#64748b" }}>
                  No hay cortes registrados en este promedio.
                </td>
              </tr>
            )}
          </tbody>
          {cortes.length > 0 && (
            <tfoot>
              <tr style={{ backgroundColor: "#f1f5f9", fontWeight: "bold" }}>
                <td style={{ padding: "12px", color: "#0d2b45" }}>Total venta</td>
                <td style={{ padding: "12px", textAlign: "right", color: "#0d2b45" }}>
                  {cortes.reduce((acc, item) => acc + (item.kg || item.cantidadKg || 0), 0).toFixed(2)} kg
                </td>
                <td style={{ padding: "12px", textAlign: "right" }}>-</td>
                <td style={{ padding: "12px", textAlign: "right", color: "#0d2b45" }}>
                  ${cortes.reduce((acc, item) => acc + ((item.kg || item.cantidadKg || 0) * (item.precioKg || item.precio || 0)), 0).toFixed(2)}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

    </div>
  );
}

export default PromedioDetalle;
