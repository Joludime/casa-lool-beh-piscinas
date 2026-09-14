/* ==================================================
   ELEMENTOS DE LA PÁGINA
   ================================================== */

const botonAbrir = document.querySelector("#abrir-formulario");
const botonCerrar = document.querySelector("#cerrar-formulario");
const ventanaCotizacion = document.querySelector(
    "#ventana-cotizacion"
);
const formulario = document.querySelector(
    "#formulario-cotizacion"
);
const campoFecha = document.querySelector("#fecha");


/* ==================================================
   NÚMERO DE WHATSAPP
   Se escribe con el código de país, sin espacios ni símbolos.
   ================================================== */

const numeroWhatsApp = "527772755235";


/* ==================================================
   EVITAR QUE SE ELIJA UNA FECHA ANTERIOR
   ================================================== */

const fechaActual = new Date();

const anioActual = fechaActual.getFullYear();

const mesActual = String(
    fechaActual.getMonth() + 1
).padStart(2, "0");

const diaActual = String(
    fechaActual.getDate()
).padStart(2, "0");

campoFecha.min = `${anioActual}-${mesActual}-${diaActual}`;


/* ==================================================
   ABRIR EL FORMULARIO
   ================================================== */

botonAbrir.addEventListener("click", () => {
    ventanaCotizacion.showModal();
});


/* ==================================================
   CERRAR EL FORMULARIO
   ================================================== */

botonCerrar.addEventListener("click", () => {
    ventanaCotizacion.close();
});


/* ==================================================
   CERRAR AL TOCAR FUERA DEL FORMULARIO
   ================================================== */

ventanaCotizacion.addEventListener("click", (evento) => {

    const medidasVentana =
        ventanaCotizacion.getBoundingClientRect();

    const clicDentro =
        evento.clientX >= medidasVentana.left &&
        evento.clientX <= medidasVentana.right &&
        evento.clientY >= medidasVentana.top &&
        evento.clientY <= medidasVentana.bottom;

    if (!clicDentro) {
        ventanaCotizacion.close();
    }
});


/* ==================================================
   DAR FORMATO A LA FECHA
   ================================================== */

function formatearFecha(fechaSeleccionada) {

    const fecha = new Date(
        `${fechaSeleccionada}T00:00:00`
    );

    return fecha.toLocaleDateString("es-MX", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}


/* ==================================================
   CREAR Y ENVIAR EL MENSAJE POR WHATSAPP
   ================================================== */

formulario.addEventListener("submit", (evento) => {

    evento.preventDefault();

    const nombre = document.querySelector("#nombre").value.trim();
    const largo = document.querySelector("#largo").value;
    const ancho = document.querySelector("#ancho").value;
    const profundidad =
        document.querySelector("#profundidad").value;

    const ubicacion =
        document.querySelector("#ubicacion").value.trim();

    const fecha = document.querySelector("#fecha").value;
    const horario = document.querySelector("#horario").value;

    const comentarios =
        document.querySelector("#comentarios").value.trim();

    const fechaFormateada = formatearFecha(fecha);

    const comentariosCliente =
        comentarios ||
        "No agregó comentarios adicionales.";

    const mensaje = `Hola, José Luis.

Vi la página de Casa Lool Beh Piscinas y me gustaría solicitar una cotización.

*DATOS DEL CLIENTE*

Nombre: ${nombre}

*MEDIDAS APROXIMADAS DE LA PISCINA*

Largo: ${largo} metros
Ancho: ${ancho} metros
Profundidad: ${profundidad} metros

*UBICACIÓN*

Colonia o ubicación: ${ubicacion}

*FECHA Y HORARIO PREFERIDOS*

Fecha: ${fechaFormateada}
Horario: ${horario}

*COMENTARIOS*

${comentariosCliente}

Quedo pendiente de tu cotización y disponibilidad. Gracias.`;

    const mensajeCodificado = encodeURIComponent(mensaje);

    const enlaceWhatsApp =
        `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;

    window.open(
        enlaceWhatsApp,
        "_blank",
        "noopener,noreferrer"
    );
});