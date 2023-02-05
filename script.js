// Creando LOCALSTORAGE si no existe
document.getElementById('versiondett').innerHTML = "MONOPOLY® v1.3";
//OJO ACA - ESTO ES DE CAMBIADOR DE NOMBRES DE PLAYERS
$('select').on('change', switchFields);

function switchFields(e) {
  const input = $(this).parent('td').next('td').find('input');

  if ($(this).val() === "0") {
    input.prop('disabled', true);
    input.prop('value', 'deshabilitado');
  } else {
    input.prop('disabled', false);
    input.prop('value', '');
  }
};
//OJO ACA - ESTO ES DE CAMBIADOR DE NOMBRES DE PLAYERS

if (localStorage.getItem("PDatabase") === null) {
IniciarPlayers(500);
}
if (localStorage.getItem("MDatabase") === null) {
SetearBBDDMov();  
}
// Flag de ejecución en curso
var stepincourse = "None"
var originante = "None"
var receptor = "None"
var monto = "None"

var p1Card = "04:35:77:fa:c2:55:80"
var p2Card = "02:e4:4e:ba"
var p3Card = "None"
var p4Card = "None"
var p5Card = "None"
var p6Card = "None"
var p7Card = "None"
var p8Card = "None"

function park_pay() {
console.log('Autenticando a quien paga');
    document.getElementById('SalirBtnp').click();
    document.getElementById("actiondetailexp").innerHTML = "Apoye la tarjeta de quien paga impuesto al parking.";
    console.log('Autenticando cobro.');
    var d = document.getElementById("accion-lectura");
    $(".overlay-app").addClass("is-active");
    d.classList.add("visible");
    readTag();
    //pasamos a paso 8 (Monto a pagar)
   stepincourse = 16;
};
function park_get() {
console.log('Autenticando a quien recibe el premio');
    document.getElementById('SalirBtnp').click();
    document.getElementById("actiondetailexp").innerHTML = "Apoye la tarjeta de quien recibirá el Premio de Parking";
    console.log('Autenticando cobro.');
    var d = document.getElementById("accion-lectura");
    $(".overlay-app").addClass("is-active");
    d.classList.add("visible");
    readTag();
    stepincourse = 18;
};

//Esta funcion lee la variable stepincourse para saber en que estado de accion se està y derivar al cartel necesario del paso a paso.
function op_launcher(step) {
 //PASOS INICIALES: 1-Iniciando-Compra 2-Iniciando-Cobro 3-Iniciando-Transferencia 4-Iniciando-ConsultaSaldo 5-Iniciando-VerMovimientos 6-Iniciando-Parking-pago 7-Iniciando-Parking-cobro 
 // PASOS INTERMEDIOS: 8-MontoAPagar 9-Realizar-Pago 10-MontoACobrar 11-Realizar-Cobro 12-TransferenciaSetOrigen 13- Ventana Intermedia 14-TransferenciaSetDestino 15-TransferenciaRealizar
 intsetep = parseInt(step)
 
 if (intsetep <= 7) {
 //si es una operación inicial se cambia la variable global tipoOP porque comienza de cero una nueva acción. 
 stepincourse = parseInt(step);
 }; 
 // Tipos de autor: 1-Emite 2-Recibe 3-EmiteRequiereOtro 4-Autentica 5-Autentica 6-Emite 
 switch (stepincourse) {
case 1:
   console.log('Operación de pago.');
   //Inicia un pago, se launchea el autenticador
    document.getElementById("actiondetailexp").innerHTML = "Apoye la tarjeta de quien realiza el pago.";
    console.log('Autenticando pago...');
    var d = document.getElementById("accion-lectura");
    $(".overlay-app").addClass("is-active");
    d.classList.add("visible");
    readTag();
   //seteamos todo lo que ya sabemos
   receptor = "Banco"
   //pasamos a paso 8 (Monto a pagar)
   stepincourse = 8;
    break;
case 2:
    console.log('Operación de cobro.');
    //Inicia un pago, se launchea el autenticador
    document.getElementById("actiondetailexp").innerHTML = "Apoye la tarjeta de quien cobrará el dinero.";
    console.log('Autenticando cobro.');
    var d = document.getElementById("accion-lectura");
    $(".overlay-app").addClass("is-active");
    d.classList.add("visible");
    readTag();
   //seteamos todo lo que ya sabemos
   originante = "Banco"
   //pasamos a paso 10 (Monto a cobrar)
   stepincourse = 10;
    break;
case 3:
    console.log('Transferencia iniciando, origen.');
    //Inicia un pago, se launchea el autenticador
    document.getElementById("actiondetailexp").innerHTML = "Apoye la tarjeta de quien PAGARÁ el dinero.";
    var d = document.getElementById("accion-lectura");
    $(".overlay-app").addClass("is-active");
    d.classList.add("visible");
    readTag();
   //pasamos a paso 12 (Monto a cobrar)
   stepincourse = 12;
    break;
case 4:
    console.log('Operación de Consulta de Saldo - Autenticar');
    document.getElementById("actiondetailexp").innerHTML = "Apoye la tarjeta para consultar el saldo.";
    var d = document.getElementById("accion-lectura");
    $(".overlay-app").addClass("is-active");
    d.classList.add("visible");
    readTag();
   //pasamos a paso 5 (mostrar saldo)
   stepincourse = 5; 
    break;
case 5:
    console.log('Operación de Consulta de Saldo - Mostrar');
    document.getElementById('SalirBtnAuth').click();
    var e = document.getElementById("playerselector");
    originante = e.value;
    var nombrePj = ConsultaAlias(originante);
    MostrarBBDDMovJug(nombrePj);
    sald = ConsultaSaldo(originante);
    document.getElementById("titulSaldoyMov").innerHTML = nombrePj+" tu saldo actual es: $"+sald;
    var t = document.getElementById("movimientos-window");
    $(".overlay-app").addClass("is-active");
    t.classList.add("visible");
    break;
case 6:
    console.log('Operación de ver todos los movimientos.');
    MostrarBBDDMov();
    document.getElementById("titulSaldoyMov").innerHTML = "Todos los Movimientos";
    var t = document.getElementById("movimientos-window");
    $(".overlay-app").addClass("is-active");
    t.classList.add("visible");
    break;
 case 7:
    console.log('Operación de Parking.');
    document.getElementById("keyboartitl").innerHTML = nombrePj+" por favor ingresá el monto a pagar al Banco.";
    var d = document.getElementById("Parking-window");
    $(".overlay-app").addClass("is-active");
    d.classList.add("visible");
   
    break;
 case 8:
    //Ingresando monto a pagar
    console.log('Step Medio: Monto a Pagar al Banco');
    document.getElementById('SalirBtnAuth').click();
    var e = document.getElementById("playerselector");
    originante = e.value;
    var nombrePj = ConsultaAlias(originante);
    
    document.getElementById("keyboartitl").innerHTML = nombrePj+" por favor ingresá el monto a pagar al Banco.";
    var d = document.getElementById("accion-monto");
    $(".overlay-app").addClass("is-active");
    d.classList.add("visible");
    //seteamos todo lo que ya sabemos
    
    //pasamos a paso 9 hacer pago
    stepincourse = 9;
    break;
case 9:
   //Realizando Pago
   monto = document.getElementById('displayamount').innerHTML;
   console.log('Step final: Procesando pago...');
   console.log(originante, "monto: ", monto)
    if (PagaraBanco(originante, monto) === true) {
    
      console.log('Pago Exitoso');
      sald = ConsultaSaldo(originante);
      document.getElementById('SalirBTNkeyb').click();
      document.getElementById('displayamount').innerHTML = "0";
      document.getElementById("ResultadoTitulo").innerHTML = "OPERACION REALIZADA.";
      document.getElementById("Resultadodetalle").innerHTML = monto+"$ pagados correctamente. Su saldo ahora es de $: "+sald;
      var d = document.getElementById("ventana-resultado");
      $(".overlay-app").addClass("is-active");
      d.classList.add("visible");
    
    }else {
     
      console.log('Pago fallo');
      sald = ConsultaSaldo(originante);
      document.getElementById('SalirBTNkeyb').click();
      document.getElementById('displayamount').innerHTML = "0";
      document.getElementById("ResultadoTitulo").innerHTML = "FALLÓ LA OPERACIÓN.";
      document.getElementById("Resultadodetalle").innerHTML = "SALDO INSUFICIENTE, su saldo actual es de $: "+sald;
      var d = document.getElementById("ventana-resultado");
      $(".overlay-app").addClass("is-active");
      d.classList.add("visible");
    
    };

    stepincourse = "None"
    break;
case 10:
    //Ingresando monto a cobrar
    //seteamos todo lo que ya sabemos
    var e = document.getElementById("playerselector");
    receptor = e.value;
    var nombrePj = ConsultaAlias(receptor);
    console.log('Step Medio: Monto a Cobrar del Banco');
    document.getElementById('SalirBtnAuth').click();
    document.getElementById("keyboartitl").innerHTML = nombrePj+", Ingrese el monto a cobrar del Banco.";
    var d = document.getElementById("accion-monto");
    $(".overlay-app").addClass("is-active");
    d.classList.add("visible");
    
    //pasamos a paso 
    stepincourse = 11;
    break;
 case 11:
   //Realizando cobro
   monto = document.getElementById('displayamount').innerHTML;
   console.log('Step final: Procesando cobro...');
   console.log(receptor, "monto: ", monto)
   var nombrePj = ConsultaAlias(receptor);
   CobrodeBanco(receptor,monto)
      sald = ConsultaSaldo(receptor);
      document.getElementById('SalirBTNkeyb').click();
      document.getElementById('displayamount').innerHTML = "0";
      document.getElementById("ResultadoTitulo").innerHTML = "OPERACION REALIZADA.";
      document.getElementById("Resultadodetalle").innerHTML = nombrePj+", fueron cobrados $"+monto+" correctamente. Tu saldo ahora es de $"+sald+".";
      var d = document.getElementById("ventana-resultado");
      $(".overlay-app").addClass("is-active");
      d.classList.add("visible");
    stepincourse = "None"
    break;
case 12:
    //ventana intermedia para evitar doble autenticación
    var e = document.getElementById("playerselector");
    originante = e.value;
    var nombrePj = ConsultaAlias(originante);
    document.getElementById("fastpopupcart").innerHTML = "Hola "+nombrePj+". A continuación se deberá acercar la tarjeta de quien RECIBIRÁ el dinero.";
    document.getElementById('SalirBtnAuth').click();
    var t = document.getElementById("ventana-flash");
    $(".overlay-app").addClass("is-active");
    t.classList.add("visible")
   //pasamos a paso 13 (Monto a cobrar)
   stepincourse = 13;
    break;
case 13:
    document.getElementById('SalirBtnAuth').click();
    document.getElementById("actiondetailexp").innerHTML = "Acercar la tarjeta de quien RECIBIRÁ el dinero.";
    var d = document.getElementById("accion-lectura");
    $(".overlay-app").addClass("is-active");
    d.classList.add("visible");
    readTag();
   //pasamos a paso 12 (Monto a cobrar)
   stepincourse = 14;
    break;
case 14:
    console.log('Seleccionar monto transferencia, destino.');
    var e = document.getElementById("playerselector");
    receptor = e.value;
    var nombrePjo = ConsultaAlias(originante);
    var nombrePjr = ConsultaAlias(receptor);
    document.getElementById('SalirBtnAuth').click();
    document.getElementById("keyboartitl").innerHTML = nombrePjo+" ingresá el monto a transferir a "+nombrePjr;
    var d = document.getElementById("accion-monto");
    $(".overlay-app").addClass("is-active");
    d.classList.add("visible");

   //pasamos a paso 15
   stepincourse = 15;
    break;
case 15:
   //Realizando Pago
   monto = document.getElementById('displayamount').innerHTML;
   console.log('Step final: Procesando pago...');
   console.log(originante, "transfiere: ", monto,  "a: ",receptor);
    var nombrePjo = ConsultaAlias(originante);
    var nombrePjr = ConsultaAlias(receptor); 
   if (Transferencia(originante, monto, receptor) === true) {
    
      console.log('Transferencia Exitosa');
      sald = ConsultaSaldo(originante);
      document.getElementById('SalirBTNkeyb').click();
      document.getElementById('displayamount').innerHTML = "0";
      document.getElementById("ResultadoTitulo").innerHTML = "TRANSFERENCIA REALIZADA.";
      document.getElementById("Resultadodetalle").innerHTML = nombrePjo+", pagaste: $"+monto+" correctamente a "+nombrePjr+". Tu saldo restante es de: $"+sald;
      var d = document.getElementById("ventana-resultado");
      $(".overlay-app").addClass("is-active");
      d.classList.add("visible");
    
    }else {
     
      console.log('Transferencia fallo');
      sald = ConsultaSaldo(originante);
      document.getElementById('SalirBTNkeyb').click();
      document.getElementById('displayamount').innerHTML = "0";
      document.getElementById("ResultadoTitulo").innerHTML = "FALLÓ LA OPERACIÓN.";
      document.getElementById("Resultadodetalle").innerHTML = "SALDO INSUFICIENTE, su saldo actual es de $: "+sald;
      var d = document.getElementById("ventana-resultado");
      $(".overlay-app").addClass("is-active");
      d.classList.add("visible");
    
    };

    stepincourse = "None"
    break;
case 16:
    console.log('Seleccionar monto transferencia de impuesto.');
    var e = document.getElementById("playerselector");
    originante = e.value;
    var nombrePjr = ConsultaAlias(originante);
    document.getElementById('SalirBtnAuth').click();
    document.getElementById("keyboartitl").innerHTML = nombrePjr+" ingresá el monto de impuesto a pagar:";
    var d = document.getElementById("accion-monto");
    $(".overlay-app").addClass("is-active");
    d.classList.add("visible");

   //pasamos a paso 12 (Monto a cobrar)
   stepincourse = 17;
    break;
case 17:
   receptor = "9"
   monto = document.getElementById('displayamount').innerHTML;
   console.log('Step final: Procesando pago...');
    if (Transferencia(originante, monto, receptor) === true) {
    
      console.log('Pago Exitoso');
      sald = ConsultaSaldo(originante);
      document.getElementById('SalirBTNkeyb').click();
      document.getElementById('displayamount').innerHTML = "0";
      document.getElementById("ResultadoTitulo").innerHTML = "OPERACION REALIZADA.";
      document.getElementById("Resultadodetalle").innerHTML = monto+"$ pagados correctamente. Su saldo ahora es de $: "+sald;
      var d = document.getElementById("ventana-resultado");
      $(".overlay-app").addClass("is-active");
      d.classList.add("visible");
    
    }else {
     
      console.log('Pago fallo');
      sald = ConsultaSaldo(originante);
      document.getElementById('SalirBTNkeyb').click();
      document.getElementById('displayamount').innerHTML = "0";
      document.getElementById("ResultadoTitulo").innerHTML = "FALLÓ LA OPERACIÓN.";
      document.getElementById("Resultadodetalle").innerHTML = "SALDO INSUFICIENTE, su saldo actual es de $: "+sald;
      var d = document.getElementById("ventana-resultado");
      $(".overlay-app").addClass("is-active");
      d.classList.add("visible");
    
    };

    stepincourse = "None"
    break;
case 18:
   //Realizando cobro
   var e = document.getElementById("playerselector");
   receptor = e.value;
   originante = '9';
   console.log('Step final: Procesando cobro...');
   var nombrePj = ConsultaAlias(receptor);
   monto = ConsultaSaldo(originante);
   Transferencia(originante, monto, receptor);
      sald = ConsultaSaldo(receptor);
      document.getElementById('SalirBTNkeyb').click();
      document.getElementById('displayamount').innerHTML = "0";
      document.getElementById("ResultadoTitulo").innerHTML = "OPERACION REALIZADA.";
      document.getElementById("Resultadodetalle").innerHTML = nombrePj+", fueron cobrados $"+monto+" del Premio de Parking!. Tu saldo ahora es de $"+sald+".";
      var d = document.getElementById("ventana-resultado");
      $(".overlay-app").addClass("is-active");
      d.classList.add("visible");
    stepincourse = "None"
    break;
  default:
    console.log('No seberia pasar esto, pero mal elegido el tipo de operación');
}
};

// FUNCIONES DE INTERACTIVIDAD DE LA PAGINA
// FUNCIONES DE INTERACTIVIDAD DE LA PAGINA
$(function () {
 $(".menu-link").click(function () {
  $(".menu-link").removeClass("is-active");
  $(this).addClass("is-active");
 });
});

$(function () {
 $(".main-header-link").click(function () {
  $(".main-header-link").removeClass("is-active");
  $(this).addClass("is-active");
 });
});

const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach((dropdown) => {
 dropdown.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdowns.forEach((c) => c.classList.remove("is-active"));
  dropdown.classList.add("is-active");
 });
});

$(".search-bar input")
 .focus(function () {
  $(".header").addClass("wide");
 })
 .blur(function () {
  $(".header").removeClass("wide");
 });

$(function () {
 $(".dropdown").on("click", function (e) {
  $(".content-wrapper").addClass("overlay");
  e.stopPropagation();
 });
 $(document).on("click", function (e) {
  if ($(e.target).is(".dropdown") === false) {
   $(".content-wrapper").removeClass("overlay");
  }
 });
});

$(function () {

 $(".pop-up .close").click(function () {
  $(".overlay-app").removeClass("is-active");
 });
});

$(".pop-up .close").click(function () {
 $(".pop-up").removeClass("visible");
});

const toggleButton = document.querySelector('.dark-light');

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});

function SetupMENU() {
MostrarBBDDPlay()
var d = document.getElementById("SETUP-MENU");
$(".overlay-app").addClass("is-active");
d.classList.add("visible");
};

function RestartMenu() {
document.getElementById('SalirBtn').click();
document.getElementById('cashinitval').value = '500';
document.getElementById('securewordinput').value = '';
document.getElementById('resultReinicio').innerHTML = '';
var d = document.getElementById("Restart-Game");
$(".overlay-app").addClass("is-active");
d.classList.add("visible");
};

function SolicitoRestart() {
var guessInput = document.getElementById('securewordinput').value;
var startmoneyamount = document.getElementById('cashinitval').value;
if(guessInput == "TRENCITO") {
    if(startmoneyamount > 1 && startmoneyamount < 99999) {
    SetearBBDDMov();
    IniciarPlayers(startmoneyamount);
    document.getElementById('SalirBtn2').click();
    document.getElementById('setupmen').click();
    
  } else {
    document.getElementById('resultReinicio').innerHTML = 'Monto no permitido';
  }
  } else {
    document.getElementById('resultReinicio').innerHTML = 'Palabra de seguridad Incorrecta';
  }
};

function launch_namer() {
document.getElementById('SalirBtn').click();
var d = document.getElementById("PLAYER_NAMES");
$(".overlay-app").addClass("is-active");
d.classList.add("visible");
};

function guardarnombres() {
var TempDecryptDatabase = JSON.parse(localStorage.getItem('PDatabase'));  


var p1name = document.getElementById("p1name").value;
var p2name = document.getElementById("p2name").value;
var p3name = document.getElementById("p3name").value;
var p4name = document.getElementById("p4name").value;
var p5name = document.getElementById("p5name").value;
var p6name = document.getElementById("p6name").value;
var p7name = document.getElementById("p7name").value;
var p8name = document.getElementById("p8name").value;
console.log(p8name)
if (p1name != '') {TempDecryptDatabase[0][1] = p1name;};
if (p2name != '') {TempDecryptDatabase[1][1] = p2name;};
if (p3name != '') {TempDecryptDatabase[2][1] = p3name;};
if (p4name != '') {TempDecryptDatabase[3][1] = p4name;};
if (p5name != '') {TempDecryptDatabase[4][1] = p5name;};
if (p6name != '') {TempDecryptDatabase[5][1] = p6name;};
if (p7name != '') {TempDecryptDatabase[6][1] = p7name;};
if (p8name != '') {TempDecryptDatabase[7][1] = p8name;};
 
localStorage.setItem('PDatabase', JSON.stringify(TempDecryptDatabase)); 
MostrarBBDDPlay();
document.getElementById('SalirBtn5').click();
SetupMENU();
};

// FINAL FUNCIONES DE INTERACTIVIDAD DE LA PAGINA

// FUNCIONES DE NFC
// FUNCIONES DE NFC 

var statusEl = document.getElementById("status");
var readBtn = document.getElementById("readBtn");
var writeBtn = document.getElementById("writeBtn");

function status(statusText) {
  statusEl.innerHTML = `Status: <small>${statusText}</small>`;
}

function disabled(isDisabled) {
  isDisabled = isDisabled ? true : false;
  readBtn.disabled = isDisabled;
  writeBtn.disabled = isDisabled;
}

disabled(false);

async function readTag() {
  if ("NDEFReader" in window) {
    disabled(true);
    status("Setting up reader...");
    const reader = new NDEFReader();
    try {
      status("Waiting to read a tag...");
      await reader.scan();
      status("Reading tag...");
      reader.onreading = event => {
        status("Decroded tag data...");
        
        status("Serial Number:  " + serialNumber);
        status("Serial Number:  " + p1Card);
        if (p1Card === serialNumber) {originante = 1;receptor = 1;console.log("logueado player1");};
        if (p2Card === serialNumber) {originante = 2;receptor = 2;console.log("logueado player2");};   
        if (p3Card === serialNumber) {originante = 3;receptor = 3;console.log("logueado player3");};
        if (p4Card === serialNumber) {originante = 4;receptor = 4;console.log("logueado player4");};       
        if (p5Card === serialNumber) {originante = 5;receptor = 5;console.log("logueado player5");};
        if (p6Card === serialNumber) {originante = 6;receptor = 6;console.log("logueado player6");};
        if (p7Card === serialNumber) {originante = 7;receptor = 7;console.log("logueado player7");};
        if (p8Card === serialNumber) {originante = 8;receptor = 8;console.log("logueado player8");};
        document.getElementById('clickautent').click();
        const decoder = new TextDecoder();
       //consoleLog("Record type:  " + record.recordType);
         // consoleLog("MIME type:    " + record.mediaType);
          //consoleLog("=== data ===\n" + decoder.decode(record.data));
       // }
      }
    } catch (error) {
      status("ERROR on reader - " + error);
      consoleLog(error);
      disabled(false);
    }
  } else {
    disabled(true);
    consoleLog("Web NFC is not supported.");
  }
}

// async function writeTag() {
//  status("Setting up writer...");
//   if ("NDEFReader" in window) {
//    var msg = prompt("Message to write").trim();
//    disabled(true);
//    status("Waiting for tag to write...");
//    const writer = new NDEFReader();
//    try {
//      status(`Writing "${msg}" to tag...`);
//      await writer.write(msg);
//      status(`Msg written!...`);
//      consoleLog("NDEF message written!");
//      disabled(false);
//    } catch (error) {
//      status("ERROR on writer - " + error);
//      consoleLog(error);
//      disabled(false);
//    }
//   } else {
//    consoleLog("Web NFC is not supported.");
//    disabled(true);
//   }
// }

function consoleLog(data) {
  var logElement = document.getElementById("log");
  logElement.innerHTML += data + "\n";
}

// FINAL FUNCIONES DE NFC 


// BASE DE DATOS Y OPERACIONES
//----------------------------
//BASE DE TRANSACCIONES - Setear base
//----------------------------
function SetearBBDDMov() {
//Valor inicial base de datos de movimientos
var MDatabase =  [
  ["Banco", "InitCash", "->", "Jugadores"]
  // ,["Pedro", "800", "->", "Banco"]
];
//almacenamiento en LocalStorage de la base
localStorage.setItem('MDatabase', JSON.stringify(MDatabase));
console.log("Movimientos reiniciados a cero")
};
//----------------------------
//BASE DE TRANSACCIONES - Mostrar la tabla
//----------------------------

function MostrarBBDDMov() {
//Leyendo LocalStorage
var DecryptDatabase = JSON.parse(localStorage.getItem('MDatabase'));
//creamos objeto tabla
let Mtable = document.createElement('table');

//añadiendo headers
var Mheader = '<tr><th>ORIGEN</th><th>$$$</th><th></th><th>DESTINATARIO</th></tr>';
Mtable.innerHTML = Mheader
  
//iterate over every array(row) within DecryptDatabase
for (let row of DecryptDatabase) {
//Insert a new row element into the table element
  Mtable.insertRow();
//Iterate over every index(cell) in each array(row)
  for (let cell of row) {
//While iterating over the index(cell)
//insert a cell into the table element
    let newCell = Mtable.rows[Mtable.rows.length - 1].insertCell();
//add text to the created cell element
    newCell.textContent = cell;
  }
}
//append the compiled table to the DOM

//buscamos el div con el id="tablas"
var div4=document.getElementById("tablaMov");
//lo vaciamos
div4.innerHTML = '';
//le pegamos la tabla recien generada
div4.appendChild(Mtable);
};
//----------------------------
//BASE DE TRANSACCIONES - Nuevo Movimiento
//----------------------------

function NuevoMovimiento(origen, monto, destino) {

console.log (origen, monto, destino)
//LEyendo localStorage de movimientos
var TempDecryptDatabase = JSON.parse(localStorage.getItem('MDatabase')); 
//Añadiendo base
TempDecryptDatabase.unshift([origen, monto, "->", destino])
localStorage.setItem('MDatabase', JSON.stringify(TempDecryptDatabase)); 
};

//----------------------------
//BASE DE DATOS DE JUGADORES - Iniciar jugadores
//----------------------------

function IniciarPlayers(initcash) {

var PDatabase =  [
  ["1", "JOSE", "0000-0001", initcash],
  ["2", "MARIA", "0000-0002", initcash],
  ["3", "ROBERTO", "0000-0003", initcash],
  ["4", "JUAN", "0000-0004", initcash],
  ["5", "LAURA", "0000-0005", initcash],
  ["6", "CARLOS", "0000-0006", initcash],
  ["7", "MANUEL", "0000-0007", initcash],
  ["8", "ANA", "0000-0008", initcash],
  ["Park", "Parking Cash", "0000-0000", 0]
];
  
//almacenamiento en LocalStorage de la base
//creaciòn de tabla dinamiga

localStorage.setItem('PDatabase', JSON.stringify(PDatabase));
};

//----------------------------
//BASE DE DATOS DE JUGADORES - Mostrar tabla
//----------------------------

function MostrarBBDDPlay() {
var DecryptPDatabase = JSON.parse(localStorage.getItem('PDatabase'));

let Ptable = document.createElement('table');

//añadiendo headers
var Pheader = '<tr><th>PLAYER</th><th>NOMBRE</th><th>TARJETA</th><th>CAJA</th></tr>';
Ptable.innerHTML = Pheader
//iterate over every array(row) within DecryptDatabase
for (let row of DecryptPDatabase) {
//Insert a new row element into the table element
  Ptable.insertRow();
//Iterate over every index(cell) in each array(row)
  for (let cell of row) {
//While iterating over the index(cell)
//insert a cell into the table element
    let newCell = Ptable.rows[Ptable.rows.length - 1].insertCell();
//add text to the created cell element
    newCell.textContent = cell;
  }
}

var div4=document.getElementById("tablaJug");
div4.innerHTML = '';
div4.appendChild(Ptable);

};

function MostrarBBDDMovJug(nombrePj) {
//Leyendo LocalStorage
var DecryptDatabase = JSON.parse(localStorage.getItem('MDatabase'));
//creamos objeto tabla
let Mtable = document.createElement('table');
//añadiendo headers
var Mheader = '<tr><th>ORIGEN</th><th>$$$</th><th></th><th>DESTINATARIO</th></tr>';
Mtable.innerHTML = Mheader

//iterate over every array(row) within DecryptDatabase
for (let row of DecryptDatabase) {
  //Insert a new row element into the table element
  Mtable.insertRow();
//Iterate over every index(cell) in each array(row)
  for (let cell of row) {
//While iterating over the index(cell)
//insert a cell into the table element
    let newCell = Mtable.rows[Mtable.rows.length - 1].insertCell();
//add text to the created cell element
    newCell.textContent = cell;
  }
}
//buscamos el div con el id="tablas"
var div4=document.getElementById("tablaMov");
//lo vaciamos
div4.innerHTML = '';
//le pegamos la tabla recien generada
div4.appendChild(Mtable);
 
//Intento de filtro
  
  const trs = document.querySelectorAll('#tablaMov tr:not(.header)')
  const filter = nombrePj
  const regex = new RegExp(filter, 'i')
  const isFoundInTds = td => regex.test(td.innerHTML)
  const isFound = childrenArr => childrenArr.some(isFoundInTds)
  const setTrStyleDisplay = ({ style, children }) => {
    style.display = isFound([
      ...children // <-- All columns
    ]) ? '' : 'none' 
  }
  trs.forEach(setTrStyleDisplay)
//intento de filtro


};
//----------------------------
// OPERACIONES
//----------------------------

function CobrodeBanco(playern, monto) {
var player = playern-1;
montointc = parseInt(monto);
var TempDecryptDatabase = JSON.parse(localStorage.getItem('PDatabase'));  
TempDecryptDatabase[player][3] = montointc + parseInt(TempDecryptDatabase[player][3]);
localStorage.setItem('PDatabase', JSON.stringify(TempDecryptDatabase));

NuevoMovimiento("Banco", monto, TempDecryptDatabase[player][1])
};

function PagaraBanco(playern, monto) {

if (CheckSaldo(playern, monto) === true) {
console.log("Tiene saldo para la operaciòn, se realiza");
var player = playern-1;
montointc = parseInt(monto);
var TempDecryptDatabase = JSON.parse(localStorage.getItem('PDatabase'));  
TempDecryptDatabase[player][3] = parseInt(TempDecryptDatabase[player][3]) - montointc;
localStorage.setItem('PDatabase', JSON.stringify(TempDecryptDatabase));
NuevoMovimiento(TempDecryptDatabase[player][1], monto, "Banco");  
return true;
} else {
console.log("Saldo Insuficiente, operaciòn cancelada");
return false;
}
};

function Transferencia(origen, monto, destino) {

if (CheckSaldo(origen, monto) === true) {
console.log("Tiene saldo para la operaciòn, se realiza");
var origen = origen-1;
var destino = destino-1;
var TempDecryptDatabase = JSON.parse(localStorage.getItem('PDatabase'));
intammount = parseInt(monto)
TempDecryptDatabase[origen][3] = parseInt(TempDecryptDatabase[origen][3]) - intammount;
TempDecryptDatabase[destino][3] = intammount + parseInt(TempDecryptDatabase[destino][3]);
localStorage.setItem('PDatabase', JSON.stringify(TempDecryptDatabase));
NuevoMovimiento(TempDecryptDatabase[origen][1], monto, TempDecryptDatabase[destino][1]); 
return true;
} else {
console.log("Saldo Insuficiente, operaciòn cancelada");
return false;
}

};

function CheckSaldo(playern, monto) {

var player = playern-1;
var TempDecryptDatabase = JSON.parse(localStorage.getItem('PDatabase'));  
if (TempDecryptDatabase[player][3] >= parseInt(monto)) {
return true;
} else {
return false;
}

};

function ConsultaSaldo(playern) {

var player = playern-1;
var TempDecryptDatabase = JSON.parse(localStorage.getItem('PDatabase'));  
var saldoact = TempDecryptDatabase[player][3];
return saldoact;
};

function ConsultaAlias(playern) {

var player = playern-1;
var TempDecryptDatabase = JSON.parse(localStorage.getItem('PDatabase'));  
var aliases = TempDecryptDatabase[player][1];
return aliases;
};




// TECLADO NUMERICO
// FUNCIONES TECLADO NUMERICO
function KPress(tecl) {
var currentdisp = document.getElementById('displayamount').innerHTML;
if ( tecl == "AC")
{document.getElementById('displayamount').innerHTML = "0" } else {
if (currentdisp < 99999999) {
if ( tecl == "1" || tecl == "2" || tecl == "3" || tecl == "4" || tecl == "5" || tecl == "6" || tecl == "7" || tecl == "8" || tecl == "9" || tecl == "0" || tecl == "00")
    {
    document.getElementById('displayamount').innerHTML = parseInt(currentdisp.concat(tecl));
    };
}
}
};

// FIN TECLADO NUMERICO
// FIN FUNCIONES TECLADO NUMERICO


// TO-DO

//palabra secreta RESTARTALL para vaciar la LOCAL STORAGE?
//funcion de cambiar Alias: Crear ventana y proceso.

//Funcionamiento NFC: Probar y activar funciones automaticas

