setInterval(function() {
  if (window.opener == null) {
    document.body.innerHTML = "<h1 style='text-align: center;'>Main page closed. Open a new instance and reopen the control panel.</h1>";
  }
  ;
}, 100);
render = function() {
  var tex = document.getElementById('int').value.split("$").join("").split("$$").join("").replace("dx", '\\hspace{4mm}dx');
  var math = MathJax.Hub.getAllJax("MathDiv")[0];
  MathJax.Hub.Queue(["Text", math, tex]);
};
send = function() {
  var tex = document.getElementById('int').value.split("$").join("").split("$$").join("").replace("dx", '\\hspace{4mm}dx'),
      time = document.getElementById('time').value,
      prep = document.getElementById('prep').value;
  if (tex == "" || time == "" || prep == "") {
    alert("Must enter something!");
    return;
  }
  ;
  window.opener.render(tex, time, prep);
};
add = function() {
  return window.opener.addTime(document.getElementById('extra').value);
};
timeup = function() {
  return window.opener.setTimeoutMessage(document.getElementById('timeup').value);
};
