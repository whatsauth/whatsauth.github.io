/*jslint browser */
/*global process */
const backend_url ="https://domain/wauth.php";
const login_url ="https://domain/besan.depan.php";
const api_key = "BKH4OMazPlAKjMWQnUvxqmHwdWR06lTLTnB7PwuVM6wSKwZGAxrYB1limn2fy4aN";
const keyword = "https://wa.me/628112000279?text=wh4t5auth0";
const interval = 30;
const maxqrwait = 70;
let jsonres;
let rto =0;

function main() {
  qrController();
}


function generatePassword() {
  var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var passwordLength = 17;
  var password = "";
  for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber +1);
   }
  return password;
}

async function hashtosha512(str) {
  return crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str)).then(buf => {
    return Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
  });
}

function generateUUID(){
  let a=crypto.randomUUID()+"."+generatePassword()+"."+crypto.randomUUID()+"."+generatePassword()+"."+crypto.randomUUID()+"."+generatePassword()+"."+crypto.randomUUID();
  return a;
}

function getUUID(){
  let uuid = getCookie("uuid");
  if (uuid === "") {
    setCookieWithExpireSecond("uuid",generateUUID(),interval);
    uuid = getCookie("uuid");
  }
  return uuid
}

function qrController() {
  let uuid = getUUID();
  let user_name = getCookie("user_name");
  showQR(keyword+uuid);
  rto++;
  if (user_name === "" || user_name === "undefined"){
    if (rto < maxqrwait){
      postData();
      setTimeout('qrController()',1000);
    }else{
      document.getElementById("whatsauthqr").innerHTML = "Refresh Your Browser to get QR";
    }
  }else{
    submitLogin();
  }
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
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("uuid", getCookie("uuid"));

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  fetch(backend_url, requestOptions)
  .then(response => response.text())
  .then(result => catcher(result))
  .catch(error => console.log('error', error));
}

function fillformLogin(resjson){
  document.getElementById("user_name").value = resjson.user_name;
  document.getElementById("user_pass").value = resjson.user_pass;
}

function submitLogin(){
  document.getElementById("whatsauthqr").innerHTML = "Login...";
  document.getElementById("loginform").submit();
  //document.getElementById("login").click();
}

function catcher(result){
  //let res = JSON.parse(result);
  if (result.length > 2){
    jsonres = JSON.parse(result);
    console.log("catcher dari postdata");
    console.log(jsonres);
    setCookieWithExpireSecond("user_name",jsonres.user_name,interval);
    fillformLogin(jsonres);
  }
}


main();