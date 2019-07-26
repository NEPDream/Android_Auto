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

// "10 minutes" "30 seconds"
function screen_timeout(x) {
    launch_activity("com.android.settings", "com.samsung.android.settings.display.ScreenTimeoutActivity");
    while (!click(x));
    sleep(500);
};

// "On" "Off"
function fastcharge(x) {
    launch_activity("com.samsung.android.sm_cn", "com.samsung.android.sm.battery.ui.BatteryActivity");
    while (device.isCharging()) {
        alert("Please disconnect charger!");
    };
    var l = className("android.support.v7.widget.LinearLayoutCompat").findOne().bounds();
    while (!click(l.centerX(), l.centerY()));
    while (!click("Settings"));
    var l = text("Advanced cable charging").findOne(1000).bounds();
    var a = boundsInside(0, l.top, device.width, device.height).clickable(true).findOne()
    if (a.text() != x) {
        while (!a.click());
    };
    tap_back(2, 300);
    sleep(500);
};

// "On" "Off"
function MiBand3_alert(x) {
    launch_package("com.xiaomi.hm.health");
    while (!click("Profile"));
    while (!click("Mi Band 3"));
    text("Unlock screen").waitFor();
    while (textContains("Syncing data").exists());
    while (!click("More"));
    sleep(500);
    var l = text("Incoming call").findOne().bounds();
    var a = boundsInside(0, l.top, device.width, l.bottom).idContains("status").findOne();
    if (a.text() != x) {
        while (!click("Incoming call"));
        while (!click("Incoming call alerts"));
        sleep(500);
        if (text("Got it").exists()) {
            while (!click("Got it"));
        };
        while (!id("com.xiaomi.hm.health:id/common_title_left_image").clickable(true).findOne().click());
    };
    var l = text("App alerts").findOne().bounds();
    var a = boundsInside(0, l.top, device.width, l.bottom).idContains("status").findOne();
    if (a.text() != x) {
        while (!click("App alerts"));
        while (!click("Band will vibrate upon receiving app push message"));
        sleep(500);
        if (text("Got it").exists()) {
            while (!click("Got it"));
        };
        while (!id("com.xiaomi.hm.health:id/common_title_left_image").clickable(true).findOne().click());
    };
    var l = text("Incoming SMS").findOne().bounds();
    var a = boundsInside(0, l.top, device.width, l.bottom).idContains("status").findOne();
    if (a.text() != x) {
        while (!click("Incoming SMS"));
        while (!click("Incoming SMS alerts"));
        sleep(500);
        if (text("Got it").exists()) {
            while (!click("Got it"));
        };
        while (!id("com.xiaomi.hm.health:id/common_title_left_image").clickable(true).findOne().click());
    };
    tap_back(3, 500);
};

function wechat_logout() {
    while (!text("Discover").exists()) {
        tap_back(1, 500);
        launch_package("com.tencent.mm");
    };
    var l = className("android.widget.TextView").text("Chats").findOne().bounds();
    while (!click(l.centerX(), l.centerY()));
    a = className("android.widget.LinearLayout").id("com.tencent.mm:id/l6").clickable(true).findOne()
    while (!a.click());
    while (!a.click());
    sleep(1000);
    if (textContains("Logged in to WeChat").exists()) {
        while (!click("Logged in to WeChat"));
        while (!click("Log Out of WeChat"));
        while (!click("Exit"));
        text("Discover").waitFor();
    };
    tap_back(1, 500);
};

// "Disabled" "Enabled"
function wechat_offspeaker(x) {
    while (!text("Discover").exists()) {
        tap_back(1, 500);
        launch_package("com.tencent.mm");
    };
    var l = className("android.widget.TextView").text("Me").findOne().bounds();
    while (!click(l.centerX(), l.centerY()));
    while (!click("Settings"));
    text("Account Security").waitFor();
    while (!click("Chats"));
    var l = text("Press Enter to Send").findOne().bounds();
    var a = boundsInside(0, 0, device.width, l.top).id("com.tencent.mm:id/js").findOne();
    if (a.desc() != x) {
        while (!click(a.bounds().centerX(), a.bounds().centerY()));
    };
    tap_back(3, 300);
};

// 0 1
function adj_volume(x) {
    launch_activity("com.android.settings", "com.android.settings.Settings$SoundSettingsActivity");
    while (!click("Sound mode"));
    text("Mute").waitFor();
    if (x == 0) {
        while (!click("Vibrate"));
        while (!desc("Navigate up").findOne().click());
        text("Volume").waitFor();
    } else {
        while (!click("Sound"));
        while (!desc("Navigate up").findOne().click());
        text("Volume").waitFor();
    };
    while (!click("Volume"), 0);
    if (x == 0) {
        var l = desc("Media").findOne().bounds();
        while (!swipe(l.centerX(), l.centerY(), l.left, l.centerY(), 200));
        var l = desc("Bixby Voice").findOne().bounds();
        while (!swipe(l.centerX(), l.centerY(), l.left, l.centerY(), 200));
    } else {
        var l = desc("Ringtone").findOne(5000).bounds();
        while (!swipe(l.left, l.centerY(), (l.centerX() + l.left) / 2, l.centerY(), 200));
        var l = desc("Notifications").findOne(5000).bounds();
        while (!swipe(l.left, l.centerY(), (l.centerX() + l.left) / 2, l.centerY(), 200));
        var l = desc("Media").findOne(5000).bounds();
        while (!swipe(l.left, l.centerY(), (l.centerX() + l.left) / 2, l.centerY(), 200));
        var l = desc("Bixby Voice").findOne(5000).bounds();
        while (!swipe((l.centerX() + l.left) / 2, l.centerY(), (l.centerX() + l.right) / 2, l.centerY(), 200));
        var l = desc("System").findOne(5000).bounds();
        while (!swipe((l.centerX() + l.left) / 2, l.centerY(), l.left, l.centerY(), 200));
    };
    tap_back(2, 300);
};

function adaptive_brightness() {
    device.setBrightnessMode(0);
    sleep(800);
    device.setBrightnessMode(1);
};

// "Time Up"  "Silent"
function timer_sound(x) {
    launch_package("com.sec.android.app.clockpackage");
    while (!click("Timer"));
    var a = text("Minutes").findOne().bounds();
    var l = boundsInside(0, 0, device.width, a.top).className("android.widget.FrameLayout").clickable(false).drawingOrder(2).enabled(true).findOne().bounds();
    while (!click(l.centerX(), l.centerY()));
    while (!click("Set timer sound"));
    if (x == "Silent") {
        while (!click(x)) {
            scrollUp();
            sleep(500);
        };
    }
    if (x == "Time Up") {
        while (!click(x)) {
            scrollDown();
            sleep(500);
        };
    };
    tap_back(2, 300);
};

function off_nfc() {
    launch_activity("com.android.settings", "com.android.settings.Settings$ConnectionsSettingsActivity");
    text("NFC and payment").waitFor();
    if (desc("NFC and payment").findOne().text() != "Off") {
        while (!desc("NFC and payment").findOne().click());
    };
    tap_back(1, 300);
};

// "OFF" "ATT"
function mobile_data(x) {
    launch_activity("com.sec.android.app.simsettingmgr", "com.sec.android.app.simsettingmgr.NetworkManagement");
    while (!click("Mobile data"));
    while (!click(x));
    tap_back(1, 300);
};

// "Off" "On"
function switch_wlan(x) {
    launch_activity("com.android.settings", "com.android.settings.Settings$ConnectionsSettingsActivity");
    if (desc("WLAN").findOne().text() != x) {
        while (!desc("WLAN").findOne().click());
    };
    tap_back(1, 300);
};

// "On" "Off"
function hard_press_home(x) {
    launch_activity("com.android.settings", "com.android.settings.Settings$DisplaySettingsActivity");
    text("Blue light filter").waitFor();
    while (!click("Navigation bar")) {
        scrollDown();
        sleep(200);
    }
    text("Hard press Home button").waitFor();
    if (desc("Hard press Home button").findOne().text() != x) {
        while (!desc("Hard press Home button").findOne().click());
    };
    tap_back(2, 300);
};

function close_all() {
    while (!recents());
    text("Close all").waitFor();
    while (!click("Close all"));
    sleep(500);
};

// "Optimized" "Medium power saving"
function power_mode(x) {
    launch_activity("com.samsung.android.sm_cn", "com.samsung.android.sm.battery.ui.BatteryActivity");
    text("Battery life optimizer").waitFor();
    if (id("com.samsung.android.sm_cn:id/current_mode").findOne().text() != x) {
        while (!click("Power mode"));
        textContains("Select a mode below").waitFor();
        while (!click(x));
        sleep(500);
        if (text("Apply").exists()) {
            while (!click("Apply"));
        };
        sleep(1000);
        textContains("Select a mode below").waitFor();
    };
    tap_back(3, 300);
};

function freeze_app() {
    while (!click("Ice Box")) {
        home();
        sleep(500);
    };
    sleep(500);
    if (textContains("Turn on").exists()) {
        while (!click("Cancel"));
    } else {
        text("APPS").waitFor();
        while (!className("android.widget.LinearLayout").clickable(true).id("com.catchingnow.icebox:id/b1").drawingOrder(6).findOne().click());
    };
};

function turnoff_work_profile() {
    launch_package("com.android.settings");
    while (!click("Work profile", 0)) {
        scrollDown();
        sleep(300);
    };
    sleep(500);
    if (text("Cancel").exists()) {
        while (!click("Cancel"));
        tap_back(2, 500);
    } else {
        textContains("Use work apps and receive related notifications");
        var l = text("Apps and data").findOne().bounds();
        var a = boundsInside(0, l.top, device.width, device.height).className("android.widget.Switch").clickable(true).id("android:id/switch_widget").findOne();
        while (!a.click());
        while (!click("TURN OFF"));
        sleep(500);
    };
};

// "使用中" "未使用"
function bixby_voice_wakeup(x) {
    launch_activity("com.sec.android.app.launcher", "com.android.launcher3.infra.activity.Launcher");
    text("Microsoft Launcher").waitFor();
    swipe(0, device.height / 2 + 5, device.width / 5 * 4, device.height / 2 - 5, 400);
    sleep(1000);
    text("Bixby Voice").clickable(true).waitFor();
    while (!click("Bixby Voice"));
    sleep(1000);
    desc("搜索").waitFor();
    var a = desc("搜索").findOne().bounds();
    var l = boundsInside(a.right, 0, device.width, device.height).className("android.widget.FrameLayout").enabled(true).drawingOrder(2).findOne().bounds();
    while (!click(l.centerX(), l.centerY()));
    while (!click("设置"));
    text("语音唤醒").waitFor();
    while (!click("语音唤醒"));
    text("提升语音唤醒的准确性").waitFor();
    var a = text("语音解锁").findOne().bounds();
    var l = boundsInside(0, 0, device.width, a.top).className("android.widget.Switch").clickable(true).findOne();
    if (l.text() != x) {
        while (!l.click());
    };
    tap_back(4, 400);
    home();
    sleep(500);
};

function go_out() {
    device.keepScreenDim(10 * 60000);
    fastcharge("On");
    freeze_app();
    close_all();
    MiBand3_alert("On");
    mobile_data("ATT");
    wechat_offspeaker("Enabled");
    wechat_logout();
    adj_volume(0);
    adaptive_brightness();
    timer_sound("Silent");
    off_nfc();
    hard_press_home("Off");
    power_mode("Medium power saving");
    turnoff_work_profile();
    screen_timeout("30 seconds");
    bixby_voice_wakeup("未使用");
    device.cancelKeepingAwake();
    alert("Actions are done!");
};

function back_home() {
    device.keepScreenDim(10 * 60000);
    fastcharge("Off");
    switch_wlan("On");
    MiBand3_alert("Off");
    wechat_offspeaker("Disabled");
    adj_volume(1);
    adaptive_brightness();
    timer_sound("Time Up");
    off_nfc();
    mobile_data("OFF");
    hard_press_home("On");
    power_mode("Optimized");
    screen_timeout("30 seconds");
    bixby_voice_wakeup("使用中");
    device.cancelKeepingAwake();
    alert("Actions are done!");
};

function ui_environment() {
    var options = ["Go out", "Back home", "Cancel"];
    var i = dialogs.select("Please select environment", options);
    if (i >= 0) {
        if (i == 0) { go_out(); };
        if (i == 1) { back_home(); };
    } else {
        exit();
    };
};

function start_timer(x1, x2, x3) {
    launch_package("com.sec.android.app.clockpackage");
    while (!click("Timer"));
    if (text("Cancel").exists()) {
        while (!click("Cancel"));
    };
    var l = textContains("Minute").id("android:id/numberpicker_input").className("android.widget.EditText").clickable(true).findOne();
    while (!l.click());
    sleep(500);
    while (!setText(0, x1));
    while (!setText(1, x2));
    while (!setText(2, x3));
    while (!click("Start"));
    tap_back(1, 200);
};

function start_stopwatch() {
    launch_package("com.sec.android.app.clockpackage");
    while (!click("Stopwatch"));
    sleep(500);
    if (text("Start").exists()) {
        while (!click("Start"));
    } else if (text("Lap").exists()) {
        while (!click("Lap"));
    } else if (text("Reset").exists()) {
        while (!click("Reset"));
        while (!click("Start"));
    };
    tap_back(1, 200);
};

function ui_timer() {
    var options = ["Focus", "Distract", "Cancel"];
    var i = dialogs.select("Please select timer", options);
    if (i >= 0) {
        if (i == 0) { start_timer(0, 35, 0); };
        if (i == 1) { start_stopwatch(); };
    } else {
        exit();
    };
};

// "Scan" "Money"
function wechat_quicklaunch(x) {
    while (!text("Discover").exists()) {
        tap_back(1, 300);
        launch_package("com.tencent.mm");
    };
    var l = className("android.widget.TextView").text("Chats").findOne().bounds();
    while (!click(l.centerX(), l.centerY()));
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

// "Add task" "Add event" | "Tasks" "Month"
function calendar_quicklaunch(x1, x2) {
    while (!(desc("Add task").drawingOrder(2).exists() || desc("Add event").drawingOrder(2).exists())) {
        tap_back(1, 300);
        launch_package("com.samsung.android.calendar");
    };
    var l = className("android.widget.ImageButton").id("com.samsung.android.calendar:id/floating_action_button").findOne();
    if (l.desc() != x1) {
        var l = desc("Show navigation menu").clickable(true).findOne();
        while (!l.click());
        text("Reminder").waitFor();
        while (!click(x2));
    };
};

