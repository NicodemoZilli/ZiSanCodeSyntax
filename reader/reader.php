 <?php
 /**
  * @author nicodemozilli
  */

require_once "vendor/autoload.php";
use PhpOffice\PhpSpreadsheet\IOFactory;

$rootfile= "../pdf/tabla.xlsx";
$file = IOFactory::load($rootfile);
$sheet = $file->getSheet(0);

$Scodigo="";

if(isset($_REQUEST["Scodigo"])){
  $Scodigo = json_decode($_REQUEST["Scodigo"],true);
}else if($_POST){
  $Scodigo = json_decode($_POST["jObject"],true);
}else {
  $v[0]="No se ha recibio nada!!";
  $v[1]=$Scodigo;
  echo json_encode($v);
}

echo json_encode(validC($Scodigo));


  function getState($cst,$rc){
    $sheet = $GLOBALS['sheet'];
    if($rc == '195') $rc = $sheet->getCell("CM1")->getValue();
    else if($rc == '197') $rc = $sheet->getCell("CN1")->getValue();

    $Mayus = array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z');
     if(array_search($rc,$Mayus)) $rc=$rc."2";

    $nr=0;
    foreach ($sheet->getRowIterator() as $row) {
      $state = $sheet->getCell("A".$nr)->getValue();
      $cellIterator = $row->getCellIterator();
      $cellIterator->setIterateOnlyExistingCells(TRUE);
      foreach ($cellIterator as $key => $cell) {
        $simbol = $sheet->getCell($key."1")->getValue();
          if($state==$cst && $simbol==$rc){
            return trim($sheet->getCell($key.$nr)->getValue());
          }
      }
      $nr++;
    }
  }


  function validC($cod){
    $ct="q0";
    $act="";
    $codv="";
    $nl=1;
    $cl="";
    for($i=0; $i<sizeof($cod); $i++){

      if($cod[$i]=='195') $nl++;

      $ca="";
      if($cod[$i]=='195') $ca="\n";
      else if($cod[$i]=='197') $ca=" ";
      else $ca=$cod[$i];

      $cl=$cl.$ca;

      $act = getState($ct,$cod[$i]);

      $codv=$codv."<p>Estado Actual: ".$ct." Caracter Leido: ".$ca." Avanza a: ".$act."</p>";

      if($act == "q190"){
        $codv=$codv."<p>Estado Final: ".$act." Caracter Leido: ".$ca."</p>";
        $vec[0]="Código Valido!!";
        $vec[1]=$codv;
        return $vec;
      }else if($act=="q24"){
        $codv=$codv."<p>Estado Final: ".$act." Caracter Leido: ".$ca."</p>";
        $vec[0]= "Código No Valido!!   Error en la linea: ".$nl." Cerca de: ".$cl;
        $vec[1]= $codv;
        return $vec;
      }

      $ct = $act;
    }
      $vec[0]= "Error de Sintaxis en algun punto!!";
      $vec[1]= $codv;
    return $vec;
  }

 ?>
