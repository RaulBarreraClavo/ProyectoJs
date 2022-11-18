window.onload=function(){
  
    document.getElementById("btnCarrito").addEventListener("click",mostrarCarrito)
    if (sessionStorage.getItem("compra")){
        carrito = JSON.parse(sessionStorage.getItem("compra"));
        document.getElementById("cantidadCarrito").innerHTML=carrito.length
    }else{
        document.getElementById("cantidadCarrito").innerHTML=0
    }
}
function mostrarCarrito() {
    var carrito = []
    if (sessionStorage.getItem("compra")){
        carrito = JSON.parse(sessionStorage.getItem("compra"));
        document.getElementById("cantidadCarrito").innerHTML=carrito.length
    }else{
        document.getElementById("cantidadCarrito").innerHTML=0
    }
   

    var capaCarrito = document.getElementById("carrito");
    capaCarrito.innerHTML = "";
    capaCarrito.style.display = "block";
    var imgCerrar = document.createElement("img");
    imgCerrar.src = "cerrar.png";
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
        img.src = carrito[i].imagen;
        img.className = "reducida";
        parrafo.appendChild(img);

        var span = document.createElement("span");
        span.appendChild(document.createTextNode("  " + carrito[i].nombre));
        parrafo.appendChild(span);
        var span = document.createElement("span");
        span.appendChild(document.createTextNode(" " + carrito[i].cantidad));
        parrafo.appendChild(span);
        var span = document.createElement("span");
        span.appendChild(document.createTextNode("  " + total));
        parrafo.appendChild(span);

        var img = document.createElement("img");
        img.src = "cerrar.png";
        img.className = "reducida";
        img.dato = i;
        img.addEventListener("click", eliminar)
        parrafo.appendChild(img);

    }
    var parrafo = document.createElement("p");
    capaCarrito.appendChild(parrafo);
    var span = document.createElement("span");
    span.appendChild(document.createTextNode("TOTAL " + totaltotal));
    parrafo.appendChild(span);
    var boton = document.createElement("button");
    boton.type = "button";
    boton.addEventListener("click", cargarPaginaCarrito);
    boton.appendChild(document.createTextNode("FINALIZAR"));
    parrafo.appendChild(boton);
}
function eliminar() {
    var indice = event.target.dato;
    var carrito = []
    if (sessionStorage.getItem("compra")) carrito = JSON.parse(sessionStorage.getItem("compra"));
    carrito.splice(indice, 1);
    sessionStorage.setItem("compra", JSON.stringify(carrito));
    mostrarCarrito();
   

}