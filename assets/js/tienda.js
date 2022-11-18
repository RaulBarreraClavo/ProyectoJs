var listaProductos = [];
var carrito=[];
var listaMarcas=[]
var usuario=-1
onload = () => {
    if (sessionStorage.getItem("productos")){
        listaProductos = JSON.parse(sessionStorage.getItem("productos"));
    
    }else{
       cargarProductos()
       sessionStorage.setItem("productos", JSON.stringify(listaProductos));
    }
    mostrarProductos(listaProductos);
    cargarMarcas(listaProductos)
    cargarRango(listaProductos)
    
    
    document.getElementById("filtro").addEventListener("keyup",filtrar)
    document.getElementById("filtro").tipo=-1
    document.getElementById("btnMenorMayor").tipo=0
    document.getElementById("btnMayorMenor").tipo=1
    document.getElementById("btnMenorMayor").addEventListener("click",filtrar)
    document.getElementById("btnMayorMenor").addEventListener("click",filtrar)
    document.getElementById("selectMarcas").addEventListener("change",filtrar)
    document.getElementById("selectMarcas").tipo=-1
    document.getElementById("rangoPrecio").addEventListener("change",cambiarTextoRango)
    document.getElementById("rangoPrecio").addEventListener("change",filtrar)
    document.getElementById("rangoPrecio").tipo=-1
   
    document.getElementById("btnCarrito").addEventListener("mouseover",mostrarCarrito)
    // Cierro Carrito
    document.getElementById("seccion").addEventListener("mouseover",function() {
       document.getElementById("carrito").style.display = "none";
   });
   comprobarSesion()
   if (sessionStorage.getItem(`carrito${usuario}`)){
       carrito = JSON.parse(sessionStorage.getItem(`carrito${usuario}`));
       document.getElementById("cantidadCarrito").innerHTML=carrito.length
   }else{
       document.getElementById("cantidadCarrito").innerHTML=0
     
   }

  
}
function comprobarSesion(){
    if (sessionStorage.getItem("usuario")){
       
        document.getElementById("btnIniciaSesion").style.visibility="hidden"
        document.getElementById("btnRegistro").style.visibility="hidden"
        document.getElementById("btnCerrarSesion").style.visibility="visible"
        document.getElementById("btnCerrarSesion").addEventListener("click",cerrarSesion)
        usuario=JSON.parse(sessionStorage.getItem("usuario")).id
        
    }else{
        document.getElementById("btnCerrarSesion").style.visibility="hidden"
        document.getElementById("btnIniciaSesion").style.visibility="visible"
        document.getElementById("btnRegistro").style.visibility="visible"
        usuario=-1
    }
}
function cerrarSesion(){
    sessionStorage.removeItem("usuario")
    comprobarSesion()
    filtrar()
    if (sessionStorage.getItem(`carrito${usuario}`)){
        carrito = JSON.parse(sessionStorage.getItem(`carrito${usuario}`));
        document.getElementById("cantidadCarrito").innerHTML=carrito.length
    }else{
        document.getElementById("cantidadCarrito").innerHTML=0
        carrito=[]
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
function cargarProductos() {
    listaProductos.push(new Producto(1, "Air Force1", "Nike", 80,"zapatillas/AirForce1/foto1.png","zapatillas/AirForce1/foto2.png","zapatillas/AirForce1/foto3.png"));
    listaProductos.push(new Producto(2, "Air Jordan", "Nike", 90,"zapatillas/AirJordan1/foto1.PNG","zapatillas/AirJordan1/foto2.PNG","zapatillas/AirJordan1/foto3.PNG"));
    listaProductos.push(new Producto(3, "Superstars", "Adidas", 50,"zapatillas/Superstars/foto1.PNG","zapatillas/Superstars/foto2.PNG","zapatillas/Superstars/foto3.PNG"));

}

// function cargarProductos() {
//     $.getJSON("./assets/ficheros/zapatillas.txt", function (datos) {
//         let listaTxt = datos;
//         listaTxt.forEach(element => {
//             listaProductos.push(new Producto(element.id,element.nombre,element.descripcion,element.precio,element.foto,element.foto2,element.foto3))
//         });
//         // mostrarPersonas(listaPersonas);
//     });
// }

function crearProducto(){
    let id_Nuevo=-1;
    let nombre=document.getElementById("nombreNuevo").value
    let marca=document.getElementById("marcaNuevo").value
    let precio=document.getElementById("precioNuevo").value
    let foto1=document.getElementById("foto1Nuevo").value
    let foto2=document.getElementById("foto2Nuevo").value
    let foto3=document.getElementById("foto3Nuevo").value
    let ruta=`zapatillas/${nombre}/"`

    if(sessionStorage.getItem("productos")){
        id_Nuevo=listaProductos[listaProductos.length-1].id
    }
    precio=parseInt(precio,10)

    listaProductos.push(new Producto(id_Nuevo+1,nombre,marca,precio,`${ruta}${foto1}`,`${ruta}${foto2}`,`${ruta}${foto3}`));
    sessionStorage.setItem("productos", JSON.stringify(listaProductos));
    cargarMarcas(listaProductos)
    cargarRango(listaProductos)
    filtrar()
}
function mostrarProductos(lista) {
    var divProductos = document.getElementById("productos");

    if (sessionStorage.getItem("usuario")){
        if(JSON.parse(sessionStorage.getItem("usuario")).nombre=="Admin"){
        divProductos.innerHTML=`<div id="cardNuevo"   class="col mb-5">
   <div style="background-color: grey;" class="card">
       <!-- Sale badge-->
       <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
       <!-- Product image-->
       <img class="card-img-top" style="height:200px;"  src="assets/img/nuevo.png" />
       <!-- Product details-->
       <div class="card-body p-4 h-50">
           <div class="text-center">
               <!-- Product name-->
               <h5  class="fw-bolder">Añadir zapatilla</h5>
               <!-- Product price-->
               <span style="color:grey;" >s</span>
              
           </div>
       </div>
       <!-- Product actions-->
       <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
           <div class="text-center"><a  class="btn btn-outline-light mt-auto" data-bs-toggle="modal" data-bs-target="#exampleModal">Nuevo</a></div>
       </div>
   </div>
</div>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 style="color:black;" >Nuevo Producto</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form >
      <p  style="color:black;" class="col-lg-2">Nombre: <input id="nombreNuevo" type="text"></p>
      <p style="color:black;"class="col-lg-2">Marca: <input id="marcaNuevo" type="text"></p>
      <p style="color:black;"class="col-lg-2">Precio: <input id="precioNuevo" type="number"></p>
      <p style="color:black;"class="col-lg-2">Foto1: <input id="foto1Nuevo" type="text"></p>
      <p style="color:black;"class="col-lg-2">Foto2: <input id="foto2Nuevo" type="text"></p>
      <p style="color:black;"class="col-lg-2">Foto3: <input id="foto3Nuevo" type="text"></p>
     
  </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button id="btnNuevoProducto" onclick="crearProducto()" data-bs-dismiss="modal" type="button" class="btn btn-primary">Crear</button>
      </div>
    </div>
  </div>
</div>`
lista.forEach((producto) => {

       
    divProductos.innerHTML+=` <div  class="col mb-5">
                    <div ondblclick="modificar()" style="background-color: grey;" class="card">
                        <!-- Sale badge-->
                        <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
                        <!-- Product image-->
                        <img class="card-img-top" style="height:200px;"  src="assets/img/${producto.foto}" />
                        <!-- Product details-->
                        <div class="card-body p-4 h-50">
                            <div class="text-center">
                                <!-- Product name-->
                                <h5  class="fw-bolder">${producto.nombre}<img onclick="eliminarZapatilla(${producto.id})" style="width:30px;" src="./assets/img/borrar.png"></img></h5>
                                <!-- Product price-->
                                <span >${producto.precio}€ </span>
                               
                            </div>
                        </div>
                        <!-- Product actions-->
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a onclick="visualizarProducto(${producto.id})" class="btn btn-outline-light mt-auto"">Comprar</a>
                            <a style="padding-top:10px;" class="btn btn-outline-light mt-auto" data-bs-toggle="modal" data-bs-target="#modalmodificar">Modificar</a></div>
                        </div>
                    </div>
                </div>`
    
 
});
divProductos.innerHTML+=`<div class="modal fade" id="modalmodificar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h1 style="color:black;" >Modificar Producto</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
    <form >
    <p  style="color:black;" class="col-lg-2">Nombre: <input id="nombreNuevo" type="text"></p>
    <p style="color:black;"class="col-lg-2">Marca: <input id="marcaNuevo" type="text"></p>
    <p style="color:black;"class="col-lg-2">Precio: <input id="precioNuevo" type="number"></p>
    <p style="color:black;"class="col-lg-2">Foto1: <input id="foto1Nuevo" type="text"></p>
    <p style="color:black;"class="col-lg-2">Foto2: <input id="foto2Nuevo" type="text"></p>
    <p style="color:black;"class="col-lg-2">Foto3: <input id="foto3Nuevo" type="text"></p>
   
</form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button id="btnNuevoProducto" onclick="crearProducto()" data-bs-dismiss="modal" type="button" class="btn btn-primary">Crear</button>
    </div>
  </div>
</div>
</div>`

    }else{
        divProductos.innerHTML=""
        lista.forEach((producto) => {

       
            divProductos.innerHTML+=` <div  class="col mb-5">
                            <div style="background-color: grey;" class="card">
                                <!-- Sale badge-->
                                <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
                                <!-- Product image-->
                                <img class="card-img-top" style="height:200px;"  src="assets/img/${producto.foto}" />
                                <!-- Product details-->
                                <div class="card-body p-4 h-50">
                                    <div class="text-center">
                                        <!-- Product name-->
                                        <h5  class="fw-bolder">${producto.nombre}</h5>
                                        <!-- Product price-->
                                        <span >${producto.precio}€</span>
                                       
                                    </div>
                                </div>
                                <!-- Product actions-->
                                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div class="text-center"><a onclick="visualizarProducto(${producto.id})" class="btn btn-outline-light mt-auto"">Comprar</a></div>
                                </div>
                            </div>
                        </div>`
            
         
        });
    }


}else{
    divProductos.innerHTML=""
    lista.forEach((producto) => {

       
        divProductos.innerHTML+=` <div  class="col mb-5">
                        <div style="background-color: grey;" class="card">
                            <!-- Sale badge-->
                            <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
                            <!-- Product image-->
                            <img class="card-img-top" style="height:200px;"  src="assets/img/${producto.foto}" />
                            <!-- Product details-->
                            <div class="card-body p-4 h-50">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5  class="fw-bolder">${producto.nombre}</h5>
                                    <!-- Product price-->
                                    <span >${producto.precio}€</span>
                                   
                                </div>
                            </div>
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a onclick="visualizarProducto(${producto.id})" class="btn btn-outline-light mt-auto"">Comprar</a></div>
                            </div>
                        </div>
                    </div>`
        
     
    });
}
  
    
    
}

function modificar(){

}
function eliminarZapatilla(id){
   let zapatilla= listaProductos.findIndex(elemento=>elemento.id==id)
   listaProductos.splice(zapatilla,1)
}
function visualizarProducto(id){
    sessionStorage.setItem("producto",JSON.stringify(id));
    location.href="producto.html"
}

function cargarMarcas(lista){
    document.getElementById("selectMarcas").innerHTML="<option value='' selected>Todas las Marcas</option>"

    lista.forEach(elemento => {
        if(listaMarcas.findIndex(marca =>marca==elemento.marca)==-1){
            listaMarcas.push(elemento.marca)
        }
        
    
    })
    listaMarcas.forEach(elemento=>{
        let option=document.createElement("option")
        option.value=elemento
        option.innerHTML=elemento
        document.getElementById("selectMarcas").appendChild(option)
    })
    
}

function cargarRango(lista){
    let maximo=0
    let minimo=100000
    lista.forEach(elemento => {
       if(elemento.precio>maximo){
        maximo=elemento.precio
       }
       if(elemento.precio<minimo){
        minimo=elemento.precio
       }
        
    
    })

    document.getElementById("rangoPrecio").min=minimo
    document.getElementById("rangoPrecio").max=maximo
    document.getElementById("rangoPrecio").value=maximo
    document.getElementById("valorRango").innerHTML=`${maximo}€`
    document.getElementById("rangoMin").innerHTML=`${minimo}€`
}

function cambiarTextoRango(){
    let valor=document.getElementById("rangoPrecio").value
    document.getElementById("valorRango").innerHTML=`${valor}€`
}



// function filtrarTexto(){
//     let filtro=document.getElementById("filtro").value
//     if(!filtro==""){
//         var listaFiltrada=listaProductos.filter(elemento=>elemento.nombre.toLowerCase().includes(filtro))
//         mostrarProductos(listaFiltrada)
//     }else{
//         mostrarProductos(listaProductos)
//     }
   
// }
// function filtrarPrecio(){
//     let preciomax=document.getElementById("rangoPrecio").value
//     var listaFiltrada=[]
//     listaProductos.forEach(elemento=>{
//         if(elemento.precio<=preciomax){
//             listaFiltrada.push(elemento)
//         }
//     })
//     mostrarProductos(listaFiltrada)
// }

// function ordenar(){

//     if(event.target.tipo==0){
//         listaProductos.sort((a,b)=>{
//             if(a.precio>b.precio){
//                 return 1
//             }else{
//                 return -1
//             }
//         });
//     }else{
//         listaProductos.sort((a,b)=>{
//             if(a.precio<b.precio){
//                 return 1
//             }else{
//                 return -1
//             }
//         });
//     }
   
//     mostrarProductos(listaProductos);

// }

// function filtrarMarcas(){
//    let marca= document.getElementById("selectMarcas").value
//    if(!marca==""){
//     var listaMarcas=listaProductos.filter(elemento=>elemento.marca==marca)
//     mostrarProductos(listaMarcas)
//    }else{
//        mostrarProductos(listaProductos)
//    }
  
// }

function filtrarTexto(){
    let filtro=document.getElementById("filtro").value
    if(!filtro==""){
        var listaFiltrada=listaProductos.filter(elemento=>elemento.nombre.toLowerCase().includes(filtro.toLowerCase()))
      return listaFiltrada
    }else{
       return listaProductos
    }
   
}
function filtrarPrecio(lista){
    let preciomax=parseInt(document.getElementById("rangoPrecio").value)
    var listaFiltrada=[]
    lista.forEach(elemento=>{
        if(elemento.precio<=preciomax){
            listaFiltrada.push(elemento)
        }
    })
 return listaFiltrada
}

function ordenar(tipo,lista){

    if(tipo==0){
        lista.sort((a,b)=>{
            if(a.precio>b.precio){
                return 1
            }else{
                return -1
            }
        });
    }else{
        lista.sort((a,b)=>{
            if(a.precio<b.precio){
                return 1
            }else{
                return -1
            }
        });
    }
   
    mostrarProductos(listaProductos);

}

function filtrarMarcas(lista){
   let marca= document.getElementById("selectMarcas").value
   if(!marca==""){
    var listaMarcas=lista.filter(elemento=>elemento.marca==marca)
   return listaMarcas
   }else{
      return lista
   }
  
}

function filtrar(){
    var listaMostrar=JSON.parse(sessionStorage.getItem("productos"))
    listaMostrar=filtrarTexto()
    listaMostrar=filtrarPrecio(listaMostrar)
    listaMostrar=filtrarMarcas(listaMostrar)
    if(event.target.tipo==0){
        ordenar(0,listaMostrar)
    }else if(event.target.tipo==1){
        ordenar(1,listaMostrar)
    }


    if(listaMostrar.length>0){
        mostrarProductos(listaMostrar)
    }else{
        mostrarProductos(listaMostrar)
        let mensaje=document.createElement("p")
        mensaje.innerHTML="No se ha encontado ningún producto con esas características"
        document.getElementById("productos").appendChild(mensaje)
    }


}

