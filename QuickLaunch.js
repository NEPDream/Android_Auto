function launch_package(x) {
    while (currentPackage() != x) {
        app.launchPackage(x);
        sleep(1000);
    };
};

function launch_activity(x1, x2) {
    while (currentActivity() != x2) {
        app.startActivity({
            packageName: x1,
            className: x2,
        });
        sleep(1000);
    };
};

function tap_back(x1, x2) {
    var i = 0;
    while (i < x1) {
        while (!back());
        sleep(x2);
        i++;
    };
};

// "Scan" "Money"
function wechat_quicklaunch(x) {
    while (!text("Discover").exists()) {
        tap_back(1, 500);
        launch_package("com.tencent.mm");
    };
    var l = className("android.widget.TextView").text("Chats").findOne().bounds();
    while (!click(l.centerX(), l.centerY()));
    textContains("WeChat").id("android:id/text1").className("android.widget.TextView").waitFor();
    var l = desc("More function buttons").className("android.widget.RelativeLayout").clickable(true).findOne();
    while (!l.click());
    while (!click(x));
};

function ui_wechat() {
    var options = ["Scan", "Pay", "Cancel"];
    var i = dialogs.select("Please select function", options);
    if (i >= 0) {
        if (i == 0) { wechat_quicklaunch("Scan"); };
        if (i == 1) { wechat_quicklaunch("Money"); };
    } else {
        exit();
    };
};

// "Scan" "Pay"
function alipay_quicklaunch(x) {
    while (!text("Home").id("com.alipay.android.phone.openplatform:id/tab_description").exists()) {
        tap_back(1, 500);
        launch_package("com.eg.android.AlipayGphone");
    };
    var l = text("Home").id("com.alipay.android.phone.openplatform:id/tab_description").className("android.widget.TextView").findOne().bounds();
    while (!click(l.centerX(), l.centerY()));
    text("More").id("com.alipay.android.phone.openplatform:id/app_text").waitFor();
    while (!click(x));
};

function ui_alipay() {
    var options = ["Scan", "Pay", "Cancel"];
    var i = dialogs.select("Please select function", options);
    if (i >= 0) {
        if (i == 0) { alipay_quicklaunch("Scan"); };
        if (i == 1) { alipay_quicklaunch("Pay"); };
    } else {
        exit();
    };
};

// "QQ" | "Unfreeze" "Freeze"
function island_app(x1, x2) {
    launch_package("com.oasisfeng.island");
    while (!desc("Island").findOne().click());
    while (!packageName("com.oasisfeng.island").desc("Search").id("menu_search").findOne().click());
    while (!setText(x1));
    id("entry_name").text(x1).waitFor();
    while (!className("android.widget.Button").desc("App settings").exists()) {
        while (!id("entry_name").text(x1).findOne().click());
        sleep(300);
    };
    if (boundsInside(0, 2 / 3 * device.height, device.width, device.height).className("android.widget.Button").clickable(true).findOne().desc() == x2) {
        while (!boundsInside(0, 2 / 3 * device.height, device.width, device.height).className("android.widget.Button").clickable(true).findOne().click());
    };
    sleep(500);
    if (text("Turn on").exists()) {
        while (!click("Turn on"));
        sleep(4000);
    };
    tap_back(2, 500);
};

function island_wq() {
    island_app("QQ", "Unfreeze");
    island_app("Q++模块", "Unfreeze");
    island_app("WeChat", "Unfreeze");
    island_app("微信增强", "Unfreeze");
    island_app("TaiChi", "Unfreeze");
    alert("QQ and WeChat in Island are all Unfreezed!")
};

function ui_quicklaunch() {
    var options = ["Wechat", "Alipay", "Wechat and QQ in Island", "Cancel"];
    var i = dialogs.select("Please select APP", options);
    if (i >= 0) {
        if (i == 0) { ui_wechat(); };
        if (i == 1) { ui_alipay(); };
        if (i == 2) { island_wq(); };
    } else {
        exit();
    };
};

auto();
ui_quicklaunch();
engines.stopAll();