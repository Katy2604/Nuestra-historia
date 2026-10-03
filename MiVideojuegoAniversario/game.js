// ==============================
// ELEMENTOS DEL HTML
// ==============================

const pantallaInicio =
    document.getElementById("pantallaInicio");

const juego =
    document.getElementById("juego");

const btnComenzar =
    document.getElementById("btnComenzar");

const personaje =
    document.getElementById("personaje");

const escenario =
    document.getElementById("escenario");

const contador =
    document.getElementById("contador");


// ==============================
// VENTANA DE RECUERDOS
// ==============================

const ventanaRecuerdo =
    document.getElementById("ventanaRecuerdo");

const tituloRecuerdo =
    document.getElementById("tituloRecuerdo");

const textoRecuerdo =
    document.getElementById("textoRecuerdo");

const imagenRecuerdo =
    document.getElementById("imagenRecuerdo");

const btnContinuar =
    document.getElementById("btnContinuar");


// ==============================
// PANTALLA FINAL
// ==============================

const pantallaFinal =
    document.getElementById("pantallaFinal");

const btnCarta =
    document.getElementById("btnCarta");


// ==============================
// CARTA FINAL
// ==============================

const cartaFinal =
    document.getElementById("cartaFinal");

const btnCerrarCarta =
    document.getElementById("btnCerrarCarta");

const textoCarta =
    document.getElementById("textoCarta");


// ==============================
// MÚSICA
// ==============================

const musicaJuego =
    document.getElementById("musicaJuego");

const musicaRecuerdos = [

    document.getElementById("musicaRecuerdo1"),

    document.getElementById("musicaRecuerdo2"),

    document.getElementById("musicaRecuerdo3"),

    document.getElementById("musicaRecuerdo4"),

    document.getElementById("musicaRecuerdo5")

];

const musicaFinal =
    document.getElementById("musicaFinal");


// ==============================
// VOLUMEN
// ==============================

musicaJuego.volume = 0.35;

musicaRecuerdos.forEach(function (musica) {

    musica.volume = 0.50;

});

musicaFinal.volume = 0.55;


// ==============================
// CORAZONES
// ==============================

const corazonesJuego = [

    document.getElementById("corazon1"),

    document.getElementById("corazon2"),

    document.getElementById("corazon3"),

    document.getElementById("corazon4"),

    document.getElementById("corazon5")

];


// ==============================
// VARIABLES DEL JUGADOR
// ==============================

let posicionX = 100;

let posicionY = 250;

let corazones = 0;

const velocidad = 10;


// ==============================
// RECUERDOS
// ==============================

const recuerdos = [

    {
        titulo: "❤️ El comienzo de nuestra historia",

        imagen: "Imagenes/Recuerdo1.jpeg",

        texto:
            "El día que nos hicimos novios. " +
            "Quién diría que aquel momento sería el comienzo " +
            "de una historia que tres años después seguiríamos escribiendo juntos. ❤️✨"
    },

    {
        titulo: "💕 Una cita para recordar",

        imagen: "Imagenes/Recuerdo2.jpeg",

        texto:
            "Nuestro 14 de febrero en el Callejón del beso de " +
            "Aguascalientes. Una de esas citas que se quedan " +
            "guardadas en el corazón porque lo importante no era " +
            "el lugar, sino compartirlo contigo. ❤️✨"
    },

    {
        titulo: "💗 Conocernos un poquito más",

        imagen: "Imagenes/Recuerdo3.jpeg",

        texto:
            "Nuestro primer taller para novios. " +
            "Un momento que nos permitió conocernos un poco más, " +
            "hablar de nuestra historia y cerrar algunos ciclos " +
            "para continuar creciendo juntos. ❤️✨"
    },

    {
        titulo: "💖 Todo lo que hemos vivido",

        imagen: "Imagenes/Recuerdo4.jpeg",

        texto:
            "Tres años están llenos de pequeños momentos: " +
            "risas, aventuras, aprendizajes y recuerdos que poco " +
            "a poco se convierten en nuestra historia. ❤️✨"
    },

    {
        titulo: "💘 Tres años contigo",

        imagen: "Imagenes/Recuerdo5.jpeg",

        texto:
            "Y llegamos hasta aquí... tres años de nuestra historia. " +
            "Gracias por cada momento, cada aprendizaje y cada recuerdo. " +
            "Esta aventura todavía tiene muchísimas páginas por escribir. ❤️✨"
    }

];


// ==============================
// INICIAR JUEGO
// ==============================

btnComenzar.addEventListener("click", function () {

    pantallaInicio.style.display = "none";

    juego.style.display = "block";

    musicaJuego.currentTime = 0;

    musicaJuego.play().catch(function (error) {

        console.log(
            "No se pudo iniciar la música:",
            error
        );

    });

});


// ==============================
// MOVIMIENTO
// ==============================

document.addEventListener("keydown", function (evento) {

    const tecla =
        evento.key.toLowerCase();


    switch (tecla) {

        case "arrowup":
        case "w":

            posicionY -= velocidad;

            break;


        case "arrowdown":
        case "s":

            posicionY += velocidad;

            break;


        case "arrowleft":
        case "a":

            posicionX -= velocidad;

            break;


        case "arrowright":
        case "d":

            posicionX += velocidad;

            break;


        default:

            return;
    }


    // Evitar que las flechas muevan la página

    evento.preventDefault();


    // ==============================
    // LÍMITES
    // ==============================

    const anchoEscenario =
        escenario.clientWidth;

    const altoEscenario =
        escenario.clientHeight;

    const anchoPersonaje =
        personaje.offsetWidth;

    const altoPersonaje =
        personaje.offsetHeight;


    if (posicionX < 0) {

        posicionX = 0;

    }


    if (posicionY < 0) {

        posicionY = 0;

    }


    if (
        posicionX >
        anchoEscenario - anchoPersonaje
    ) {

        posicionX =
            anchoEscenario - anchoPersonaje;

    }


    if (
        posicionY >
        altoEscenario - altoPersonaje
    ) {

        posicionY =
            altoEscenario - altoPersonaje;

    }


    // ==============================
    // ACTUALIZAR PERSONAJE
    // ==============================

    personaje.style.left =
        posicionX + "px";

    personaje.style.top =
        posicionY + "px";


    // ==============================
    // COMPROBAR COLISIÓN
    // ==============================

    comprobarColision();

});


// ==============================
// DETECTAR COLISIÓN
// ==============================

function comprobarColision() {

    if (corazones >= 5) {

        return;

    }


    const corazonActual =
        corazonesJuego[corazones];


    if (!corazonActual) {

        return;

    }


    const jugador =
        personaje.getBoundingClientRect();

    const objeto =
        corazonActual.getBoundingClientRect();


    const colision =

        jugador.left < objeto.right &&

        jugador.right > objeto.left &&

        jugador.top < objeto.bottom &&

        jugador.bottom > objeto.top;


    if (colision) {

        recogerCorazon();

    }

}


// ==============================
// RECOGER CORAZÓN
// ==============================

function recogerCorazon() {

    const indiceRecuerdo =
        corazones;


    const corazonActual =
        corazonesJuego[indiceRecuerdo];


    // Ocultar corazón

    corazonActual.classList.add("oculto");


    // Actualizar contador

    corazones++;

    contador.textContent =
        corazones;


    // ==============================
    // PAUSAR MÚSICA DEL JUEGO
    // ==============================

    musicaJuego.pause();


    // ==============================
    // MOSTRAR RECUERDO
    // ==============================

    mostrarRecuerdo(indiceRecuerdo);


    // ==============================
    // REPRODUCIR MÚSICA DEL RECUERDO
    // ==============================

    reproducirMusicaRecuerdo(
        indiceRecuerdo
    );

}


// ==============================
// REPRODUCIR MÚSICA DEL RECUERDO
// ==============================

function reproducirMusicaRecuerdo(indice) {

    // Detener todas las canciones

    musicaRecuerdos.forEach(function (musica) {

        musica.pause();

        musica.currentTime = 0;

    });


    // Obtener la canción correspondiente

    const musica =
        musicaRecuerdos[indice];


    if (!musica) {

        return;

    }


    musica.currentTime = 0;


    musica.play().catch(function (error) {

        console.log(
            "No se pudo reproducir la música del recuerdo:",
            error
        );

    });

}


// ==============================
// MOSTRAR RECUERDO
// ==============================

function mostrarRecuerdo(numero) {

    const recuerdo =
        recuerdos[numero];


    if (!recuerdo) {

        return;

    }


    // Título

    tituloRecuerdo.textContent =
        recuerdo.titulo;


    // Texto

    textoRecuerdo.textContent =
        recuerdo.texto;


    // Imagen

    if (recuerdo.imagen !== "") {

        imagenRecuerdo.src =
            recuerdo.imagen;

        imagenRecuerdo.style.display =
            "block";

    }
    else {

        imagenRecuerdo.style.display =
            "none";

    }


    // Mostrar ventana

    ventanaRecuerdo.classList.remove(
        "oculto"
    );

}


// ==============================
// BOTÓN CONTINUAR
// ==============================

btnContinuar.addEventListener(
    "click",
    function () {

        // Ocultar tarjeta

        ventanaRecuerdo.classList.add(
            "oculto"
        );


        // ==============================
        // DETENER MÚSICA DEL RECUERDO
        // ==============================

        musicaRecuerdos.forEach(
            function (musica) {

                musica.pause();

                musica.currentTime = 0;

            }
        );


        // ==============================
        // ¿QUEDAN CORAZONES?
        // ==============================

        if (corazones < 5) {

            const siguienteCorazon =
                corazonesJuego[corazones];


            siguienteCorazon.classList.remove(
                "oculto"
            );


            siguienteCorazon.classList.add(
                "aparecer"
            );


            setTimeout(function () {

                siguienteCorazon.classList.remove(
                    "aparecer"
                );

            }, 1500);


            // ==============================
            // REGRESAR MÚSICA DEL JUEGO
            // ==============================

            musicaJuego.play().catch(
                function (error) {

                    console.log(
                        "No se pudo reproducir la música:",
                        error
                    );

                }
            );

        }
        else {

            // ==============================
            // TERMINÓ EL JUEGO
            // ==============================

            mostrarFinal();

        }

    }
);


// ==============================
// MOSTRAR FINAL
// ==============================

function mostrarFinal() {

    // Detener música del juego

    musicaJuego.pause();

    musicaJuego.currentTime = 0;


    // Detener recuerdos

    musicaRecuerdos.forEach(
        function (musica) {

            musica.pause();

            musica.currentTime = 0;

        }
    );


    // Música final

    musicaFinal.currentTime = 0;

    musicaFinal.play().catch(
        function (error) {

            console.log(
                "No se pudo reproducir la música final:",
                error
            );

        }
    );


    // ==============================
    // MOSTRAR PANTALLA FINAL
    // ==============================

    pantallaFinal.classList.remove(
        "oculto"
    );

}


// ==============================
// ABRIR CARTA FINAL
// ==============================

btnCarta.addEventListener(
    "click",
    function () {

        pantallaFinal.classList.add(
            "oculto"
        );


        cartaFinal.classList.remove(
            "oculto"
        );


        escribirCarta();

    }
);
// ==============================
//Cerrar la Carta
// ==============================
btnCerrarCarta.addEventListener("click", function () {

    cancelarEscritura = true;

    escribiendoCarta = false;

    cartaFinal.classList.add("oculto");

    pantallaFinal.classList.remove("oculto");

});


// ==============================
// TEXTO DE LA CARTA
// ==============================

const parrafosCarta = [

    "Tres años...",

    "Parece increíble pensar en todo lo que hemos vivido desde aquel día en que comenzó nuestra historia.",

    "Hemos compartido momentos bonitos, aprendido juntos, conocido nuevas partes de nosotros y también enfrentado momentos que nos han ayudado a crecer.",

    "Gracias por cada recuerdo que hemos construido y por formar parte de esta historia.",

    "Hoy celebramos tres años de nuestra historia, pero esta aventura todavía tiene muchas páginas por escribir. ❤️",

    "Con mucho cariño,\nTu bebé Dory ❤️"

];


// ==============================
// VARIABLES DE ESCRITURA
// ==============================

let escribiendoCarta = false;

let cancelarEscritura = false;


// ==============================
// EFECTO DE ESCRITURA
// ==============================

function escribirCarta() {

    textoCarta.innerHTML = "";

    escribiendoCarta = true;

    cancelarEscritura = false;


    let indiceParrafo = 0;


    function siguienteParrafo() {

        if (
            cancelarEscritura ||
            indiceParrafo >= parrafosCarta.length
        ) {

            escribiendoCarta = false;

            return;

        }


        const parrafo =
            document.createElement("p");


        textoCarta.appendChild(
            parrafo
        );


        const texto =
            parrafosCarta[indiceParrafo];


        let indiceLetra = 0;


        function escribirLetra() {

            if (cancelarEscritura) {

                return;

            }


            if (indiceLetra < texto.length) {

                parrafo.textContent +=
                    texto.charAt(indiceLetra);


                indiceLetra++;


                // AQUÍ ESTABA UNO DE LOS ERRORES

                setTimeout(
                    escribirLetra,
                    35
                );

            }
            else {

                indiceParrafo++;


                setTimeout(
                    siguienteParrafo,
                    400
                );

            }

        }


        escribirLetra();

    }


    siguienteParrafo();

}


// ==============================
// CERRAR CARTA
// ==============================

btnCerrarCarta.addEventListener(
    "click",
    function () {

        cancelarEscritura = true;

        escribiendoCarta = false;


        cartaFinal.classList.add(
            "oculto"
        );


        pantallaFinal.classList.remove(
            "oculto"
        );

    }
);