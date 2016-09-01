        setInterval(() => {
            if (window.opener == null) {
                document.body.innerHTML = "<h1 style='text-align: center;'>Main page closed. Open a new instance and reopen the control panel.</h1>";
            };
        }, 100);

        render = () => {
            var tex = document.getElementById('int').value.split("$").join("").split("$$").join("").replace("dx", '\\hspace{4mm}dx');

            var math = MathJax.Hub.getAllJax("MathDiv")[0];

            MathJax.Hub.Queue(["Text",math,tex]);
        }

        send = () => {

            var tex = document.getElementById('int').value.split("$").join("").split("$$").join("").replace("dx", '\\hspace{4mm}dx'),
                time = document.getElementById('time').value,
                prep = document.getElementById('prep').value;

            if (tex == "" || time == "" || prep == "") {
                alert("Must enter something!");

                return;
            };

            window.opener.render(tex, time, prep);
        }

        add = () => window.opener.addTime(document.getElementById('extra').value);

        timeup = () => window.opener.setTimeoutMessage(document.getElementById('timeup').value);

        changeName = (player, name) => window.opener.changeName(player, name);

        changeScore = (player, name) => window.opener.changeScore(player, name);

        bumpInt = () => {
            var list = document.getElementById('intlist').value,
                parsedList = list.split(/\r|\n/);

            if (parsedList[0] == "") {
                alert('List is empty.');

                return;
            }

            if (parsedList.slice(-1)[0] == "") parsedList.pop();

            document.getElementById('int').value = parsedList[0].replace('\\item', '');

            render();

            parsedList.shift();

            document.getElementById('intlist').value = parsedList.join("\r\n");
        }

        hideList = () => document.getElementById('intlist').style.display = (document.getElementById('intlist').style.display == "none" ? "block" : "none");
