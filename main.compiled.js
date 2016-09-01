var countdown = null,
    readyCountdown = null,
    pause = false,
    timeupMessage = "Times up.";
window.onload = function() {
  document.getElementById("time").innerHTML = "120";
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
  document.getElementById("time").innerHTML = time;
  readydiv.innerHTML = "<h1>Round starts in <br> <span id='readytime' style='font-size: 4em'>" + prep + "</span> </h1>";
  readyCountdown = setInterval(function() {
    var counter = document.getElementById('readytime'),
        val = counter.innerHTML;
    if (val == 1) {
      readydiv.style.display = "none";
      intdiv.style.display = "block";
      timediv.style.display = "block";
      clearInterval(readyCountdown);
      countdown = setInterval(function() {
        var counter = document.getElementById('time'),
            val = counter.innerHTML;
        if (val == 1) {
          timediv.innerHTML = timeupMessage;
          clearInterval(countdown);
        } else {
          if (!pause)
            counter.innerHTML = --val;
        }
      }, 1000);
    } else {
      if (!pause)
        counter.innerHTML = --val;
    }
  }, 1000);
};
addTime = function(time) {
  var math = MathJax.Hub.getAllJax("int")[0],
      intdiv = document.getElementById('int'),
      timediv = document.getElementById('time'),
      readydiv = document.getElementById('ready');
  if (isNaN(Number(document.getElementById('time').innerHTML))) {
    document.getElementById('time').innerHTML = time;
    countdown = setInterval(function() {
      var counter = document.getElementById('time'),
          val = counter.innerHTML;
      if (val == 1) {
        timediv.innerHTML = timeupMessage;
        clearInterval(countdown);
      } else {
        if (!pause)
          counter.innerHTML = --val;
      }
    }, 1000);
    return;
  }
  ;
  document.getElementById('time').innerHTML = Number(document.getElementById('time').innerHTML) + Number(time);
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
    document.getElementById("leftname").innerHTML = name;
  } else {
    document.getElementById("rightname").innerHTML = name;
  }
};
changeScore = function(player, score) {
  if (player == "left") {
    document.getElementById("leftscore").innerHTML = score;
  } else {
    document.getElementById("rightscore").innerHTML = score;
  }
};
