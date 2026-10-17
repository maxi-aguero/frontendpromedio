import { useEffect, useState } from "react";
import Container from "../components/Container.jsx";
import Item from "../components/Item.jsx";
import { Link } from "react-router-dom";

function Cursos() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    fetch("https://backendpromedio.onrender.com/api/cursos", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error("Error al obtener cursos:", err));
  }, []);

  const handleCreateCourse = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    const res = await fetch("https://backendpromedio.onrender.com/api/cursos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ title })
    });

    if (res.ok) {
      const newCourse = await res.json();
      setCourses([...courses, newCourse]);
      setTitle("");
    } else {
      console.error("Error al crear curso");
    }
  };

  return (
    <div>
      <section>
        <h2>Lista de Cursos</h2>
        <Container color="#0f111a">
            {courses.map(c => (
              <Item 
                key={c.id} 
                id={c.id} 
                texto={c.title} 
                color="#151724" 
              />
            ))}
</Container>

      </section>

      <section>
        <h3>Crear nuevo curso</h3>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Título del curso"
        />
        <button onClick={handleCreateCourse}>Crear</button>
      </section>
    </div>
  );
}

export default Cursos;

