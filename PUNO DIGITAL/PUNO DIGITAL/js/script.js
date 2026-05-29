  // =========================
// MODO OSCURO CON LOCALSTORAGE
// =========================
const botonModo = document.getElementById("btnModo");

if (localStorage.getItem("modo") === "oscuro") {
  document.body.classList.add("modo-oscuro");
  if (botonModo) botonModo.textContent = "Modo claro";
}

if (botonModo) {
  botonModo.addEventListener("click", function () {
    document.body.classList.toggle("modo-oscuro");

    if (document.body.classList.contains("modo-oscuro")) {
      localStorage.setItem("modo", "oscuro");
      botonModo.textContent = "Modo claro";
    } else {
      localStorage.setItem("modo", "claro");
      botonModo.textContent = "Modo oscuro";
    }
  });
}

// =========================
// CARGAR LUGARES DESDE JSON
// =========================
const listaLugares = document.getElementById("listaLugares");
let lugares = [];

if (listaLugares) {
  fetch("data/datos.json")
    .then(respuesta => respuesta.json())
    .then(datos => {
      lugares = datos.lugares;
      mostrarLugares(lugares);
    })
    .catch(error => {
      listaLugares.innerHTML = "<p>No se pudo cargar el archivo JSON.</p>";
      console.log(error);
    });
}

function mostrarLugares(lista) {
  listaLugares.innerHTML = "";

  lista.forEach(lugar => {
    const card = document.createElement("article");
    card.className = "lugar-card";

    card.innerHTML = `
      <span class="badge text-bg-warning mb-2">${lugar.categoria}</span>
      <h3>${lugar.nombre}</h3>
      <p>${lugar.descripcion}</p>
      <small>Costo estimado: S/ ${lugar.costo}</small>
    `;

    listaLugares.appendChild(card);
  });
}

// =========================
// FORMULARIO DE ITINERARIO
// =========================
const formItinerario = document.getElementById("formItinerario");
const mensaje = document.getElementById("mensaje");
const resultado = document.getElementById("resultadoItinerario");

if (formItinerario) {
  formItinerario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre");
    const dias = document.getElementById("dias");
    const personas = document.getElementById("personas");
    const tipoViaje = document.getElementById("tipoViaje");
    const presupuesto = document.getElementById("presupuesto");

    // Validación nativa del navegador
    if (!formItinerario.checkValidity()) {
      mensaje.className = "alert alert-danger";
      mensaje.textContent = "Por favor completa bien todos los datos del formulario.";
      formItinerario.classList.add("was-validated");
      return;
    }

    let costoPorDia = 0;

    if (tipoViaje.value === "economico") {
      costoPorDia = 70;
    } else if (tipoViaje.value === "normal") {
      costoPorDia = 120;
    } else {
      costoPorDia = 180;
    }

    const total = Number(dias.value) * Number(personas.value) * costoPorDia;
    const presupuestoTotal = Number(presupuesto.value) * Number(personas.value);

    let lugaresElegidos = lugares.slice(0, Number(dias.value) * 2);

    if (lugaresElegidos.length === 0) {
      lugaresElegidos = [
        { nombre: "Lago Titicaca", descripcion: "Lugar principal de visita en Puno." },
        { nombre: "Plaza Mayor de Puno", descripcion: "Zona céntrica de la ciudad." }
      ];
    }

    if (presupuestoTotal >= total) {
      mensaje.className = "alert alert-success";
      mensaje.textContent = "Tu presupuesto sí alcanza para este viaje.";
    } else {
      mensaje.className = "alert alert-warning";
      mensaje.textContent = "Tu presupuesto podría ser bajo. Puedes reducir días o elegir viaje económico.";
    }

    let html = `
      <h3>Itinerario para ${nombre.value}</h3>
      <p><strong>Días:</strong> ${dias.value}</p>
      <p><strong>Personas:</strong> ${personas.value}</p>
      <p><strong>Tipo de viaje:</strong> ${tipoViaje.value}</p>
      <p><strong>Costo estimado:</strong> S/ ${total}</p>
      <hr>
      <h4>Lugares recomendados:</h4>
      <ol>
    `;

    lugaresElegidos.forEach(lugar => {
      html += `<li><strong>${lugar.nombre}:</strong> ${lugar.descripcion}</li>`;
    });

    html += `</ol>`;
    resultado.innerHTML = html;
  });
}

// =========================
// MAPA SIMPLE CON EVENTOS CLICK
// =========================
const puntos = document.querySelectorAll(".punto");
const textoMapa = document.getElementById("textoMapa");

puntos.forEach(punto => {
  punto.addEventListener("click", function () {
    textoMapa.textContent = "Lugar seleccionado: " + punto.dataset.lugar;
  });
});

// =========================
// EVENTO SCROLL SIMPLE
// =========================
window.addEventListener("scroll", function () {
  const nav = document.querySelector(".navbar-puno");

  if (nav && window.scrollY > 50) {
    nav.style.boxShadow = "0 3px 10px rgba(0,0,0,0.3)";
  } else if (nav) {
    nav.style.boxShadow = "none";
  }
});
