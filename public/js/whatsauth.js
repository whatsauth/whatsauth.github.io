const url="/public/qr/qr.json";

let logoutbutton = `<button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
<svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
<span>Logout</span>
</button>`;



async function getData(url) {
  let resp = await fetch(url);
  let data = await resp.json();
  showQR(data.qr);
  document.getElementById("status").innerHTML = data.status;
  document.getElementById("message").innerHTML = data.message;
  sleep();
}

function sleep(){
var refresh=1000; // Refresh rate in milli seconds
mytime=setTimeout('getData(url)',refresh)
}

function makeQrCode(text){
    qr = QRCode.generateSVG(text, {
        ecclevel: "M",
        fillcolor: "#F2F2F2",
        textcolor: "#D13438",
        margin: 4,
        modulesize: 8
    });
    var svg = document.getElementById("qrcode");
    svg.replaceChild(qr,svg.firstElementChild);
}

function showQR(text){
  if (typeof text === 'string' && text.length === 0) {
    document.getElementById('qrcode').style.display = 'none';
  } else {
    makeQrCode(text);
  }
}



function setCookieWithExpireDay(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let phonenumber = getCookie("phonenumber");
  if (phonenumber != "") {
    document.getElementById("phonenumber").innerHTML = phonenumber+logoutbutton;
  } else {
    phonenumber = prompt("Please enter your phone number :", "");
    if (phonenumber != "" && phonenumber != null) {
      setCookieWithExpireDay("phonenumber", phonenumber, 365);
    }
  }
}