<?php

$Scodigo="";

if(isset($_REQUEST["Scodigo"])){
  $Scodigo = $_REQUEST["Scodigo"];
  if($Scodigo!="Holis")
    echo "Tu Codigo No es Valido!!";
  else
    echo "Tu Codigo Es Valido!!"+$Scodigo;
}else {
  echo "No se Recibio nada";
}
 ?>
