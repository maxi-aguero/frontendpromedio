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
    try {
      const res = await fetch("https://backendloginprom.onrender.com/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setApiResponse(data);

      if (res.ok) {
        // limpiar errores si fue exitoso
        setErrorUsername("");
        setErrorEmail("");
        setErrorPassword("");
      } else {
        // mostrar errores según el status
        if (data.status === 400 && data.message.includes("Usuario")) {
          setErrorUsername(data.message);
          setErrorEmail("");
          setErrorPassword("");
        } else if (data.status === 400 && data.message.includes("Email")) {
          setErrorEmail(data.message);
          setErrorUsername("");
          setErrorPassword("");
        } else {
          setErrorPassword(data.message || "Error inesperado");
          setErrorUsername("");
          setErrorEmail("");
        }
      }
    } catch (err) {
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
            <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
          </div>
        )}
      </Itemauth>
    </Containerauth>
  );
}



export default Register;
