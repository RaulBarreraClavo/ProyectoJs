<?php
 if(isset($_REQUEST["persona"])){
    $persona=$_REQUEST["persona"];
    $fichero=fopen("../ficheros/usuarios.txt","a+");
    if($fichero){
        $texto = fread($open, filesize("../ficheros/usuarios.txt"));
        str_replace($texto,"]","$persona ]"); 
        fwrite($fichero,$persona);
        fclose($fichero);
    }
 }
