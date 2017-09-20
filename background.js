function setBadgeText(amountDays) {
    chrome.browserAction.setBadgeText({text: amountDays.toString()});
    if (amountDays < 6) {
        chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
    } else {
        chrome.browserAction.setBadgeBackgroundColor({ color: [128, 128, 128, 255] });
    }
}

function loadDataFromServer() {

    var uid = userData.uid;
    var password = userData.pwd;



    if ((uid != "") && (password != "")) {

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://abonent.teleoka.su/chrome-extensions-gate.php?uid="
            + uid +"&password="
            + password +"&version="
            + chrome.app.getDetails().version +"&r="
            + Math.random(), true);

        xhr.timeout = 5000;

        xhr.onreadystatechange = function() {

            if (xhr.readyState == 4)
            {

                if (xhr.status == 200 ) {

                    var json = xhr.responseText;

                    if (JSON.parse(json).state == 1) {

                        setBadgeText(JSON.parse(json).day_before_lock);

                    }
                }
            }
        }
        xhr.send();
    }
}

function load() {
    chrome.storage.sync.get('userUID', function (result) {

        if(result.userUID) {

            userData.uid = result.userUID;

        }
    });

    chrome.storage.sync.get('userPassword', function (result) {

        if(result.userPassword) {

           userData.pwd = result.userPassword;

        }

        loadDataFromServer();
    });
}

var userData = new Object();
userData.uid = "";
userData.pwd = "";

chrome.alarms.onAlarm.addListener(function() {
    load();
});

chrome.alarms.create('', { periodInMinutes: 120 });

load();
