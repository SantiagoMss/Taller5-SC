const userTable = document.getElementById("user-table");
const tableBody = userTable.getElementsByTagName("tbody")[0];
const searchInput = document.getElementById("search");

fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
        const users = data;

        function populateTable(users) {
            // Borra las filas existentes en la tabla
            tableBody.innerHTML = '';

            users.forEach((user) => {
                const row = tableBody.insertRow(-1);
                row.insertCell(0).innerHTML = user.id;
                row.insertCell(1).innerHTML = user.name;
                row.insertCell(2).innerHTML = user.username;
                row.insertCell(3).innerHTML = user.email;
                const addressCell = row.insertCell(4);
                addressCell.innerHTML = `
                            ${user.address.street}, ${user.address.suite}<br>
                            ${user.address.city}, ${user.address.zipcode}<br>
                            ${user.address.geo.lat}, ${user.address.geo.lng}
                        `;
                row.insertCell(5).innerHTML = user.phone;
                row.insertCell(6).innerHTML = user.website;
                const companyCell = row.insertCell(7);
                companyCell.innerHTML = `
                            ${user.company.name}<br>
                            ${user.company.catchPhrase}<br>
                            ${user.company.bs}
                        `;
            });
        }

        // Inicializa la tabla con todos los usuarios
        populateTable(users);

        // Agrega un listener de eventos al campo de búsqueda
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();

            // Filtra los usuarios que coinciden con el término de búsqueda
            const filteredUsers = users.filter((user) => {
                return (
                    user.name.toLowerCase().includes(searchTerm) ||
                    user.username.toLowerCase().includes(searchTerm) ||
                    user.email.toLowerCase().includes(searchTerm)
                );
            });

            // Actualiza la tabla con los usuarios filtrados
            populateTable(filteredUsers);
        });
    })
    .catch((error) => console.error("Error al cargar los datos: ", error));







const formulario = document.getElementById("registroForm");
const fechaNacimiento = document.getElementById("fechaNacimiento");
const edad = document.getElementById("edad");
const password = document.getElementById("password");
const confirmarPassword = document.getElementById("confirmarPassword");
const mensajePassword = document.getElementById("mensajePassword");
const enfermedades = document.getElementById("enfermedades");
const enfermedadesContagiosas = document.getElementById("enfermedadesContagiosas");
const casillaEnfermedadesContagiosas = document.getElementById("casillaEnfermedadesContagiosas");

// Calcular edad en tiempo real
fechaNacimiento.addEventListener("change", () => {
    const fechaNacimientoValue = new Date(fechaNacimiento.value);
    const hoy = new Date();
    const edadCalculada = hoy.getFullYear() - fechaNacimientoValue.getFullYear();
    edad.textContent = `Edad: ${edadCalculada} años`;
});


// Validar contraseña
password.addEventListener("input", () => {
    const passwordValue = password.value;
    const confirmarPasswordValue = confirmarPassword.value;

    if (confirmarPasswordValue !== passwordValue) {
        mensajePassword.textContent = "Las contraseñas no coinciden";
    } else {
        mensajePassword.textContent = "";
    }
});

confirmarPassword.addEventListener("input", () => {
    const passwordValue = password.value;
    const confirmarPasswordValue = confirmarPassword.value;

    if (confirmarPasswordValue !== passwordValue) {
        mensajePassword.textContent = "Las contraseñas no coinciden";
    } else {
        mensajePassword.textContent = "";
    }
});

enfermedades.addEventListener("change", () => {
    if (enfermedades.value === "si") {
        enfermedadesContagiosas.style.display = "block";
        casillaEnfermedadesContagiosas.required = true;
    } else {
        enfermedadesContagiosas.style.display = "none";
        casillaEnfermedadesContagiosas.required = false;
        casillaEnfermedadesContagiosas.value = ""; // Limpiar el campo si la respuesta es "No"
    }
});

// Validar caracteres extraños en el nombre de usuario
formulario.addEventListener("submit", (event) => {
    const usuarioValue = document.getElementById("usuario").value;
    if (!/^[a-zA-Z0-9]+$/.test(usuarioValue)) {
        alert("El nombre de usuario no debe contener caracteres extraños.");
        event.preventDefault();
    }
});