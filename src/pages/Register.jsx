import { useState } from "react";
import Containerauth from "../components/Containerauth.jsx";
import Itemauth from "../components/Itemauth.jsx";
import Containerdata from "../components/Containerdata.jsx";
import Botonauth from "../components/Botonauth.jsx";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: "USER"
  });
  const [errorUsername, setErrorUsername] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [apiResponse, setApiResponse] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Limpiamos errores previos al intentar de nuevo
    setErrorUsername("");
    setErrorEmail("");
    setErrorPassword("");
    setApiResponse(null);

    try {
      const res = await fetch("https://backendloginprom.onrender.com/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Intentamos leer la respuesta de forma segura (puede venir como JSON o texto plano)
      const contentType = res.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        data = { message: await res.text() };
      }

      setApiResponse(data);

      if (res.ok) {
        // Registro exitoso
        console.log("Registro exitoso:", data);
      } else {
        // Manejo de errores según lo que devuelva el backend
        const errorMessage = data.message || "Error en el registro";

        if (res.status === 400 || res.status === 409) {
          if (errorMessage.toLowerCase().includes("usuario") || errorMessage.toLowerCase().includes("username")) {
            setErrorUsername(errorMessage);
          } else if (errorMessage.toLowerCase().includes("email") || errorMessage.toLowerCase().includes("correo")) {
            setErrorEmail(errorMessage);
          } else {
            setErrorPassword(errorMessage);
          }
        } else {
          setErrorPassword(errorMessage);
        }
      }
    } catch (err) {
      console.error("Error de red:", err);
      setErrorPassword("Error de conexión con el servidor");
    }
  };

  return (
    <Containerauth color="#0f111a">
      <Itemauth color="#151724">
        <form onSubmit={handleSubmit}>
          <h2>Ingrese username, email y password</h2>
          <Containerdata>
            {/* Username */}
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              style={{ width: "70%", padding: "10px", marginBottom: "10px" }}
            />
            {errorUsername && (
              <p style={{ color: "red", marginTop: "5px" }}>{errorUsername}</p>
            )}

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: "70%", padding: "10px", marginBottom: "10px" }}
            />
            {errorEmail && (
              <p style={{ color: "red", marginTop: "5px" }}>{errorEmail}</p>
            )}

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ width: "70%", padding: "10px", marginBottom: "10px" }}
            />
            {errorPassword && (
              <p style={{ color: "red", marginTop: "5px" }}>{errorPassword}</p>
            )}

            {/* Botón Registrar */}
            <Botonauth type="submit" color="#7e0596">
              Registrar
            </Botonauth>
          </Containerdata>
        </form>

        {/* Link de login */}
        <p style={{ marginTop: "15px" }}>
          Ya tienes cuenta?{" "}
          <a href="/login" style={{ color: "lightblue" }}>Inicia sesión</a>
        </p>

        {/* Debug opcional: mostrar JSON completo */}
        {apiResponse && (
          <div style={{ marginTop: "15px", textAlign: "center" }}>
            <pre style={{ color: "white", textAlign: "left", display: "inline-block" }}>
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
          </div>
        )}
      </Itemauth>
    </Containerauth>
  );
}

export default Register;
