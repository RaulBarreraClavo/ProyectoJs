class Usuario {
    constructor(id,nombre,contraseña) {
        this.id = id || "Sin id";
        this.nombre=nombre || "Sin Nombre";
        this.contraseña=contraseña || "Sin Contraseña";
       
       
    }
    cambiarContraseña(nuevaContraseña){
        this.contraseña=nuevaContraseña
    }
    


 
  }