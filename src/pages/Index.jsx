import IndexContainer from "../components/IndexContainer.jsx";
import IndexButton from "../components/IndexButton.jsx";

function Index() {
    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100%", marginTop: "50px" }}>
            <IndexContainer color="#0f111a">
                <IndexButton texto="Iniciar sesión" color="green" to="/login" />
                <IndexButton texto="Registrarse" color="blue" to="/register" />
            </IndexContainer>
        </div>
    );
}

export default Index;
