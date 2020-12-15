document.write("<script type='text/javascript' src='js/ajax.js'></script>");
document.write("<script src='https://cdn.jsdelivr.net/npm/sweetalert2@9'></script>");

function alertmsj(tit,msj){
  var titulo=tit;
  var mensaje=msj;
  Swal.fire({
    title: titulo,
    text: mensaje,
    allowOutsideClick: false,
    confirmButtonText: "Ok",
    confirmButtonColor: "#D4AC0D",
  });
}



let area = document.getElementById('area');

document.getElementById("carga").addEventListener('change', leerArchivo, false);

function leerArchivo(e) {
  area.style.backgroundColor="#fff";
  area.textContent = '';
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

area.addEventListener('dragover', e => e.preventDefault());
area.addEventListener('drop', readFile);

function readFile (e) {
  area.style.backgroundColor="#fff";
  area.textContent = '';
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


let cod;
var jObject;


function printFileContents (contents) {
  cod=new Array();
  jObject={};

  area.textContent=contents;
  //let lines = contents.split(/\n/);
  //lines.forEach(line => cod += line + "\n");
  document.getElementById('output').innerHTML=" ";
  for (var i in contents) {
    if(contents[i].charCodeAt(0)==10) cod[i]='195';//cod+=String.fromCharCode(195);
    else if(contents[i].charCodeAt(0)==32) cod[i]='197';//cod+=String.fromCharCode(197);
    else cod[i]=contents[i];
  }
  //cod=contents;
  //Lo convierto a objeto
    for(i in cod)
    {
        jObject[i] = cod[i];
    }
}
function encode_utf8(s) {
  return unescape(encodeURIComponent(s));
}

function decode_utf8(s) {
  return decodeURIComponent(escape(s));
}

document.getElementById('envia').addEventListener('click',getSyntax,false);

function getSyntax(){
  //console.log(cod);
  //console.log(jObject);
  //function getRequest(url, method, data, async, success, error, msg)
  getRequest(
      "reader/reader.php?Scodigo="+JSON.stringify(jObject), //"reader/reader.php",
      "POST",
      null,//{jObject: JSON.stringify(jObject)},
      true,
      AME,
      drawError,
      loadingmsg
    );
  return false;
}
function AME(rt){
  var rtx = JSON.parse(rt);
  alertmsj("Aviso",rtx[0]);

    if( rtx[0] == "Código Valido!!"){
      area.style.backgroundColor="rgba(0, 255, 0, 0.7)";
    }else if(rtx[0] == "Error de Sintaxis en algun punto!!"){
      area.style.backgroundColor="rgba(243, 156, 18, 0.7)";
    }else{
      area.style.backgroundColor="rgba(255,0, 0, 0.7)";
    }
  document.getElementById('output').innerHTML=rtx[1];

}

function loadingmsg(){
  Swal.fire({
  title: 'Cargando...',
  showConfirmButton: false,
  allowOutsideClick: false,
  onBeforeOpen: () => {
      Swal.showLoading()
  }
});
}
document.getElementById('VerP').addEventListener('click',VerP,false);
function VerP(){
  var c = document.getElementById('output');
  if(c.style.display=="none") c.style.display="block";
  else c.style.display="none";

}
