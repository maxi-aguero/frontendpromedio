import { useState } from "react";
import Containerauth from "../components/Containerauth.jsx";
import Itemauth from "../components/Itemauth.jsx";
import Botonauth from "../components/Botonauth.jsx";
import Containerdata from "../components/Containerdata.jsx";

function Recovery() {
  const [email, setEmail] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [errorEmail, setErrorEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://backendloginprom.onrender.com/auth/recovery-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setApiResponse(data);

      if (res.ok) {
        setErrorEmail("");
      } else {
        setErrorEmail(data.message || "Error inesperado");
      }
    } catch (err) {
      setErrorEmail("Error de conexión con el servidor");
    }
  };

  return (
    <Containerauth color="#0f111a">
      <Itemauth color="#151724">
        <form onSubmit={handleSubmit}>
          <h2>Recuperar contraseña</h2>
          <Containerdata>
            {/* Email */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              style={{ width: "70%", alignSelf: "center", padding: "10px" }}
            />
            {errorEmail && (
              <p style={{ color: "red", marginTop: "5px" }}>{errorEmail}</p>
            )}

            {/* Botón Recovery */}
            <Botonauth type="submit" color="#7e0596">
              Enviar código
            </Botonauth>
          </Containerdata>
        </form>

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

export default Recovery;
