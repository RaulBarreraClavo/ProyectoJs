
var usuario=""

var listaCompras=[]
window.onload=() => {
  
    
    comprobarSesion()
    mostrarCompras()
  
}

function comprobarSesion(){
    if (sessionStorage.getItem("usuario")){
        usuario=JSON.parse(sessionStorage.getItem("usuario")).id
        
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
    location.href="tienda.html"
   
}
function mostrarCompras() {
    let cajaCompras=document.getElementById("contenedorCompras")
  if(localStorage.getItem(`listaCompras${usuario}`)){
    listaCompras=JSON.parse(localStorage.getItem(`listaCompras${usuario}`))
    listaCompras.forEach(elemento => {
        let nombresProductos=""
        elemento.productos.forEach(producto=>{
            nombresProductos=nombresProductos+" "+ producto.nombre+": "+producto.cantidad+"  "
        })
        cajaCompras.innerHTML+=` <div class="row">
        <div class="col-lg-2 offset-2 ">${elemento.id}</div>
        <div class="col-lg-4">${nombresProductos}</div>
        <div class="col-lg-2">${elemento.precio}€</div>
        <div class="col-lg-2">${elemento.fecha}</div>
    </div>
        `
    });
  }else{
    cajaCompras.innerHTML="No Tienes Compras"
  }
  
}