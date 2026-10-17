import { useState } from "react";
import Containerauth from "../components/Containerauth.jsx";
import Itemauth from "../components/Itemauth.jsx";
import Botonauth from "../components/Botonauth.jsx";
import Containerdata from "../components/Containerdata.jsx";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    

        const res = await fetch("https://backendloginprom.onrender.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });


      const data = await res.json();
      setApiResponse(data);

      if (res.ok) {
        // limpiar errores si login fue exitoso
        setErrorUsername("");
        setErrorPassword("");
      
        // guardar el token en sessionStorage
      if (data.token) {
        sessionStorage.setItem("token", data.token);
        console.log("Token guardado en sessionStorage:", data.token);
        window.location.href = "/cursos";

      }

      
      } else {
        // según el status, mostrar error en el campo correcto
        if (data.status === 404) {
          setErrorUsername(data.message);
          setErrorPassword("");
        } else if (data.status === 401) {
          setErrorPassword(data.message);
          setErrorUsername("");
        } else {
          setErrorUsername("");
          setErrorPassword(data.message || "Error inesperado");
        }
      }
    } catch (err) {
      setErrorUsername("");
      setErrorPassword("Error de conexión con el servidor");
    }
  };

  return (
    <Containerauth color="#0f111a">
      <Itemauth color="#151724">
        <form onSubmit={handleSubmit}>
          <h2>Ingrese username y password</h2>
          <Containerdata>
            {/* Username */}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              style={{ width: "70%", alignSelf: "center", padding: "10px" }}
            />
            {errorUsername && (
              <p style={{ color: "red", marginTop: "5px" }}>{errorUsername}</p>
            )}

            {/* Password */}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{ width: "70%", alignSelf: "center", padding: "10px", marginTop: "15px" }}
            />
            {errorPassword && (
              <p style={{ color: "red", marginTop: "5px" }}>{errorPassword}</p>
            )}

            {/* Botón Login */}
            <Botonauth type="submit" color="#7e0596">
              Login
            </Botonauth>
          </Containerdata>
        </form>

        
        {/* Link de recovery */}
        <p style={{ marginTop: "15px" }}>
          Te olvidaste la contrasenia?{" "}
          <a href="/recovery" style={{ color: "lightblue" }}>CambiarContrasenia</a>
        </p>
   


        {/* Link de registro */}
        <p style={{ marginTop: "15px" }}>
          No tienes cuenta?{" "}
          <a href="/register" style={{ color: "lightblue" }}>Registrate</a>
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

export default Login;
