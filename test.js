var d = "https://api.openweathermap.org/data/2.5/weather?";
var key = "&appid=0ddfc471a0c63f2e9d5172df7c5ad701&units=metric";

var fl = flf();
var p = pf();
var h = hf();
var s = sf();
var des = desf();
var ws = wsf();
var c = cf();
var icon = iconf();

function cf() {
  return function (data) {
      var res = data + " " + "<span id = " + "press" + ">&#37;</span>";
    return "<span id = " + "temp" + ">cloudy</span><br>" + res;
  };
}

function wsf() {
  return function (data) {
      var kmph = (data*18)/5;
      var res = kmph.toFixed(2) + " " + "kph";
    return "<span id = " + "temp" + ">wind</span><br>" + res;
  };
}

function desf() {
  return function (data) {
    return data;
  };
}

function sf() {
  return function (data) {
    let unix_timestamp = data;
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var formattedTime =
      hours + ":" + minutes.substr(-2);
    if(hours < 12){
        return "<span id = " + "temp" + ">sunrise</span><br>" + formattedTime;
    } else{
        return "<span id = " + "temp" + ">sunset</span><br>" + formattedTime;
    }
  };
}

function hf() {
  return function (data) {
      var res = data + " " + "<span id = " + "press" + ">&#37;</span>";
    return "<span id = " + "temp" + ">humidity</span><br>" + res;
  };
}

function pf() {
  return function (data) {
      var res = data + " " + "hPa";
    return "<span id = " + "temp" + ">pressure</span><br>" + res;
  };
}

function flf() {
  return function (data) {
      var res = data + " " + "<span>&#8451;</span>";
    return res;
  };
}

function iconf() {
  return function (data) {
    return (
      '<img src="http://openweathermap.org/img/w/' +
      data +
      '.png" alt="weather icon" width="50" height="60" background-color="yellow"></img>'
    );
  };
}

function loadDoc() {
  const xhttp = new XMLHttpRequest();
  var res = document.getElementById("finp").value.split(" ").join("+");
  var url = d + "q" + "=" + res + key;
  xhttp.onload = function () {
    var more = JSON.parse(this.responseText);
    document.getElementById("feels_like").innerHTML = fl(more.main.feels_like);
    document.getElementById("pressure").innerHTML = p(more.main.pressure);
    document.getElementById("humidity").innerHTML = h(more.main.humidity);
    document.getElementById("sunrise").innerHTML = s(more.sys.sunrise);
    document.getElementById("sunset").innerHTML = s(more.sys.sunset);
    document.getElementById("description").innerHTML = des(
      more.weather[0].description
    );
    document.getElementById("speed").innerHTML = ws(more.wind.speed);
    document.getElementById("clouds").innerHTML = c(more.clouds.all);
    document.getElementById("city").innerHTML = more.name;
    document.getElementById("icon").innerHTML = icon(more.weather[0].icon);
  };
  xhttp.open("GET", url);
  xhttp.send();
}
