import { useEffect, useState } from "react";
import Container from "../components/Container.jsx";
import Item from "../components/Item.jsx";

function Promedios(){


  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    fetch("https://backendpromedio.onrender.com/api/promedios", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error("Error al obtener promedios:", err));
  }, []);

  const handleCreateCourse = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    const res = await fetch("https://backendpromedio.onrender.com/api/promedios", {
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
      console.error("Error al crear promedios");
    }
  };
return (
    <div >
      <h1>Todos los promedios</h1>

      <div>
      <section>
        <h2>Lista de promedios</h2>
        <Container color="#0f111a">
            {courses.map(c => (
              <Item 
                key={c.id} 
                id={c.id} 
                texto={c.preciomediares} 
                color="#151724" 
              />
            ))}
</Container>

      </section>

      
    </div>

    </div>



  

   

    
);}
export default Promedios;
