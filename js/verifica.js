document.write("<script type='text/javascript' src='js/ajax.js'></script>");

let cod ="";

document.getElementById("carga").addEventListener('change', leerArchivo, false);

function leerArchivo(e) {
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function(e) {
    var contenido = e.target.result;
    printFileContents(contenido);
  };
  lector.readAsText(archivo);
}

/*function mostrarContenido(contenido) {
  var elemento = document.getElementById('area');
  elemento.innerHTML = contenido;
}*/


let area = document.getElementById('area');

area.addEventListener('dragover', e => e.preventDefault());
area.addEventListener('drop', readFile);

function readFile (e) {
  e.preventDefault();
  let file = e.dataTransfer.files[0];

  if (file.type === 'text/plain') {
    let reader = new FileReader();
    reader.onloadend = () => printFileContents(reader.result);
    reader.readAsText(file, 'ISO-8859-1');
  } else {
    alert('¡He dicho archivo de texto!');
  }
}

function printFileContents (contents) {
  area.style.lineHeight = '30px';
  area.textContent = '';
  let lines = contents.split(/\n/);

  lines.forEach(line => area.textContent += line + '\n');
  lines.forEach(line => cod += line + '\n');

}


document.getElementById('envia').addEventListener('click',getSyntax,false);

function getSyntax(){
  console.log(cod);
  getRequest(
      "verifica.php?Scodigo="+cod,
       AME,
       drawError
  );
  return false;
}
function AME(rtx){
  var input = document.getElementById('area');
  var output = document.getElementById('info');
  output.innerHTML = rtx;

    if( rtx == "Codigo Valido!!"){
      input.style.backgroundColor="rgba(0, 255, 0, 0.7)";
    }else if( rtx == "Codigo No Valido!!"){
      input.style.backgroundColor="rgba(255,0, 0, 0.7)";
    }else {
      input.style.backgroundColor="rgba(0,0, 150, 0.7)";
    }
}
