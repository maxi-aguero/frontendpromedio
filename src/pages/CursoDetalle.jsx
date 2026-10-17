import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CursoDetalle() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    console.log("Token en sessionStorage:", token);
    if (!token) return;

    fetch(`https://backendpromedio.onrender.com/api/cursos/${id}`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(json => {
        console.log("Data recibida del backend:", json);
        setData(json);
      })
      .catch(err => console.error("Error al obtener curso:", err));
  }, [id, token]);

  return (
    <div>
      <h2>Este es el curso {id}</h2>
      <p>Token: {token ? token : "No hay token en sessionStorage"}</p>

      {data ? (
        <div>
          <p>Título: {data.title}</p>
          <h3>Links:</h3>
          <ul>
            {data.links && data.links.map(link => (
              <li key={link.id}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">[ir]</a> {link.descripcion}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Esperando respuesta del backend...</p>
      )}
    </div>
  );
}

export default CursoDetalle;

