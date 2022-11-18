class Producto {
    constructor(id,nombre,marca,precio,foto,foto2,foto3) {
        this.id = id || "Sin id";
        this.nombre=nombre || "Sin Nombre";
        this.marca=marca || "Sin marca";
        this.precio=precio || 0;
       
        this.foto=foto || "sinFoto.png";
        this.foto2=foto2 || "sinFoto.png";
        this.foto3=foto3 || "sinFoto.png";
       
       
    }
    cambiarFoto(nuevaFoto){
        this.foto=nuevaFoto
    }
    


 
  }