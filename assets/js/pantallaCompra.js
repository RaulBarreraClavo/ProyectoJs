var carrito=[]
var usuario=""
var precioTotal=0
var listaCompras=[]
window.onload=() => {
  
    
    comprobarSesion()
    mostrarProductos()
  
}

function comprobarSesion(){
    if (sessionStorage.getItem("usuario")){
        usuario=JSON.parse(sessionStorage.getItem("usuario")).id
        
        document.getElementById("btnIniciaSesion").style.visibility="hidden"
        document.getElementById("btnRegistro").style.visibility="hidden"
        document.getElementById("btnCerrarSesion").style.visibility="visible"
        document.getElementById("btnCerrarSesion").addEventListener("click",cerrarSesion)
        usuario=JSON.parse(sessionStorage.getItem("usuario")).id
        document.getElementById("botonFinalizarCompra").addEventListener("click",finalizarCompra)
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
    location.href="tienda.html"
   
}
function mostrarProductos() {
  
    if (sessionStorage.getItem(`carrito${usuario}`)){
        carrito = JSON.parse(sessionStorage.getItem(`carrito${usuario}`));
        document.getElementById("numProductos").innerHTML=carrito.length
    }else{
        document.getElementById("numProductos").innerHTML=0
        
    }
   

    cajaProductos=document.getElementById("listaProductos")
   
    var total = 0;
    for (i = 0; i < carrito.length; i++) {
        total = parseInt(carrito[i].precio) * parseInt(carrito[i].cantidad);
        precioTotal += total;
       cajaProductos.innerHTML+=` <li class="list-group-item d-flex justify-content-between lh-sm">
       <div>
         <h6 class="my-0">${carrito[i].nombre}</h6>
         <small class="text-muted">${carrito[i].cantidad}</small>
       </div>
       <span class="text-muted">${total}€</span>
     </li>`

       

       
        
        

    }
  cajaProductos.innerHTML+=` <li class="list-group-item d-flex justify-content-between">
  <span>Total</span>
  <strong>${precioTotal}€</strong>
</li>`
}

function finalizarCompra(){
    let ultimoid=1
    
    if(localStorage.getItem(`listaCompras${usuario}`)){
      
        listaCompras=JSON.parse(localStorage.getItem(`listaCompras${usuario}`))
        ultimoid=listaCompras[listaCompras.length-1].id+1
       
    }

    let fecha = new Date();
    let mensajeFecha=fecha.getDate()+"/"+parseInt(fecha.getMonth()+1)+"/"+fecha.getFullYear();
    var compra=new Compra(ultimoid,usuario,carrito,mensajeFecha,precioTotal)
    listaCompras.push(compra)
    localStorage.setItem(`listaCompras${usuario}`,JSON.stringify(listaCompras))
    sessionStorage.removeItem(`carrito${usuario}`)
    location.href="tienda.html"

}