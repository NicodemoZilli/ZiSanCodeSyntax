document.write("<script type='text/javascript' src='js/ajax.js'></script>");
document.write("<script src='https://cdn.jsdelivr.net/npm/sweetalert2@9'></script>");

function alertmsj(tit,msj){
  var titulo=tit;
  var mensaje=msj;
  Swal.fire({
    title: titulo,
    text: mensaje,
    confirmButtonText: "Ok",
    confirmButtonColor: "#D4AC0D",
  });
}



let cod ="";

document.getElementById("carga").addEventListener('change', leerArchivo, false);

function leerArchivo(e) {

  var archivo = e.target.files[0];
  if (!archivo) {
    alertmsj("Error!","No es un Archivo");
    return;
  }

  if (archivo.type === 'text/plain') {
    var lector = new FileReader();
    lector.onload = function(e) {
      var contenido = e.target.result;
      printFileContents(contenido);
    };
    lector.readAsText(archivo);
  }else {
    alertmsj("Error!","No es un archivo txt");
  }
}

let area = document.getElementById('area');

area.addEventListener('dragover', e => e.preventDefault());
area.addEventListener('drop', readFile);

function readFile (e) {
  e.preventDefault();
  let file = e.dataTransfer.files[0];

  if (!file) {
    alertmsj("Error!","No es un Archivo");
    return;
  }

  if (file.type === 'text/plain') {
    let reader = new FileReader();
    reader.onloadend = () => printFileContents(reader.result);
    reader.readAsText(file, 'ISO-8859-1');
  } else {
    alertmsj("Error!","No es un archivo txt");
  }
}

function printFileContents (contents) {

  let lines = contents.split(/\n/);
  cod="";
  lines.forEach(line => cod += line + '\n');
  area.style.backgroundColor="#fff";
  area.textContent = '';
  area.textContent=cod;
  document.getElementById('output').innerHTML="";

}


document.getElementById('envia').addEventListener('click',getSyntax,false);

function getSyntax(){
  console.log(cod);
  getRequest(
      "reader/reader.php?Scodigo="+cod,
       AME,
       drawError
  );
  return false;
}
function AME(rt){
  var rtx = JSON.parse(rt);
  alertmsj("Aviso",rtx[0]);

    if( rtx.s == "Código Valido!!"){
      area.style.backgroundColor="rgba(0, 255, 0, 0.7)";
    }else{
      area.style.backgroundColor="rgba(255,0, 0, 0.7)";
    }
  document.getElementById('output').innerHTML=rtx[1];

}
document.getElementById('VerP').addEventListener('click',VerP,false);
function VerP(){
  var c = document.getElementById('output');
  if(c.style.display=="none") c.style.display="block";
  else c.style.display="none";

}
