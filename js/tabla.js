const sensores = [
    { nombre: "Control de humo", descripcion: "Los sensores de humo son capaces de detectar el humo de un lugar a tiempo", numero_serie: "1582", estado: "Activo", prioridad: "Alta" },
    { nombre: "Medidor de presión", descripcion: "Los sensores medidores de presión son muy utilizados en el sector agrícola", numero_serie: "1978", estado: "Inactivo", prioridad: "Media" },
    { nombre: "Control de la humedad", descripcion: "Permiten tener controlados factores como el clima o el almacenamiento de productos perecederos", numero_serie: "1956", estado: "Activo", prioridad: "Alta" }
];

function generarTabla() {
    const tabla = document.getElementById('tablaSensores').querySelector('tbody');
    tabla.innerHTML = ''; 

    sensores.forEach((sensor, index) => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${sensor.nombre}</td>
            <td>${sensor.descripcion}</td>
            <td>${sensor.numero_serie}</td>
            <td>${sensor.estado}</td>
            <td>${sensor.prioridad}</td>
            <td>
                <button onclick="editarSensor(${index})">Editar</button>
                <button onclick="eliminarFila(${index})">Eliminar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

function editarSensor(index) {
    const sensor = sensores[index];

    document.getElementById("nombre").value = sensor.nombre;
    document.getElementById("descripcion").value = sensor.descripcion;
    document.getElementById("numero_serie").value = sensor.numero_serie;
    document.getElementById("estado").checked = sensor.estado === "Activo";
    document.getElementById(sensor.prioridad.toLowerCase()).checked = true;

    const guardarBtn = document.getElementById("guardarCambios");
    guardarBtn.style.display = "inline";
    guardarBtn.onclick = function() {
        guardarCambios(index);
    };

    document.getElementById("formularioEdicion").style.display = "block";
}


function guardarCambios(index) {
    sensores[index] = {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        numero_serie: document.getElementById("numero_serie").value,
        estado: document.getElementById("estado").checked ? "Activo" : "Inactivo",
        prioridad: document.querySelector("input[name='prioridad']:checked").value
    };

    generarTabla();
    limpiarFormulario();
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("numero_serie").value = "";
    document.getElementById("estado").checked = false;
    document.querySelector("input[name='prioridad']:checked").checked = false;
    
    document.getElementById("guardarCambios").style.display = "none";
}

function eliminarFila(index) {
    sensores.splice(index, 1);
    generarTabla();
}

function filtrarTabla() {
    const buscador = document.getElementById('buscador').value.toLowerCase();
    if (buscador.length < 3) {
        generarTabla();
        return;
    }

    const tabla = document.getElementById('tablaSensores').querySelector('tbody');
    tabla.innerHTML = '';

    const resultados = sensores.filter(sensor =>
        sensor.nombre.toLowerCase().includes(buscador) ||
        sensor.descripcion.toLowerCase().includes(buscador)
    );

    resultados.forEach((sensor, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${sensor.nombre}</td>
            <td>${sensor.descripcion}</td>
            <td>${sensor.numero_serie}</td>
            <td>${sensor.estado}</td>
            <td>${sensor.prioridad}</td>
            <td>
                <button onclick="eliminarFila(${index})">Eliminar</button>
                <button onclick="editarSensor(${index})">Editar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

window.onload = generarTabla;

document.getElementById('buscador').addEventListener('input', filtrarTabla);