import React, { useState } from "react";
import { Container, Row, Col, Form, Button, ProgressBar, Badge, Card, } from "react-bootstrap";
import { BriefcaseFill, GeoAltFill, CashStack, ShieldCheck, } from "react-bootstrap-icons";
import "../styles/AplicarTrabajo.css";

const AplicarTrabajo = () => {

    const [tipoPerfil, setTipoPerfil] = useState("sinTitulo");

    const habilidades = [
        "Atención al cliente",
        "Ventas",
        "Trabajo en equipo",
        "Organización",
        "Limpieza",
        "Diseño",
    ];


    return (

        <Container fluid className="aplicar-trabajo-container">
            <Row>

                {/*IZQUIERDA */}
                <Col lg={8}>

                    {/* HEADER */}
                    <div className="aplicar-header">
                        <Button
                            variant="link"
                            className="btn-volver text-decoration-none"
                        >
                            ← Volver
                        </Button>

                        <h1>Aplicar a Trabajo</h1>

                        <p>
                            Completa el formulario para postularte al puesto.
                        </p>

                    </div>

                    {/*CARD INFORMACIÓN */}
                    <Card className="aplicar-card info-trabajo">
                        <Card.Body>
                            <div className="info-trabajo-top">

                                {/* ICONO */}
                                <div className="info-icono">
                                    <BriefcaseFill size={30} />
                                </div>

                                {/* INFO */}
                                <div>
                                    <h2>Aplicar a trabajo</h2>
                                    <p>Comercial Express S.A.</p>
                                    {/* BADGES */}
                                    <div className="info-badges">
                                        <Badge
                                            bg="light"
                                            text="dark"
                                            className="info-badge"
                                        >
                                            <GeoAltFill className="me-1" />
                                            Presencial
                                        </Badge>

                                        <Badge
                                            bg="light"
                                            text="dark"
                                            className="info-badge"
                                        >
                                            <CashStack className="me-1" />
                                            $1,200 - $1,600
                                        </Badge>

                                        <Badge
                                            bg="success"
                                            className="info-badge"
                                        >
                                            Sin experiencia
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>

                    {/* FORMULARIO */}
                    <Card className="aplicar-card formulario-aplicar">
                        <Card.Body>
                            <h3>Cuéntanos sobre ti</h3>

                            <p className="formulario-aplicar-desc">
                                Tu experiencia y habilidades son importantes.
                            </p>

                            <Form>

                                {/* TIPO PERFIL */}
                                <div className="mb-4">
                                    <label className="fw-semibold mb-3 d-block">
                                        ¿Tienes título o diploma?
                                    </label>

                                    <Row>
                                        {/* SIN TÍTULO */}
                                        <Col md={4}>
                                            <Card
                                                onClick={() => setTipoPerfil("sinTitulo")}
                                                className={`tipo-card ${tipoPerfil === "sinTitulo"
                                                    ? "active"
                                                    : ""
                                                    }`}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <Card.Body>

                                                    <Form.Check
                                                        type="radio"
                                                        checked={tipoPerfil === "sinTitulo"}
                                                        label="No tengo título"
                                                    />

                                                    <small className="text-muted">
                                                        Aplicar con experiencia
                                                    </small>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                        {/* TÉCNICO */}
                                        <Col md={4}>

                                            <Card
                                                onClick={() => setTipoPerfil("tecnico")}
                                                className={`tipo-card ${tipoPerfil === "tecnico"
                                                    ? "active"
                                                    : ""
                                                    }`}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <Card.Body>

                                                    <Form.Check
                                                        type="radio"
                                                        checked={tipoPerfil === "tecnico"}
                                                        label="Título técnico"
                                                    />

                                                    <small className="text-muted">
                                                        Técnico o tecnólogo
                                                    </small>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                        {/* PROFESIONAL */}
                                        <Col md={4}>

                                            <Card
                                                onClick={() => setTipoPerfil("profesional")}
                                                className={`tipo-card ${tipoPerfil === "profesional"
                                                    ? "active"
                                                    : ""
                                                    }`}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <Card.Body>

                                                    <Form.Check
                                                        type="radio"
                                                        checked={tipoPerfil === "profesional"}
                                                        label="Título profesional"
                                                    />

                                                    <small className="text-muted">
                                                        Universitario
                                                    </small>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>

                                {/* CAMPOS */}
                                <div className="campos-grid">
                                    {/* NOMBRE */}
                                    <div className="campo-grupo">
                                        <label>Nombre completo</label>
                                        <div className="input-wrap">
                                            <input
                                                type="text"
                                                placeholder="Ingrese su nombre"
                                            />
                                        </div>
                                    </div>

                                    {/* CORREO */}
                                    <div className="campo-grupo">
                                        <label>Correo electrónico</label>
                                        <div className="input-wrap">
                                            <input
                                                type="email"
                                                placeholder="correo@gmail.com"
                                            />

                                        </div>

                                    </div>



                                    {/* TELÉFONO */}
                                    <div className="campo-grupo">

                                        <label>Teléfono</label>

                                        <div className="telefono-wrap">

                                            {/* SELECT CÓDIGO */}
                                            <select className="codigo-pais">

                                                <option value="+93">Afganistán (+93)</option>
                                                <option value="+355">Albania (+355)</option>
                                                <option value="+49">Alemania (+49)</option>
                                                <option value="+376">Andorra (+376)</option>
                                                <option value="+244">Angola (+244)</option>
                                                <option value="+966">Arabia Saudita (+966)</option>
                                                <option value="+213">Argelia (+213)</option>
                                                <option value="+54">Argentina (+54)</option>
                                                <option value="+374">Armenia (+374)</option>
                                                <option value="+61">Australia (+61)</option>
                                                <option value="+43">Austria (+43)</option>
                                                <option value="+994">Azerbaiyán (+994)</option>
                                                <option value="+1">Bahamas (+1)</option>
                                                <option value="+880">Bangladés (+880)</option>
                                                <option value="+32">Bélgica (+32)</option>
                                                <option value="+501">Belice (+501)</option>
                                                <option value="+591">Bolivia (+591)</option>
                                                <option value="+387">Bosnia y Herzegovina (+387)</option>
                                                <option value="+55">Brasil (+55)</option>
                                                <option value="+359">Bulgaria (+359)</option>
                                                <option value="+1">Canadá (+1)</option>
                                                <option value="+56">Chile (+56)</option>
                                                <option value="+86">China (+86)</option>
                                                <option value="+57">Colombia (+57)</option>
                                                <option value="+82">Corea del Sur (+82)</option>
                                                <option value="+506">Costa Rica (+506)</option>
                                                <option value="+385">Croacia (+385)</option>
                                                <option value="+53">Cuba (+53)</option>
                                                <option value="+45">Dinamarca (+45)</option>
                                                <option value="+593">Ecuador (+593)</option>
                                                <option value="+20">Egipto (+20)</option>
                                                <option value="+503">El Salvador (+503)</option>
                                                <option value="+971">Emiratos Árabes Unidos (+971)</option>
                                                <option value="+34">España (+34)</option>
                                                <option value="+1">Estados Unidos (+1)</option>
                                                <option value="+63">Filipinas (+63)</option>
                                                <option value="+358">Finlandia (+358)</option>
                                                <option value="+33">Francia (+33)</option>
                                                <option value="+30">Grecia (+30)</option>
                                                <option value="+502">Guatemala (+502)</option>
                                                <option value="+509">Haití (+509)</option>
                                                <option value="+504">Honduras (+504)</option>
                                                <option value="+91">India (+91)</option>
                                                <option value="+62">Indonesia (+62)</option>
                                                <option value="+964">Irak (+964)</option>
                                                <option value="+353">Irlanda (+353)</option>
                                                <option value="+354">Islandia (+354)</option>
                                                <option value="+972">Israel (+972)</option>
                                                <option value="+39">Italia (+39)</option>
                                                <option value="+1">Jamaica (+1)</option>
                                                <option value="+81">Japón (+81)</option>
                                                <option value="+352">Luxemburgo (+352)</option>
                                                <option value="+52">México (+52)</option>
                                                <option value="+212">Marruecos (+212)</option>
                                                <option value="+505">Nicaragua (+505)</option>
                                                <option value="+47">Noruega (+47)</option>
                                                <option value="+64">Nueva Zelanda (+64)</option>
                                                <option value="+31">Países Bajos (+31)</option>
                                                <option value="+507">Panamá (+507)</option>
                                                <option value="+595">Paraguay (+595)</option>
                                                <option value="+51">Perú (+51)</option>
                                                <option value="+48">Polonia (+48)</option>
                                                <option value="+351">Portugal (+351)</option>
                                                <option value="+1">Puerto Rico (+1)</option>
                                                <option value="+44">Reino Unido (+44)</option>
                                                <option value="+1">República Dominicana (+1)</option>
                                                <option value="+40">Rumania (+40)</option>
                                                <option value="+7">Rusia (+7)</option>
                                                <option value="+46">Suecia (+46)</option>
                                                <option value="+41">Suiza (+41)</option>
                                                <option value="+66">Tailandia (+66)</option>
                                                <option value="+90">Turquía (+90)</option>
                                                <option value="+380">Ucrania (+380)</option>
                                                <option value="+598">Uruguay (+598)</option>
                                                <option value="+58">Venezuela (+58)</option>
                                                <option value="+84">Vietnam (+84)</option>

                                            </select>

                                            {/* INPUT TELÉFONO */}
                                            <input
                                                type="tel"
                                                placeholder="Ingrese su teléfono"
                                                className="telefono-input"
                                                minLength={8}
                                                onInput={(e) => {
                                                    e.target.value = e.target.value.replace(/\D/g, "");
                                                }}
                                            />



                                        </div>

                                    </div>

                                    {/* CIUDAD */}
                                    <div className="campo-grupo">

                                        <label>País</label>
                                        <div className="input-wrap">

                                            <select>

                                                <option>
                                                    Seleccionar país
                                                </option>

                                                <option>Afganistán</option>
                                                <option>Albania</option>
                                                <option>Alemania</option>
                                                <option>Andorra</option>
                                                <option>Angola</option>
                                                <option>Arabia Saudita</option>
                                                <option>Argelia</option>
                                                <option>Argentina</option>
                                                <option>Armenia</option>
                                                <option>Australia</option>
                                                <option>Austria</option>
                                                <option>Azerbaiyán</option>
                                                <option>Bahamas</option>
                                                <option>Bangladés</option>
                                                <option>Bélgica</option>
                                                <option>Belice</option>
                                                <option>Bolivia</option>
                                                <option>Bosnia y Herzegovina</option>
                                                <option>Brasil</option>
                                                <option>Bulgaria</option>
                                                <option>Canadá</option>
                                                <option>Chile</option>
                                                <option>China</option>
                                                <option>Colombia</option>
                                                <option>Corea del Sur</option>
                                                <option>Costa Rica</option>
                                                <option>Croacia</option>
                                                <option>Cuba</option>
                                                <option>Dinamarca</option>
                                                <option>Ecuador</option>
                                                <option>Egipto</option>
                                                <option>El Salvador</option>
                                                <option>Emiratos Árabes Unidos</option>
                                                <option>España</option>
                                                <option>Estados Unidos</option>
                                                <option>Filipinas</option>
                                                <option>Finlandia</option>
                                                <option>Francia</option>
                                                <option>Grecia</option>
                                                <option>Guatemala</option>
                                                <option>Haití</option>
                                                <option>Honduras</option>
                                                <option>India</option>
                                                <option>Indonesia</option>
                                                <option>Irak</option>
                                                <option>Irlanda</option>
                                                <option>Islandia</option>
                                                <option>Israel</option>
                                                <option>Italia</option>
                                                <option>Jamaica</option>
                                                <option>Japón</option>
                                                <option>Luxemburgo</option>
                                                <option>México</option>
                                                <option>Marruecos</option>
                                                <option>Nicaragua</option>
                                                <option>Noruega</option>
                                                <option>Nueva Zelanda</option>
                                                <option>Países Bajos</option>
                                                <option>Panamá</option>
                                                <option>Paraguay</option>
                                                <option>Perú</option>
                                                <option>Polonia</option>
                                                <option>Portugal</option>
                                                <option>Puerto Rico</option>
                                                <option>Reino Unido</option>
                                                <option>República Dominicana</option>
                                                <option>Rumania</option>
                                                <option>Rusia</option>
                                                <option>Suecia</option>
                                                <option>Suiza</option>
                                                <option>Tailandia</option>
                                                <option>Turquía</option>
                                                <option>Ucrania</option>
                                                <option>Uruguay</option>
                                                <option>Venezuela</option>
                                                <option>Vietnam</option>

                                            </select>



                                        </div>

                                    </div>

                                    {/* HABILIDADES */}
                                    <div className="campo-grupo campo-full">
                                        <label>Habilidades</label>

                                        {/* TAGS */}
                                        <div className="habilidades-tags">
                                            {habilidades.map((hab, index) => (
                                                <div
                                                    key={index}
                                                    className="habilidad-tag"
                                                >
                                                    {hab}
                                                </div>

                                            ))}

                                        </div>

                                        {/* TEXTAREA */}
                                        <div className="input-wrap">

                                            <textarea
                                                placeholder="Cuéntanos qué sabes hacer"
                                            ></textarea>

                                        </div>

                                    </div>

                                </div>

                                {/* Botones */}
                                <div className="aplicar-actions">
                                    <button className="btn-guardar">
                                        Guardar después
                                    </button>

                                    <button className="btn-continuar">
                                        Continuar →
                                    </button>

                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                {/* BARRA LATERAL */}
                <Col lg={4}>

                    <div className="sidebar-aplicar">

                        {/* PROGRESO */}
                        <Card className="aplicar-card progreso-card">
                            <Card.Body>
                                <div className="progreso-head">
                                    <span>Paso 1 de 5</span>
                                    <span>20%</span>
                                </div>
                                <ProgressBar now={20} />
                            </Card.Body>
                        </Card>

                        {/* PASOS */}
                        <Card className="aplicar-card pasos-card">
                            <Card.Body>
                                <h3>Tu aplicación</h3>
                                <div className="lista-pasos">

                                    {/* PASO 1 */}
                                    <div className="paso-item active">
                                        <div className="paso-numero">
                                            1
                                        </div>
                                        <div className="paso-texto">
                                            <h4>
                                                Información personal
                                            </h4>

                                            <p>
                                                En progreso
                                            </p>

                                        </div>
                                    </div>

                                    {/* PASO 2 */}
                                    <div className="paso-item">

                                        <div className="paso-numero">
                                            2
                                        </div>
                                        <div className="paso-texto">
                                            <h4>
                                                Experiencia y habilidades
                                            </h4>
                                        </div>
                                    </div>

                                    {/* PASO 3 */}
                                    <div className="paso-item">
                                        <div className="paso-numero">
                                            3
                                        </div>
                                        <div className="paso-texto">
                                            <h4>
                                                Documentos
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>

                        {/* SEGURIDAD */}
                        <Card className="aplicar-card seguridad-card">
                            <Card.Body>
                                <div className="seguridad-top">
                                    <div className="seguridad-icono">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div>
                                        <h4>
                                            Tu información está segura
                                        </h4>
                                        <p>
                                            No compartimos tus datos sin autorización.
                                        </p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default AplicarTrabajo;

