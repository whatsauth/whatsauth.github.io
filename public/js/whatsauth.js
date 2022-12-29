const url="/public/qr/qr.json";

let logoutbutton = `   <button onclick="logout()" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-0 px-1 border border-blue-500 hover:border-transparent rounded">
Logout
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


function logout(){
  deleteCookie("phonenumber");
}

function setCookieWithExpireDay(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function deleteCookie(cname) {
  document.cookie = cname + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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