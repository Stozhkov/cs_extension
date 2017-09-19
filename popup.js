function notShowDateOfLock() {

    document.getElementById("date_of_lock_label").style.display = "none";
    document.getElementById("date_of_lock").style.display = "none";

}

function notShowDayBeforeLock() {

    document.getElementById("day_before_lock_label").style.display = "none";
    document.getElementById("day_before_lock").style.display = "none";

}

function notShowSumma() {

    document.getElementById("summa").style.display = "none";
    document.getElementById("summa_label").style.display = "none";

}

function notShowBonus() {

    document.getElementById("bonus").style.display = "none";
    document.getElementById("bonus_label").style.display = "none";

}

function notShowDeposit() {

    document.getElementById("deposit").style.display = "none";
    document.getElementById("deposit_label").style.display = "none";

}

function notShowMonthlyPay() {

    document.getElementById("monthly_pay_label").style.display = "none";
    document.getElementById("monthly_pay").style.display = "none";

}

function notShowPacket() {

    document.getElementById("packet_label").style.display = "none";
    document.getElementById("packet").style.display = "none";

}

function loadDataFromServer() {

    var uid = document.getElementById("uid_input").value;
    var password = document.getElementById("password_input").value;

    if ((uid != "") && (password != "")) {

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://abonent.teleoka.su/chrome-extensions-gate.php?uid="
            + uid +"&password="
            + password +"&version="
            + chrome.app.getDetails().version, true);

        xhr.timeout = 5000;

        document.getElementById("users_data").style.display = "none";
        document.getElementById("waitBlock").style.display = "block";

        xhr.onreadystatechange = function() {

            if (xhr.readyState == 4)
            {
                document.getElementById("waitBlock").style.display = "none";
                document.getElementById("users_data").style.display = "block";

                if (xhr.status != 200 ) {
                    document.getElementById("users_data").style.display = "none";
                    document.getElementById("statusMessage").style.display = "block";
                    document.getElementById("statusMessage").innerHTML = "<center><b>Ошибка</b></center>" +
                        "Нет подключения к серверу.<hr width='95%'> ";
                } else {

                    var json = xhr.responseText;

                    if (JSON.parse(json).state == 0) {

                        document.getElementById("users_data").style.display = "none";
                        document.getElementById("statusMessage").style.display = "block";
                        document.getElementById("statusMessage").innerHTML = "<center><b>Ошибка.</b></center>" +
                            "Неверно введен номер договора или пароль.<hr width='95%'> ";
                        document.getElementById("payImage").style.display = "none";
                        document.getElementById("accountImage").style.display = "none";

                    } else if (JSON.parse(json).state == 1) {

                        if(JSON.parse(json).blocked == 1) {
                            document.getElementById("statusMessage").style.display = "block";
                            document.getElementById("statusMessage").innerHTML = "<center><b>Интернет заблокирован</b></center>" +
                                "Доступ в интернет заблокирован свяжитесь с администратором.<hr width='95%'> ";
                            notShowDayBeforeLock();
                            notShowDateOfLock();
                        }

                        document.getElementById("uid").innerHTML = JSON.parse(json).uid;
                        document.getElementById("packet").innerHTML = JSON.parse(json).packet;
                        document.getElementById("monthly_pay").innerHTML = JSON.parse(json).monthly_pay + " руб.";
                        document.getElementById("address").innerHTML = JSON.parse(json).address;
                        document.getElementById("deposit").innerHTML = JSON.parse(json).deposit + " руб.";
                        document.getElementById("bonus").innerHTML = JSON.parse(json).bonus + " руб.";
                        document.getElementById("summa").innerHTML = JSON.parse(json).summa + " руб.";
                        document.getElementById("day_before_lock").innerHTML = JSON.parse(json).day_before_lock;
                        document.getElementById("date_of_lock").innerHTML = JSON.parse(json).date_of_lock;

                    } else if (JSON.parse(json).state == 2) {

                        document.getElementById("statusMessage").style.display = "block";
                        document.getElementById("statusMessage").innerHTML = "<center><b>Договор расторгнут.</b></center>" +
                            "Для возобновления доступа в Интернет необходимо заключить договор. Свяжитесь с администраторм.<hr width='95%'> ";
                        document.getElementById("uid").innerHTML = JSON.parse(json).uid;
                        document.getElementById("address").innerHTML = JSON.parse(json).address;
                        document.getElementById("payImage").style.display = "none";
                        document.getElementById("accountImage").style.display = "none";

                        notShowPacket();
                        notShowMonthlyPay();
                        notShowDeposit();
                        notShowBonus();
                        notShowSumma();
                        notShowDayBeforeLock();
                        notShowDateOfLock();

                    } else if (JSON.parse(json).state == 3) {

                        document.getElementById("statusMessage").style.display = "block";
                        document.getElementById("statusMessage").innerHTML = "<center><b>Корпоративный тариф.</b></center>" +
                            " Доступ в интернет предоставляется бесплатно.<hr width='95%'> ";
                        document.getElementById("uid").innerHTML = JSON.parse(json).uid;
                        document.getElementById("address").innerHTML = JSON.parse(json).address;
                        document.getElementById("payImage").style.display = "none";

                        notShowPacket();
                        notShowMonthlyPay();
                        notShowDeposit();
                        notShowBonus();
                        notShowSumma();
                        notShowDayBeforeLock();
                        notShowDateOfLock();

                    }  else if (JSON.parse(json).state == 4) {

                        document.getElementById("users_data").style.display = "block";
                        document.getElementById("statusMessage").style.display = "block";
                        document.getElementById("statusMessage").innerHTML = "<center><b>Денег на счету нет</b></center>" +
                            "Для возобнавления доступа в интернет необходимо пополнить лицевой счет.<hr width='95%'>";
                        document.getElementById("uid").innerHTML = JSON.parse(json).uid;
                        document.getElementById("packet").innerHTML = JSON.parse(json).packet;
                        document.getElementById("monthly_pay").innerHTML = JSON.parse(json).monthly_pay + " руб.";
                        document.getElementById("address").innerHTML = JSON.parse(json).address;
                        document.getElementById("deposit").innerHTML = JSON.parse(json).deposit + " руб.";
                        document.getElementById("bonus").innerHTML = JSON.parse(json).bonus + " руб.";
                        document.getElementById("summa").innerHTML = JSON.parse(json).summa + " руб.";
                        notShowDayBeforeLock();
                        notShowDateOfLock();

                    }
                }
            }
        }
        xhr.send();
    } else {
        document.getElementById("users_data").style.display = "none";
        document.getElementById("links").style.display = "none";
        document.getElementById("waitBlock").style.display = "none";
        document.getElementById("statusMessage").style.display = "block";
        document.getElementById("config_data").style.display = "block";
        document.getElementById("statusMessage").innerHTML = "<center><b>Приложение не настроено</b></center>" +
            " Перед началом работы, необходимо ввести номер лицевого счета и пароль с договора.<hr width='95%'>";
    }
}

function load() {
    chrome.storage.sync.get('userUID', function (result) {

        if(result.userUID) {

            document.getElementById("uid_input").value = result.userUID;

        } else {

            document.getElementById("uid_input").value = "";

        }
    });

    chrome.storage.sync.get('userPassword', function (result) {

        if(result.userPassword) {

            document.getElementById("password_input").value = result.userPassword;

        } else {

            document.getElementById("password_input").value = "";

        }

        loadDataFromServer();
    });
}

function showOrHideConfig() {
    if (document.getElementById("config_data").style.display == "none") {
        document.getElementById("img").src = "return.png";
        document.getElementById("users_data").style.display = "none";
        document.getElementById("links").style.display = "none";
        document.getElementById("config_data").style.display = "block";
        document.getElementById("statusMessage").style.display = "none";
        document.getElementById("infoMessage").style.display = "none";
    } else {
        document.getElementById("img").src = "icons-settings.png";
        document.getElementById("users_data").style.display = "block";
        document.getElementById("links").style.display = "block";
        document.getElementById("config_data").style.display = "none";
        document.getElementById("infoMessage").style.display = "none";
    }
}

function showOrHideInfo() {
    if (document.getElementById("infoMessage").style.display == "none") {
        document.getElementById("infoMessage").style.display = "block";
        document.getElementById("config_data").style.display = "none";
        document.getElementById("users_data").style.display = "none";
        document.getElementById("statusMessage").style.display = "none";
        document.getElementById("what").src = "return.png";
        document.getElementById("img").style.display = "none";
    } else {
        document.getElementById("infoMessage").style.display = "none";
        document.getElementById("users_data").style.display = "block";
        document.getElementById("what").src = "what.png";
        document.getElementById("what").style.display = "block";
        document.getElementById("img").style.display = "block";

    }
}

function showOrHidePassword() {
    if (document.getElementById("password_input").type == "password") {
        document.getElementById("password_input").type = "text";
    } else {
        document.getElementById("password_input").type = "password";
    }
}

function saveConfig() {
    chrome.storage.sync.set({ userUID: document.getElementById("uid_input").value });
    chrome.storage.sync.set({ userPassword: document.getElementById("password_input").value });
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

    var what = document.getElementById("what");
    what.addEventListener('click', function () {
        showOrHideInfo();
    });

    var saveBtn = document.getElementById("saveBtn");
    saveBtn.addEventListener('click', function () {
        saveConfig();
    })

    var what = document.getElementById("showOrHidePassword");
    what.addEventListener('click', function () {
        showOrHidePassword();
    });
});

load();