var countdown = null,
    readyCountdown = null,
    pause = false,
    timeupMessage = "Times up.";
window.onload = function() {
  var school = location.search.split('school=')[1];
  if (school) {
    document.getElementById("school").textContent = school;
  }
  ;
};
divide = function() {
  document.getElementById('divide').style.display = (document.getElementById('divide').style.display == "none" ? "block" : "none");
};
render = function(tex, time, prep) {
  var math = MathJax.Hub.getAllJax("int")[0],
      intdiv = document.getElementById('int'),
      timediv = document.getElementById('time'),
      readydiv = document.getElementById('ready');
  if (pause) {
    togglePause();
  }
  ;
  clearInterval(countdown);
  clearInterval(readyCountdown);
  readydiv.style.display = "block";
  intdiv.style.display = "none";
  timediv.style.display = "none";
  MathJax.Hub.Queue(["Text", math, tex]);
  document.getElementById("time").textContent = time;
  readydiv.innerHTML = "<h1>Round starts in <br> <span id='readytime' style='font-size: 4em'>" + Number(prep) + "</span> </h1>";
  readyCountdown = setInterval(function() {
    var counter = document.getElementById('readytime'),
        val = counter.textContent;
    if (val == 1) {
      readydiv.style.display = "none";
      intdiv.style.display = "block";
      timediv.style.display = "block";
      clearInterval(readyCountdown);
      countdown = setInterval(function() {
        var counter = document.getElementById('time'),
            val = counter.textContent;
        if (val == 1) {
          timediv.textContent = timeupMessage;
          clearInterval(countdown);
        } else {
          if (!pause)
            counter.textContent = --val;
        }
      }, 1000);
    } else {
      if (!pause)
        counter.textContent = --val;
    }
  }, 1000);
};
addTime = function(time) {
  var math = MathJax.Hub.getAllJax("int")[0],
      intdiv = document.getElementById('int'),
      timediv = document.getElementById('time'),
      readydiv = document.getElementById('ready');
  if (isNaN(Number(document.getElementById('time').textContent))) {
    document.getElementById('time').textContent = time;
    countdown = setInterval(function() {
      var counter = document.getElementById('time'),
          val = counter.textContent;
      if (val == 1) {
        timediv.textContent = timeupMessage;
        clearInterval(countdown);
      } else {
        if (!pause)
          counter.textContent = --val;
      }
    }, 1000);
    return;
  }
  ;
  document.getElementById('time').textContent = Number(document.getElementById('time').textContent) + Number(time);
};
togglePause = function() {
  var pausenotice = document.getElementById('pause');
  pause = !pause;
  pausenotice.style.display = (pause ? "block" : "none");
};
setTimeoutMessage = function(msg) {
  return timeupMessage = msg;
};
changeName = function(player, name) {
  if (player == "left") {
    document.getElementById("leftname").textContent = name;
  } else {
    document.getElementById("rightname").textContent = name;
  }
};
changeScore = function(player, score) {
  if (score == "" || score > 5)
    return false;
  var str = "";
  for (var i = score - 1; i >= 0; i--) {
    str += "X";
  }
  ;
  if (player == "left") {
    document.getElementById("leftscore").textContent = str;
  } else {
    document.getElementById("rightscore").textContent = str;
  }
};
