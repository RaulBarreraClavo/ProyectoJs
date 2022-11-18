var listaUsuarios = [];
if (sessionStorage.getItem("usuarios")){
    listaUsuarios = JSON.parse(sessionStorage.getItem("usuarios"));

}else{
   cargarUsuarios()
}

function cargarUsuarios() {
    listaUsuarios.push(new Usuario(1,"Admin", "1234"));
    listaUsuarios.push(new Usuario(2,"Paula", "4321"));
    listaUsuarios.push(new Usuario(3,"Raul", "abcd"));
    listaUsuarios.push(new Usuario(4,"Maria", "dcba"));

}
// function cargarUsuarios() {
//     $.getJSON("./assets/ficheros/usuarios.txt", function (datos) {
//         listaUsuarios = datos;
//         // mostrarPersonas(listaPersonas);
//     });
// }





function comprobarUsuario() {
  
    var cajaUsuario = document.getElementById("usuario");
    var cajaClave = document.getElementById("clave");

    /*if (listaUsuarios.find((elemento) => elemento[0] == cajaUsuario.value &&
              elemento[1] == cajaClave.value)) {
          location.href = "aterrizaje.html";
      } else {
          alert("ERROR");
      }*/

      let posicion=listaUsuarios.findIndex((elemento) => elemento.nombre == cajaUsuario.value &&
        elemento.contraseña == cajaClave.value)
    if (posicion!=-1) {
        location.href = "tienda.html";
        sessionStorage.setItem("usuario",JSON.stringify(listaUsuarios[posicion]))
    } else {
        document.getElementById("error").style.display = "block";
    }
}

function quitarError() {
    document.getElementById("error").style.display = "none";
}


function comprobarRegistro() {
    var cajaUsuario = document.getElementById("usuario");
    var cajaClave = document.getElementById("clave");
    var cajaClaveConfirmada = document.getElementById("claveConfirmada");

    /*if (listaUsuarios.find((elemento) => elemento[0] == cajaUsuario.value &&
              elemento[1] == cajaClave.value)) {
          location.href = "aterrizaje.html";
      } else {
          alert("ERROR");
      }*/
    if (cajaClave.value == cajaClaveConfirmada.value) {
        if (!listaUsuarios.filter((elemento) => elemento.nombre == cajaUsuario.value
        ).length != 0) {
            addPersona(cajaUsuario.value,cajaClave.value);
        } else {
            document.getElementById("error").style.display = "block";
            document.getElementById("error").style.innerHTML = "El usuario ya existe"
        }
    } else {
        document.getElementById("error").style.display = "block";
        document.getElementById("error").innerHTML = "La contraseña y la confirmacion no coinciden";
    }




}

function addPersona(nombre,contraseña) {
//   let ultimoid=listaUsuarios[listaUsuarios.length-1].id
//     let persona = `{
//         "id":${ultimoid+1},
//         "nombre": ${nombre},
//         "contraseña": ${contraseña}
//     }`
  
//     $.post("./assets/php/anadirUsuario.php", persona, function (respuesta) {
//         if (respuesta == "OK") {
//             alert("persona grabada");
//            location.href="login.html"
//         } else {
//             alert("No se ha podido grabar");
//         }
//     })
let ultimoid=listaUsuarios[listaUsuarios.length-1].id
listaUsuarios.push(new Usuario(ultimoid+1,nombre,contraseña))

sessionStorage.setItem("usuarios", JSON.stringify(listaUsuarios));

location.href="login.html"

}