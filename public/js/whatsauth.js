const url="/public/qr/qr.json";
const backend_url ="https://ap-southeast-1.aws.data.mongodb-api.com/app/whatsauth-ghzng/endpoint/whatsauth"
const api_key = "BKH4OMazPlAKjMWQnUvxqmHwdWR06lTLTnB7PwuVM6wSKwZGAxrYB1limn2fy4aN"
const keyword = "https://wa.me/628112000279?text=whatsauth%20"
const interval = 30


function main() {
  qrController();
}


function generatePassword() {
  var length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

async function hashtosha512(str) {
  return crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str)).then(buf => {
    return Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
  });
}

function generateUUID(){
  let a=crypto.randomUUID()+generatePassword();
  return hashtosha512(a);
}

function qrController() {
  let uuid = getCookie("uuid");
  if (uuid === "") {
    setCookieWithExpireSecond("uuid",generateUUID(),interval);
    uuid = getCookie("uuid");
  } else {
    showQR(keyword+uuid);
    postData();
  }
  sleep();
}

function sleep(){
var refresh=1000; // Refresh rate in milli seconds
mytime=setTimeout('qrController()',refresh)
}

function makeQrCode(text){
    qr = QRCode.generateSVG(text, {
        ecclevel: "M",
        fillcolor: "#FFFFFF",
        textcolor: "#000000",
        margin: 4,
        modulesize: 8
    });
    var svg = document.getElementById("whatsauthqr");
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

function setCookieWithExpireSecond(cname, cvalue, exsecs) {
  const d = new Date();
  d.setTime(d.getTime() + (exsecs * 1000));
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

function postData(){
  let raw = JSON.stringify({
    "api-key":api_key,
    "uuid": getCookie("uuid")
  });

  let requestOptions = {
    method: 'POST',
    body: raw,
    redirect: 'follow'
  };

  fetch(backend_url, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

main();