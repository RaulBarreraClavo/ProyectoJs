var listaUsuarios = [];
cargarUsuarios();

function cargarUsuarios() {
    listaUsuarios.push(["pedro", "1234"]);
    listaUsuarios.push(["patricia", "4321"]);
    listaUsuarios.push(["paloma", "2222"]);
    listaUsuarios.push(["pilar", "1111"]);
    listaUsuarios.push(["pablo", "2221"]);
}

function comprobarUsuario() {
    var cajaUsuario = document.getElementById("usuario");
    var cajaClave = document.getElementById("clave");

    /*if (listaUsuarios.find((elemento) => elemento[0] == cajaUsuario.value &&
              elemento[1] == cajaClave.value)) {
          location.href = "aterrizaje.html";
      } else {
          alert("ERROR");
      }*/


    if (listaUsuarios.filter((elemento) => elemento[0] == cajaUsuario.value &&
            elemento[1] == cajaClave.value).length != 0) {
        location.href = "tienda.html";
    } else {
        document.getElementById("error").style.display = "block";
    }
}

function quitarError() {
    document.getElementById("error").style.display = "none";
}