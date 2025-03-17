var cuentas = [
    { nombre: "Mali", saldo: 200, password: "1234", transacciones: [], cuenta: "23.786-4", rut: "18.001.011-2" },
    { nombre: "Gera", saldo: 290, password: "5678", transacciones: [], cuenta: "24.787-5", rut: "18.001.011-3" },
    { nombre: "Maui", saldo: 67, password: "4321", transacciones: [], cuenta: "25.788-6", rut: "18.001.011-4" }
];

let cuentaSeleccionada = null;

function seleccionarCuenta() {
    let nombreCuenta = document.getElementById("cuentaSeleccionada").value;
    cuentaSeleccionada = cuentas.find(cuenta => cuenta.nombre === nombreCuenta);
    if (cuentaSeleccionada) {
        document.getElementById("pantalla").innerHTML = `
            <p>Ingrese tu contraseña:</p>
            <input type='password' id='password'>
            <button onclick='validarPassword()'>Validar</button>
        `;
    } else {
        alert("Cuenta no encontrada. Intente nuevamente.");
    }
}

function validarPassword() {
    let passwordIngresado = document.getElementById("password").value;
    if (passwordIngresado === cuentaSeleccionada.password) {
        mostrarOpciones();
    } else {
        alert("Contraseña incorrecta. Intente nuevamente.");
    }
}

function getFechaHora() {
    let fecha = new Date();
    return fecha.toLocaleString();
}

function mostrarOpciones() {
    document.getElementById("pantalla").innerHTML = `
        <p>Bienvenido (a), ${cuentaSeleccionada.nombre}</p> <p>RUT: ${cuentaSeleccionada.rut}, Número de Cuenta: ${cuentaSeleccionada.cuenta}</p>
        <button onclick='consultarSaldo()'>Consultar saldo</button>
        <button onclick='ingresarMonto()'>Ingresar monto</button>
        <button onclick='retirarMonto()'>Retirar monto</button>
        <button onclick='transferirMonto()'>Transferir dinero</button>
        <button onclick='verTransacciones()'>Ver Extracto</button>
    `;
}

function consultarSaldo() {
    document.getElementById("pantalla").innerHTML = `
        <p>Saldo actual: $${cuentaSeleccionada.saldo}</p>
        <button onclick='mostrarOpciones()'>Regresar</button>
    `;
}

function ingresarMonto() {
    let monto = parseFloat(prompt("Ingrese el monto a depositar:"));
    if (monto > 0) {
        cuentaSeleccionada.saldo += monto;
        cuentaSeleccionada.transacciones.push(`${getFechaHora()}: + $${monto} (Depósito)`);
        alert(`Depósito exitoso. Nuevo saldo: $${cuentaSeleccionada.saldo}`);
    }
    mostrarOpciones();
}

function retirarMonto() {
    let monto = parseFloat(prompt("Ingrese el monto a retirar:"));
    if (monto > 0 && cuentaSeleccionada.saldo - monto >= 10) {
        cuentaSeleccionada.saldo -= monto;
        cuentaSeleccionada.transacciones.push(`${getFechaHora()} - $${monto} (Retiro)`);
        alert(`Retiro exitoso. Nuevo saldo: $${cuentaSeleccionada.saldo}`);
    }
    mostrarOpciones();
}

function transferirMonto() {
    let destinatarioNombre = prompt("Ingrese el nombre de la cuenta destino:");
    let destinatario = cuentas.find(cuenta => cuenta.nombre === destinatarioNombre);
    let monto = parseFloat(prompt("Ingrese el monto a transferir:"));
    if (monto > 0 && destinatario && destinatario !== cuentaSeleccionada) {
        cuentaSeleccionada.saldo -= monto;
        destinatario.saldo += monto;
        cuentaSeleccionada.transacciones.push(`${getFechaHora()}: - $${monto} a ${destinatario.nombre}, Cuenta: ${destinatario.cuenta} (Transferencia)`);
        destinatario.transacciones.push(`${getFechaHora()}: + $${monto} de ${cuentaSeleccionada.nombre}, Cuenta: ${cuentaSeleccionada.cuenta} (Transferencia)`);
        alert("Transferencia realizada con éxito.");
    }
    mostrarOpciones();
}

function verTransacciones() {
    let transaccionesHTML = cuentaSeleccionada.transacciones.length > 0 ? cuentaSeleccionada.transacciones.join("<br>") : "Sin transacciones";
    document.getElementById("pantalla").innerHTML = `<p>Extracto:</p>` + transaccionesHTML + "<br><button onclick='mostrarOpciones()'>Regresar</button>";
}
