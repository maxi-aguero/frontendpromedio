import { useEffect, useState } from "react";
import Container from "../components/Container.jsx";
import Item from "../components/Item.jsx";

function Promedios() {
  const [promedios, setPromedios] = useState([]);
  const [precioMediares, setPrecioMediares] = useState("");
  const [novilloKg, setNovilloKg] = useState("");
  const [totalKg, setTotalKg] = useState("");
  const [fechaDeCreacion, setFechaDeCreacion] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    fetch("https://backendpromedio.onrender.com/api/promedios", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setPromedios(data))
      .catch(err => console.error("Error al obtener promedios:", err));
  }, []);

  const handleCreatePromedio = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    const res = await fetch("https://backendpromedio.onrender.com/api/promedios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        preciomediares: parseFloat(precioMediares),
        novillokg: parseFloat(novilloKg),
        totalkg: parseFloat(totalKg),
        fechadecreacion: fechaDeCreacion
      })
    });

    if (res.ok) {
      const newPromedio = await res.json();
      setPromedios([...promedios, newPromedio]);
      setPrecioMediares("");
      setNovilloKg("");
      setTotalKg("");
      setFechaDeCreacion("");
    } else {
      console.error("Error al crear promedio");
    }
  };

  return (
    <div>
      <section>
        <h2>Lista de Promedios</h2>
        <Container color="#0f111a">
          {promedios.map(p => (
            <Item 
              key={p.id} 
              id={p.id} 
              texto={`Precio: $${p.preciomediares} | Kg Novillo: ${p.novillokg} | Kg Utilizables: ${p.totalkg}`} 
              color="#151724" 
            />
          ))}
        </Container>
      </section>

      <section>
        <h3>Crear nuevo promedio</h3>
        <input
          type="number"
          step="any"
          value={precioMediares}
          onChange={e => setPrecioMediares(e.target.value)}
          placeholder="Precio mediares"
        />
        <input
          type="number"
          step="any"
          value={novilloKg}
          onChange={e => setNovilloKg(e.target.value)}
          placeholder="Kg de la mediares"
        />
        <input
          type="number"
          step="any"
          value={totalKg}
          onChange={e => setTotalKg(e.target.value)}
          placeholder="Kg totales utilizables"
        />
        <input
          type="date"
          value={fechaDeCreacion}
          onChange={e => setFechaDeCreacion(e.target.value)}
        />
        <button onClick={handleCreatePromedio}>Crear</button>
      </section>
    </div>
  );
}

export default Promedios;
