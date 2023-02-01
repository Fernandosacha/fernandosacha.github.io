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

function lanzamenu1() {
var d = document.getElementById("accion-compra");
$(".overlay-app").addClass("is-active");
d.classList.add("visible");
};

function lanzamenu2() {
var d = document.getElementById("accion-cobro");
$(".overlay-app").addClass("is-active");
d.classList.add("visible");
};

function lanzamenu3() {
var d = document.getElementById("accion-transfe");
$(".overlay-app").addClass("is-active");
d.classList.add("visible");
};

function lanzamenu4() {
var d = document.getElementById("accion-saldo");
$(".overlay-app").addClass("is-active");
d.classList.add("visible");
};

function lanzamenu5() {
var d = document.getElementById("accion-movimientos");
$(".overlay-app").addClass("is-active");
d.classList.add("visible");
};

function lanzamenu6() {
var d = document.getElementById("accion-parking");
$(".overlay-app").addClass("is-active");
d.classList.add("visible");
};

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
        status("Decoded tag data...");
        const decoder = new TextDecoder();
        for (const record of event.message.records) {
          consoleLog("Record type:  " + record.recordType);
          consoleLog("MIME type:    " + record.mediaType);
          consoleLog("=== data ===\n" + decoder.decode(record.data));
        }
      };
      disabled(false);
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

async function writeTag() {
  status("Setting up writer...");
  if ("NDEFReader" in window) {
    var msg = prompt("Message to write").trim();
    disabled(true);
    status("Waiting for tag to write...");
    const writer = new NDEFReader();
    try {
      status(`Writing "${msg}" to tag...`);
      await writer.write(msg);
      status(`Msg written!...`);
      consoleLog("NDEF message written!");
      disabled(false);
    } catch (error) {
      status("ERROR on writer - " + error);
      consoleLog(error);
      disabled(false);
    }
  } else {
    consoleLog("Web NFC is not supported.");
    disabled(true);
  }
}

function consoleLog(data) {
  var logElement = document.getElementById("log");
  logElement.innerHTML += data + "\n";
}
