 async function loginUser({ username, password }) {
  const response = await fetch("http://localhost:9010/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  console.log("👉 Response bruto:", response);

  if (!response.ok) {
    throw new Error("Error en login");
  }
  

  return response.json(); // devuelve { token, username, role }
}
export { loginUser };
