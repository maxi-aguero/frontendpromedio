  import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {

  

  const [userInfo, setUserInfo] = useState("");
  const [helloResponse, setHelloResponse] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/"); // redirige al login
      return;
    }

    const fetchData = async () => {
      try {
        const resCheck = await fetch("http://localhost:9010/auth/check", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!resCheck.ok) throw new Error("Token inválido");
        const dataCheck = await resCheck.text();
        setUserInfo(dataCheck);

        const resHello = await fetch("http://localhost:9010/api/hello", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!resHello.ok) throw new Error("Token inválido");
        const dataHello = await resHello.text();
        setHelloResponse(dataHello);
      } catch (err) {
        localStorage.removeItem("jwtToken"); // borra token inválido
        navigate("/"); // vuelve al login
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div>
      <h2>Página Principal</h2>
      <p>{userInfo}</p>
      <p>{helloResponse}</p>
    </div>
  );
}



