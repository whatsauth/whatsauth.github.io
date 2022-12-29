const url="/public/qr/qr.json";

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
        fillcolor: "#FFFFFF",
        textcolor: "#000000",
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


function setPhoneNumber(phonenumber){
  if (phonenumber != "" && phonenumber != null) {
    setCookieWithExpireDay("phonenumber", phonenumber, 365);
  }
}

function changePhoneNumber(){
  deleteCookie("phonenumber");
  document.getElementById("phonenumber").innerHTML = "please login";
}

function setCookieWithExpireDay(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function deleteCookie(cname) {
  document.cookie = cname + "= ; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
    console.log("ada phone number");
    console.log(phonenumber);
    document.getElementById("nophonenumber").classList.add("hidden");
    document.getElementById("phonenumber").innerHTML = phonenumber;
  } else {
    console.log("ga ada phone number");
    document.getElementById("hasphonenumber").classList.add("hidden");
  }
}


function submitPhoneNumber(){
  const btn = document.querySelector('#submit');
  const form = document.querySelector('#loginform');
  const messageEl = document.querySelector('#message');

  btn.addEventListener('click', (e) => {
      e.preventDefault();
      subscribe();
  });

}