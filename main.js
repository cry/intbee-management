    var countdown = null,
        readyCountdown = null,
        pause = false,
        timeupMessage = "Times up.";

    window.onload = () => {

        var school = location.search.split('school=')[1]

        if (school) {
            document.getElementById("school").textContent = school;
        };

    }

    divide = () => {
        document.getElementById('divide').style.display = (document.getElementById('divide').style.display == "none" ? "block" : "none");
    }

    render = (tex, time, prep) => {

        var math = MathJax.Hub.getAllJax("int")[0],
            intdiv = document.getElementById('int'),
            timediv = document.getElementById('time'),
            readydiv = document.getElementById('ready');

        if (pause) {
            togglePause();
        };

        // Cleanup
        clearInterval(countdown);
        clearInterval(readyCountdown);

        readydiv.style.display = "block";
        intdiv.style.display = "none";
        timediv.style.display = "none";

        MathJax.Hub.Queue(["Text",math,tex]);

        document.getElementById("time").textContent = time;

        readydiv.innerHTML = "<h1>Round starts in <br> <span id='readytime' style='font-size: 4em'>" + Number(prep) + "</span> </h1>"

        readyCountdown = setInterval(() => {
            var counter = document.getElementById('readytime'),
                val = counter.textContent;

            if (val == 1) {
                readydiv.style.display = "none";
                intdiv.style.display = "block";
                timediv.style.display = "block";

                clearInterval(readyCountdown);

                countdown = setInterval(() => {
                    var counter = document.getElementById('time'),
                        val = counter.textContent;

                        if (val == 1) {
                            timediv.textContent = timeupMessage;

                            clearInterval(countdown);
                        } else {
                            if (!pause) counter.textContent = --val;
                        }
                }, 1000)
            } else {
                if (!pause) counter.textContent = --val;
            }
        }, 1000);

    }

    addTime = (time) => {

        var math = MathJax.Hub.getAllJax("int")[0],
            intdiv = document.getElementById('int'),
            timediv = document.getElementById('time'),
            readydiv = document.getElementById('ready');

        if (isNaN(Number(document.getElementById('time').textContent))) {
            document.getElementById('time').textContent = time;

            countdown = setInterval(() => {
                var counter = document.getElementById('time'),
                    val = counter.textContent;

                    if (val == 1) {
                        timediv.textContent = timeupMessage;

                        clearInterval(countdown);
                    } else {
                        if (!pause) counter.textContent = --val;
                    }
            }, 1000)


            return;
        };

        document.getElementById('time').textContent = Number(document.getElementById('time').textContent) + Number(time);
    }

    togglePause = () => {

        var pausenotice = document.getElementById('pause');

        pause = !pause;

        pausenotice.style.display = (pause ? "block" : "none");
    }

    setTimeoutMessage = (msg) => timeupMessage = msg;

    changeName = (player, name) => {
        if (player == "left") {
            document.getElementById("leftname").textContent = name;
        } else {
            document.getElementById("rightname").textContent = name;
        }
    }

    changeScore = (player, score) => {

        if (score == "" || score > 5) return false;

        var str = "";

        for (var i = score -1; i >= 0; i--) {
            str += "X"
        };

        if (player == "left") {
            document.getElementById("leftscore").textContent = str;
        } else {
            document.getElementById("rightscore").textContent = str;
        }
    }
