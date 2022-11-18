var listaProductos = []
var valor=-1
var usuario=-1
// var remplaza = /\+/gi;
// var url = window.location.href;

// url = unescape(url);
// url = url.replace(remplaza, " ");
// url = url.toUpperCase();

// function obtener_valor(variable) {
//     var variable_may = variable.toUpperCase();
//     var variable_pos = url.indexOf(variable_may);

//     if (variable_pos != -1) {
//         var pos_separador = url.indexOf("&", variable_pos);

//         if (pos_separador != -1) {
//             return url.substring(variable_pos + variable_may.length + 1, pos_separador);
//         } else {
//             return url.substring(variable_pos + variable_may.length + 1, url.length);
//         }
//     } else {
//         return "NO_ENCONTRADO";
//     }
// }



// var valor = obtener_valor("id");



// function cargarProductos() {
//     listaProductos.push(new Producto("1", "Air Force1", "Nike", "80","zapatillas/AirForce1/foto1.png","zapatillas/AirForce1/foto2.png","zapatillas/AirForce1/foto3.png"));
//     listaProductos.push(new Producto("2", "Air Jordan", "Nike", "90","zapatillas/AirJordan1/foto1.PNG","zapatillas/AirJordan1/foto2.PNG","zapatillas/AirJordan1/foto3.PNG"));
//     listaProductos.push(new Producto("3", "Superstars", "Adidas", "50","zapatillas/Superstars/foto1.PNG","zapatillas/Superstars/foto2.PNG","zapatillas/Superstars/foto3.PNG"));

// }
// function cargarProductos() {
//     listaProductos.push(new Producto("0", "Air Force1", "Zapatillas Nike", "80","zapatillas/AirForce1/foto1.png","zapatillas/AirForce1/foto2.png","zapatillas/AirForce1/foto3.png"));
//     $.getJSON("./assets/ficheros/zapatillas.txt", function (datos) {
//         let listaTxt = datos;
//         listaTxt.forEach(element => {
//             listaProductos.push(new Producto(element.id,element.nombre,element.descripcion,element.precio,element.foto,element.foto2,element.foto3));
//         });
//         // mostrarPersonas(listaPersonas);
//     });
// }
window.onload = function () {
    if(sessionStorage.getItem("producto")){
        valor=JSON.parse(sessionStorage.getItem("producto"))
    }
   
    if(valor!=-1){
        if (sessionStorage.getItem("productos")){
            listaProductos = JSON.parse(sessionStorage.getItem("productos"));
        
        }
    cargarDatos()
    document.getElementById("btnComprar").addEventListener("click", comprar)
    document.getElementById("btnCarrito").addEventListener("mouseover", mostrarCarrito)
    // Cierro Carrito
    document.getElementById("seccion").addEventListener("mouseover", function () {
        document.getElementById("carrito").style.display = "none";
    });
    comprobarSesion()
    if (sessionStorage.getItem(`carrito${usuario}`)) {
        carrito = JSON.parse(sessionStorage.getItem(`carrito${usuario}`));
        document.getElementById("cantidadCarrito").innerHTML = carrito.length
    } else {
        document.getElementById("cantidadCarrito").innerHTML = 0
    }
    }
 
    
}
function comprobarSesion(){
    if (sessionStorage.getItem("usuario")){
        
        document.getElementById("btnIniciaSesion").style.visibility="hidden"
        document.getElementById("btnRegistro").style.visibility="hidden"
        document.getElementById("btnCerrarSesion").style.visibility="visible"
        document.getElementById("btnCerrarSesion").addEventListener("click",cerrarSesion)
        usuario=JSON.parse(sessionStorage.getItem("usuario")).id
        return true
    }else{
        document.getElementById("btnCerrarSesion").style.visibility="hidden"
        document.getElementById("btnIniciaSesion").style.visibility="visible"
        document.getElementById("btnRegistro").style.visibility="visible"
        usuario=-1
       return false
    }
}
function cerrarSesion(){
    sessionStorage.removeItem("usuario")
    comprobarSesion()
    mostrarCarrito()
    carrito=[]
}

function cargarDatos() {
    var posicion = -1;
    posicion = listaProductos.findIndex(elemento => elemento.id == valor)

    document.getElementById("cajaNombre").innerHTML=listaProductos[posicion].nombre
    document.getElementById("cajaPrecio").innerHTML=listaProductos[posicion].precio+"€"
    
   document.getElementById("cajaDescripcion").innerHTML=listaProductos[posicion].marca
   document.getElementById("cajaFoto1").src=`./assets/img/${listaProductos[posicion].foto}`
   document.getElementById("cajaFoto2").src=`./assets/img/${listaProductos[posicion].foto2}`
   document.getElementById("cajaFoto3").src=`./assets/img/${listaProductos[posicion].foto3}`
   
    
}

function comprar() {
    if(comprobarSesion()){
        var posicion = -1;
    posicion = listaProductos.findIndex(elemento => elemento.id == valor)
    var nombre = listaProductos[posicion].nombre
    var cantidad = 1

    var carrito = [];
    if (sessionStorage.getItem(`carrito${usuario}`)) carrito = JSON.parse(sessionStorage.getItem(`carrito${usuario}`));

    var producto = carrito.find(elemento => elemento.nombre == nombre);
    if (producto) {
        producto.cantidad += cantidad;
    } else {
        var
            compra = {
                "nombre": nombre,

                "precio": listaProductos[posicion].precio,
                "cantidad": cantidad,
                "imagen":listaProductos[posicion].foto
            }
        carrito.push(compra);
    }
    sessionStorage.setItem(`carrito${usuario}`, JSON.stringify(carrito));
    if (sessionStorage.getItem(`carrito${usuario}`)) carrito = JSON.parse(sessionStorage.getItem(`carrito${usuario}`));
    document.getElementById("cantidadCarrito").innerHTML = carrito.length
}else{
    alert("No puedes comprar si no inicias sesion")
}
    }
    
function mostrarCarrito() {
    var carrito = []
    if (sessionStorage.getItem(`carrito${usuario}`)){
        carrito = JSON.parse(sessionStorage.getItem(`carrito${usuario}`));
        document.getElementById("cantidadCarrito").innerHTML=carrito.length
    }else{
        document.getElementById("cantidadCarrito").innerHTML=0
    }
   

    var capaCarrito = document.getElementById("carrito");
    capaCarrito.innerHTML = "";
    capaCarrito.style.display = "block";
    
    var imgCerrar = document.createElement("img");
    imgCerrar.src = "./assets/img/cerrar.png";
    imgCerrar.id = "imgCerrar";
    imgCerrar.classList.add("reducida");
    capaCarrito.appendChild(imgCerrar);
    imgCerrar.addEventListener("click", function() {
        document.getElementById("carrito").style.display = "none";
    });
   
    var total, totaltotal = 0;
    for (i = 0; i < carrito.length; i++) {
        total = parseInt(carrito[i].precio) * parseInt(carrito[i].cantidad);
        totaltotal += total;
        var parrafo = document.createElement("p");
        capaCarrito.appendChild(parrafo);
        var img = document.createElement("img");
        img.src =`./assets/img/${carrito[i].imagen}`
        img.className = "reducida";
        parrafo.appendChild(img);

        var span = document.createElement("span");
        span.appendChild(document.createTextNode("  " + carrito[i].nombre));
        span.className="colorPagina"
        parrafo.appendChild(span);
        var span = document.createElement("span");
        span.appendChild(document.createTextNode(" " + carrito[i].cantidad));
        parrafo.appendChild(span);
        var span = document.createElement("span");
        span.appendChild(document.createTextNode("  " + total+"€"));
        parrafo.appendChild(span);

        var img = document.createElement("img");
        img.src =  "./assets/img/cerrar.png";
        img.className = "reducida";
        img.style.marginLeft="3px"
        img.dato = i;
        img.addEventListener("click", eliminar)
        parrafo.appendChild(img);

    }
    var parrafo = document.createElement("p");
    capaCarrito.appendChild(parrafo);
    var span = document.createElement("span");
    span.appendChild(document.createTextNode("TOTAL " + totaltotal+"€"));
    parrafo.appendChild(span);
    var boton = document.createElement("button");
    boton.type = "button";
     //Si hay carrito pongo evento al boton comprar
     if (sessionStorage.getItem(`carrito${usuario}`)){
        boton.addEventListener("click", cargarPaginaCarrito);
    }
    boton.appendChild(document.createTextNode("Comprar"));
    boton.style.marginLeft="3px"
    parrafo.appendChild(boton);
}
function cargarPaginaCarrito(){
    location.href="pantallaCompra.html"
}
function eliminar() {
    var indice = event.target.dato;
    var carrito = []
    if (sessionStorage.getItem(`carrito${usuario}`)) carrito = JSON.parse(sessionStorage.getItem(`carrito${usuario}`));
    carrito.splice(indice, 1);
    sessionStorage.setItem(`carrito${usuario}`, JSON.stringify(carrito));
    mostrarCarrito();


}


