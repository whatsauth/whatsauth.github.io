const url="/public/qr/qr.json";
const backend_url ="https://ap-southeast-1.aws.data.mongodb-api.com/app/whatsauth-ghzng/endpoint/whatsauth"
const api_key = "BKH4OMazPlAKjMWQnUvxqmHwdWR06lTLTnB7PwuVM6wSKwZGAxrYB1limn2fy4aN"


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
  checkCookie();
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
    document.getElementById("phonenumber").innerHTML = phonenumber;
    getData(url);
    document.getElementById("nophonenumber").classList.add("hidden");
    document.getElementById("hasphonenumber").classList.remove("hidden");
  } else {
    setUserAgent();
    document.getElementById("hasphonenumber").classList.add("hidden");
    document.getElementById("nophonenumber").classList.remove("hidden");
  }
}


function submitPhoneNumber(){
  let phonenumber = document.getElementById("loginphonenumber").value;
  let isnum = /^\d+$/.test(phonenumber);
  if (isnum){
    setPhoneNumber(localPrefixHandler(phonenumber));
    checkCookie();
  } else{
    document.getElementById("loginmessage").innerHTML ="Please enter a valid Phone Number. E.g: 62811223344";
  }
  
}

function localPrefixHandler(phonenumber){
  let prefix=phonenumber[0];
  if (prefix === '0'){
    phonenumber=phonenumber.replace(prefix,'62');
  }
  return phonenumber;
}

async function setUserAgent(){
  let resp = await fetch("https://icanhazip.com");
  let ipaddr = await resp.text();
  let agent = navigator.userAgent.replace(/;/g,"");
  setCookieWithExpireDay("ipaddr", ipaddr, 365);
  setCookieWithExpireDay("agent", agent, 365);
}

function enterKeyPressed(event) {
  let input = document.getElementById("loginphonenumber");
  input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("loginbutton").click();
    }
  });
} 

function postData(){
  var myHeaders = new Headers();
  myHeaders.append("api-key", "BKH4OMazPlAKjMWQnUvxqmHwdWR06lTLTnB7PwuVM6wSKwZGAxrYB1limn2fy4aN");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "api-key":api_key,
    "phonenumber": getCookie("phonenumber"),
    "uuid": crypto.randomUUID()
  });

  var requestOptions = {
    method: 'POST',
    body: raw,
    redirect: 'follow'
  };

  fetch(backend_url, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}