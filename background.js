function setBadgeText(amountDays) {

    chrome.browserAction.setBadgeText({text: amountDays.toString()});
    chrome.browserAction.setBadgeBackgroundColor({ color: [128, 128, 128, 255] });
}

function loadDataFromServer() {

    var uid = serverData.ip;
    var password = serverData.port;



    if ((uid != "") && (password != "")) {

        var xhr = new XMLHttpRequest();

        xhr.open("POST", "http://abonent.teleoka.su/cs-test/index.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.timeout = 5000;

        xhr.onreadystatechange = function() {

            if (xhr.readyState == 4)
            {

                if (xhr.status == 200 ) {

                    var json = xhr.responseText;

                    if (JSON.parse(json).status == 1) {

                        setBadgeText(JSON.parse(json).players);

                    } else if (JSON.parse(json).status == 1) {

                        setBadgeText("X");

                    }
                }
            }
        }
        xhr.send("ip="
            + serverData.ip +"&ip="
            + serverData.port +"&port=");
    }
}

function load() {
    chrome.storage.sync.get('userIP', function (result) {

        if(result.userIP) {

            serverData.ip = result.userIP;

        }
    });

    chrome.storage.sync.get('userPort', function (result) {

        if(result.userPort) {

           serverData.port = result.userPort;

        }

        loadDataFromServer();
    });
}

var serverData = new Object();
serverData.ip = "";
serverData.port = "";

chrome.alarms.onAlarm.addListener(function() {
    load();
});

chrome.alarms.create('', { periodInMinutes: 1 });

chrome.browserAction.setBadgeText({text: ""});

load();
