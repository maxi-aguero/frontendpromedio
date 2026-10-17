import { useState } from "react";
import { useLocation } from "react-router-dom";
import Containerauth from "../components/Containerauth.jsx";
import Itemauth from "../components/Itemauth.jsx";
import Botonauth from "../components/Botonauth.jsx";
import Containerdata from "../components/Containerdata.jsx";

function ResetPassword() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tokenFromUrl = params.get("token"); // capturamos el token de la URL

  const [newPassword, setNewPassword] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [errorPassword, setErrorPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://backendloginprom.onrender.com/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: tokenFromUrl, newPassword }),
      });

      const data = await res.json();
      setApiResponse(data);

      if (res.ok) {
        setErrorPassword("");
        // redirigir al login
        window.location.href = "/login";
      } else {
        setErrorPassword(data.message || "Error inesperado");
      }
    } catch (err) {
      setErrorPassword("Error de conexión con el servidor");
    }
  };

  return (
    <Containerauth color="#0f111a">
      <Itemauth color="#151724">
        <form onSubmit={handleSubmit}>
          <h2>Restablecer contraseña</h2>
          <Containerdata>
            {/* Nueva contraseña */}
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nueva contraseña"
              style={{
                width: "70%",
                alignSelf: "center",
                padding: "10px",
                marginTop: "15px",
              }}
            />
            {errorPassword && (
              <p style={{ color: "red", marginTop: "5px" }}>{errorPassword}</p>
            )}

            {/* Botón Reset */}
            <Botonauth type="submit" color="#7e0596">
              Cambiar contraseña
            </Botonauth>
          </Containerdata>
        </form>

        {/* Debug opcional */}
        {apiResponse && (
          <div style={{ marginTop: "15px", textAlign: "center" }}>
            <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
          </div>
        )}
      </Itemauth>
    </Containerauth>
  );
}

export default ResetPassword;
