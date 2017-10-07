function setBadgeText(amountDays) {

    chrome.browserAction.setBadgeText({text: amountDays.toString()});
    chrome.browserAction.setBadgeBackgroundColor({ color: [128, 128, 128, 255] });
}

function loadDataFromServer() {

    var ip = document.getElementById("ip_input").value;
    var port = document.getElementById("port_input").value;



    if ((ip != "") && (port != "")) {

        var xhr = new XMLHttpRequest();

        xhr.open("POST", "http://abonent.teleoka.su/cs-test/index.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.timeout = 5000;

        document.getElementById("server_data").style.display = "none";
        document.getElementById("waitBlock").style.display = "block";

        xhr.onreadystatechange = function() {

            if (xhr.readyState == 4)
            {
                document.getElementById("waitBlock").style.display = "none";
                document.getElementById("server_data").style.display = "block";

                if (xhr.status != 200 ) {
                    document.getElementById("server_data").style.display = "none";
                    document.getElementById("statusMessage").style.display = "block";
                    document.getElementById("statusMessage").innerHTML = "<center><b>Ошибка</b></center>" +
                        "Нет подключения к серверу.<hr width='95%'> ";
                } else {

                    var json = xhr.responseText;

                    if (JSON.parse(json).status == 0) {

                        document.getElementById("server_data").style.display = "none";
                        document.getElementById("statusMessage").style.display = "block";
                        document.getElementById("statusMessage").innerHTML = "<center><b>Ошибка.</b></center>" +
                            "Игровой сервер не доступен.<hr width='95%'> ";

                    } else if (JSON.parse(json).status == 1) {

                        document.getElementById("host_name").innerHTML = JSON.parse(json).hostname;

                        setBadgeText(JSON.parse(json).players);

                    }
                }
            }
        }
        xhr.send("ip="
            + ip +"&ip="
            + port +"&port=");
    } else {
        document.getElementById("server_data").style.display = "none";
        document.getElementById("waitBlock").style.display = "none";
        document.getElementById("statusMessage").style.display = "block";
        document.getElementById("config_data").style.display = "block";
        document.getElementById("statusMessage").innerHTML = "<center><b>Приложение не настроено</b></center>" +
            " Перед началом работы, необходимо указать IP адрес сервера и порт.<hr width='95%'>";
    }
}

function load() {
    chrome.storage.sync.get('userIP', function (result) {

        if(result.userIP) {

            document.getElementById("ip_input").value = result.userIP;

        } else {

            document.getElementById("ip_input").value = "";

        }
    });

    chrome.storage.sync.get('userPort', function (result) {

        if(result.userPort) {

            document.getElementById("port_input").value = result.userPort;

        } else {

            document.getElementById("port_input").value = "";

        }

        loadDataFromServer();
    });
}

function showOrHideConfig() {
    if (document.getElementById("config_data").style.display == "none") {
        document.getElementById("img").src = "return.png";
        document.getElementById("server_data").style.display = "none";
        document.getElementById("links").style.display = "none";
        document.getElementById("config_data").style.display = "block";
        document.getElementById("statusMessage").style.display = "none";
    } else {
        document.getElementById("img").src = "icons-settings.png";
        document.getElementById("server_data").style.display = "block";
        document.getElementById("links").style.display = "block";
        document.getElementById("config_data").style.display = "none";
    }
}

function saveConfig() {
    chrome.storage.sync.set({ userIP: document.getElementById("ip_input").value });
    chrome.storage.sync.set({ userPort: document.getElementById("port_input").value });
    location.reload(true)
}

document.addEventListener('DOMContentLoaded', function () {

    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }

    var img = document.getElementById("img");
    img.addEventListener('click', function () {
        showOrHideConfig();
    });

    var saveBtn = document.getElementById("saveBtn");
    saveBtn.addEventListener('click', function () {
        saveConfig();
    });
});

load();