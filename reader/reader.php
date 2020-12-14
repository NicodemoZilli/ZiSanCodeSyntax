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
  $Scodigo = $_REQUEST["Scodigo"];
  echo json_encode(validC($Scodigo));
}else {
  echo "No se ha recibio nada!!";
}

   function getState($cst,$rc){
    $sheet = $GLOBALS['sheet'];
    if(ord($rc) == 32) $rc = 'œ';
    else if (ord($rc)==10 ) $rc="Ç";

    $nr=0;
    foreach ($sheet->getRowIterator() as $row) {

      $state = $sheet->getCell("A".$nr)->getValue();

      $cellIterator = $row->getCellIterator();
      $cellIterator->setIterateOnlyExistingCells(TRUE);
      foreach ($cellIterator as $key => $cell) {
        $simbol = $sheet->getCell($key."1")->getValue();
          if($state==$cst && ord($simbol)==ord($rc)){
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
    for($i=0; $i<strlen($cod); $i++){

      if($cod[$i]=="\n") $nl++;
      $codv=$codv."<p>Estado Actual: ".$ct." Caracter Leido: ".$cod[$i]."</p><br>";
      $cl=$cl.$cod[$i];

      $act = getState($ct,$cod[$i]);
      if($act == "q190"){
        $vec[0]="Código Valido!!";
        $vec[1]=$codv;
        return $vec;
      }else if($act=="q24"){
        $vec[0]= "Código No Valido!! ". PHP_EOL ." Error en la linea: ".$nl." Cerca de: ".$cl;
        $vec[1]= $codv;
        return $vec;
      }
      $ct = $act;
    }
  }
 ?>
