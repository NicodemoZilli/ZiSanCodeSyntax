<?php

$Scodigo="";

if(isset($_REQUEST["Scodigo"])){
  $Scodigo = $_REQUEST["Scodigo"];
  if($Scodigo!="Holis")
    echo "Codigo No Valido!!";
  else
    echo "Codigo Valido!!";
}else {
  echo "No se Recibio nada";
}



 ?>
