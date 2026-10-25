import Container from "../components/Container.jsx";

import IndexButton from "../components/IndexButton.jsx";

function Index() {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
            <h2>Bienvenido</h2>
            <Container color="#0f111a">
                <IndexButton texto="Iniciar sesión" color="green" to="/login" />
                <IndexButton texto="Registrarse" color="blue" to="/register" />
            </Container>
        </div>
    );
}

export default Index;
