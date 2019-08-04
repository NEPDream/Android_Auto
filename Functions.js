var funcs = {};

// *************Dependencies***************
funcs.launch_package = function (x) {
    while (currentPackage() != x) {
        app.launchPackage(x);
        sleep(1000);
    };
};

funcs.launch_activity = function (x1, x2) {
    while (currentActivity() != x2) {
        app.startActivity({
            packageName: x1,
            className: x2,
        });
        sleep(1000);
    };
};

funcs.tap_back = function (x1, x2) {
    var i = 0;
    while (i < x1) {
        while (!back());
        sleep(x2);
        i++;
    };
};

// *************Environment***************
// "10 minutes" "30 seconds"
funcs.screen_timeout = function (x) {
    funcs.launch_activity("com.android.settings", "com.samsung.android.settings.display.ScreenTimeoutActivity");
    while (!click(x));
    sleep(500);
};

// "On" "Off"
funcs.fastcharge = function (x) {
    funcs.launch_activity("com.samsung.android.sm_cn", "com.samsung.android.sm.battery.ui.BatteryActivity");
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
        sleep(500);
    };
    funcs.tap_back(2, 500);
};

// "On" "Off"
funcs.MiBand3_alert = function (x) {
    funcs.launch_package("com.xiaomi.hm.health");
    while (!click("Profile"));
    while (!click("Mi Band 3"));
    text("Unlock screen").waitFor();
    while (textContains("Syncing data").exists());
    while (!click("More"));
    text("Do not disturb (DND)").waitFor();
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
    funcs.tap_back(3, 500);
};

funcs.wechat_logout = function () {
    while (!text("Discover").exists()) {
        funcs.tap_back(1, 500);
        funcs.launch_package("com.tencent.mm");
    };
    var l = className("android.widget.TextView").drawingOrder(2).text("Chats").findOne().bounds();
    while (!click(l.centerX(), l.centerY()));
    text("WeChat").className("android.widget.TextView").drawingOrder(2).waitFor();
    var a = className("android.widget.LinearLayout").depth(7).drawingOrder(1).enabled(true).focusable(true).clickable(true).findOne()
    while (!a.click());
    sleep(200);
    while (!a.click());
    sleep(1000);
    if (textContains("Logged in to WeChat").exists()) {
        l = textContains("Logged in to WeChat").className("android.widget.TextView").findOne().bounds();
        while (!click(l.centerX(), l.centerY()));
        text("Mute Mobile Alerts").waitFor();
        while (!click("Log Out of WeChat"));
        text("Exit").waitFor();
        while (!click("Exit"));
        text("Discover").waitFor();
    };
    funcs.tap_back(1, 500);
};

// "Disabled" "Enabled"
funcs.wechat_offspeaker = function (x) {
    while (!text("Discover").exists()) {
        funcs.tap_back(1, 500);
        funcs.launch_package("com.tencent.mm");
    };
    var l = className("android.widget.TextView").drawingOrder(2).text("Me").findOne().bounds();
    while (!click(l.centerX(), l.centerY()));
    text("Favorites").waitFor();
    while (!click("Settings"));
    text("Account Security").waitFor();
    while (!click("Chats"));
    text("Press Enter to Send").waitFor();
    var l = text("Press Enter to Send").findOne().bounds();
    var a = boundsInside(0, 0, device.width, l.top).className("android.view.View").drawingOrder(3).enabled(true).focusable(true).findOne();
    if (a.desc() != x) {
        while (!click(a.bounds().centerX(), a.bounds().centerY()));
        sleep(1000);
    };
    funcs.tap_back(3, 500);
};

// 0 1
funcs.adj_volume = function (x) {
    funcs.launch_activity("com.android.settings", "com.android.settings.Settings$SoundSettingsActivity");
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
    text("Bixby Voice").waitFor();
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
    funcs.tap_back(2, 500);
};

funcs.adaptive_brightness = function () {
    device.setBrightnessMode(0);
    sleep(800);
    device.setBrightnessMode(1);
};

// "Time Up"  "Silent"
funcs.timer_sound = function (x) {
    funcs.launch_package("com.sec.android.app.clockpackage");
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
    funcs.tap_back(2, 500);
};

funcs.off_nfc = function () {
    funcs.launch_activity("com.android.settings", "com.android.settings.Settings$ConnectionsSettingsActivity");
    text("NFC and payment").waitFor();
    if (desc("NFC and payment").findOne().text() != "Off") {
        while (!desc("NFC and payment").findOne().click());
        sleep(500);
    };
    funcs.tap_back(1, 500);
};

// "OFF" "ATT"
funcs.mobile_data = function (x) {
    funcs.launch_activity("com.sec.android.app.simsettingmgr", "com.sec.android.app.simsettingmgr.NetworkManagement");
    while (!click("Mobile data"));
    while (!click(x));
    funcs.tap_back(1, 500);
};

// "Off" "On"
funcs.switch_wlan = function (x) {
    funcs.launch_activity("com.android.settings", "com.android.settings.Settings$ConnectionsSettingsActivity");
    if (desc("WLAN").findOne().text() != x) {
        while (!desc("WLAN").findOne().click());
        sleep(500);
    };
    funcs.tap_back(1, 500);
};

// "On" "Off"
funcs.hard_press_home = function (x) {
    funcs.launch_activity("com.android.settings", "com.android.settings.Settings$DisplaySettingsActivity");
    text("Blue light filter").waitFor();
    while (!click("Navigation bar")) {
        scrollDown();
        sleep(500);
    }
    text("Hard press Home button").waitFor();
    if (desc("Hard press Home button").findOne().text() != x) {
        while (!desc("Hard press Home button").findOne().click());
        sleep(500);
    };
    funcs.tap_back(2, 500);
};

funcs.close_all = function () {
    while (!recents());
    text("Close all").waitFor();
    while (!click("Close all"));
    sleep(500);
};

// "Optimized" "Medium power saving"
funcs.power_mode = function (x) {
    funcs.launch_activity("com.samsung.android.sm_cn", "com.samsung.android.sm.battery.ui.BatteryActivity");
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
    funcs.tap_back(3, 500);
};

funcs.freeze_app = function () {
    while (!text("Ice Box").clickable(true).desc("Ice Box,Apps").exists()) {
        home();
        sleep(500);
    };
    while (!text("Ice Box").clickable(true).desc("Ice Box,Apps").findOne().click());
    sleep(500);
    if (textContains("Turn on").exists()) {
        while (!click("Cancel"));
    } else {
        text("APPS").waitFor();
        while (!className("android.widget.LinearLayout").clickable(true).id("com.catchingnow.icebox:id/b1").drawingOrder(6).findOne().click());
    };
};

funcs.turnoff_work_profile = function () {
    funcs.launch_package("com.android.settings");
    while (!click("Work profile", 0)) {
        scrollDown();
        sleep(300);
    };
    sleep(500);
    if (text("Cancel").exists()) {
        while (!click("Cancel"));
        funcs.tap_back(2, 500);
    } else {
        textContains("Use work apps and receive related notifications").waitFor();
        var l = text("Apps and data").findOne().bounds();
        var a = boundsInside(0, l.top, device.width, device.height).className("android.widget.Switch").clickable(true).id("android:id/switch_widget").findOne();
        while (!a.click());
        while (!click("TURN OFF"));
        sleep(5000);
    };
};

// "使用中" "未使用"
funcs.bixby_voice_wakeup = function (x) {
    funcs.launch_activity("com.sec.android.app.launcher", "com.android.launcher3.infra.activity.Launcher");
    text("Entertainment").waitFor();
    swipe(0, device.height / 2 + 5, device.width / 5 * 4, device.height / 2 - 5, 400);
    sleep(1000);
    text("Bixby Voice").clickable(true).waitFor();
    while (!text("Bixby Voice").clickable(true).findOne().click());
    sleep(1000);
    desc("搜索").waitFor();
    var a = desc("搜索").findOne().bounds();
    var l = boundsInside(a.right, 0, device.width, device.height).className("android.widget.FrameLayout").enabled(true).drawingOrder(2).findOne().bounds();
    while (!click(l.centerX(), l.centerY()));
    className("android.widget.LinearLayout").depth(3).clickable(true).drawingOrder(4).packageName("com.samsung.android.bixby.agent").findOne().click()
    text("语音唤醒").waitFor();
    while (!click("语音唤醒"));
    text("提升语音唤醒的准确性").waitFor();
    var a = text("语音解锁").findOne().bounds();
    var l = boundsInside(0, 0, device.width, a.top).className("android.widget.Switch").clickable(true).findOne();
    if (l.text() != x) {
        while (!l.click());
    };
    funcs.tap_back(4, 400);
    home();
    sleep(500);
};

funcs.go_out = function () {
    device.keepScreenDim(10 * 60000);
    funcs.fastcharge("On");
    funcs.freeze_app();
    funcs.MiBand3_alert("On");
    funcs.mobile_data("ATT");
    funcs.wechat_offspeaker("Enabled");
    funcs.wechat_logout();
    funcs.adj_volume(0);
    funcs.adaptive_brightness();
    funcs.timer_sound("Silent");
    funcs.off_nfc();
    funcs.hard_press_home("Off");
    funcs.power_mode("Medium power saving");
    funcs.screen_timeout("30 seconds");
    funcs.bixby_voice_wakeup("未使用");
    funcs.close_all();
    funcs.turnoff_work_profile();
    device.cancelKeepingAwake();
    alert("Actions are done!");
};

funcs.back_home = function () {
    device.keepScreenDim(10 * 60000);
    funcs.fastcharge("Off");
    funcs.switch_wlan("On");
    funcs.MiBand3_alert("Off");
    funcs.wechat_offspeaker("Disabled");
    funcs.adj_volume(1);
    funcs.adaptive_brightness();
    funcs.timer_sound("Time Up");
    funcs.off_nfc();
    funcs.mobile_data("OFF");
    funcs.hard_press_home("On");
    funcs.power_mode("Optimized");
    funcs.screen_timeout("30 seconds");
    funcs.bixby_voice_wakeup("使用中");
    device.cancelKeepingAwake();
    alert("Actions are done!");
};

funcs.ui_environment = function () {
    var options = ["Go out", "Back home", "Cancel"];
    var i = dialogs.select("Please select environment", options);
    if (i >= 0) {
        if (i == 0) { funcs.go_out(); };
        if (i == 1) { funcs.back_home(); };
    } else {
        exit();
    };
};

// *************Calendar***************
// "Add task" "Add event" | "Tasks" "Month"
funcs.calendar_quicklaunch = function (x1, x2) {
    while (!(desc("Add task").drawingOrder(2).exists() || desc("Add event").drawingOrder(2).exists())) {
        funcs.tap_back(1, 300);
        funcs.launch_package("com.samsung.android.calendar");
    };
    var l = className("android.widget.ImageButton").id("com.samsung.android.calendar:id/floating_action_button").findOne();
    if (l.desc() != x1) {
        var l = desc("Show navigation menu").clickable(true).findOne();
        while (!l.click());
        text("Reminder").waitFor();
        while (!click(x2));
    };
};

// *************QuickLaunch***************
// "Scan" "Pay"
funcs.wechat_quicklaunch = function (x) {
    while (!text("Discover").exists()) {
        funcs.tap_back(1, 500);
        funcs.launch_package("com.tencent.mm");
    };
    if (x == "Scan") {
        var l = className("android.widget.TextView").drawingOrder(2).text("Discover").findOne().bounds();
        while (!click(l.centerX(), l.centerY()));
        text("Moments").className("android.widget.TextView").drawingOrder(1).waitFor();
        sleep(500);
        l = text("Scan").className("android.widget.TextView").drawingOrder(1).findOne().bounds();
        while (!click(l.centerX(), l.centerY()));
    };
    if (x == "Pay") {
        var l = className("android.widget.TextView").drawingOrder(2).text("Me").findOne().bounds();
        while (!click(l.centerX(), l.centerY()));
        text("WeChat Pay").className("android.widget.TextView").drawingOrder(1).waitFor();
        sleep(500);
        l = text("WeChat Pay").className("android.widget.TextView").drawingOrder(1).findOne().bounds();
        while (!click(l.centerX(), l.centerY()));
        text("Wallet").className("android.widget.TextView").waitFor();
        l = className("android.widget.LinearLayout").clickable(true).drawingOrder(1).depth(12).findOne();
        while (!l.click());
    };
};

funcs.ui_wechat = function () {
    var options = ["Scan", "Pay", "Cancel"];
    var i = dialogs.select("Please select function", options);
    if (i >= 0) {
        if (i == 0) { funcs.wechat_quicklaunch("Scan"); };
        if (i == 1) { funcs.wechat_quicklaunch("Pay"); };
    } else {
        exit();
    };
};

// "Scan" "Pay"
funcs.alipay_quicklaunch = function (x) {
    while (!text("Home").id("com.alipay.android.phone.openplatform:id/tab_description").exists()) {
        funcs.tap_back(1, 500);
        funcs.launch_package("com.eg.android.AlipayGphone");
    };
    var l = text("Home").id("com.alipay.android.phone.openplatform:id/tab_description").className("android.widget.TextView").findOne().bounds();
    while (!click(l.centerX(), l.centerY()));
    text("More").id("com.alipay.android.phone.openplatform:id/app_text").waitFor();
    while (!click(x));
};

funcs.ui_alipay = function () {
    var options = ["Scan", "Pay", "Cancel"];
    var i = dialogs.select("Please select function", options);
    if (i >= 0) {
        if (i == 0) { funcs.alipay_quicklaunch("Scan"); };
        if (i == 1) { funcs.alipay_quicklaunch("Pay"); };
    } else {
        exit();
    };
};

// "QQ" | "Unfreeze" "Freeze"
funcs.island_app = function (x1, x2) {
    funcs.launch_package("com.oasisfeng.island");
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
    funcs.tap_back(2, 500);
};

funcs.island_wq = function () {
    funcs.island_app("QQ", "Unfreeze");
    funcs.island_app("QXposed", "Unfreeze");
    funcs.island_app("WeChat", "Unfreeze");
    funcs.island_app("WeXposed", "Unfreeze");
    funcs.island_app("TaiChi", "Unfreeze");
    alert("QQ and WeChat in Island are all Unfreezed!")
};

funcs.ui_quicklaunch = function () {
    var options = ["Wechat", "Alipay", "Wechat and QQ in Island", "Keep Screen On", "Cancel"];
    var i = dialogs.select("Please select APP", options);
    if (i >= 0) {
        if (i == 0) { funcs.ui_wechat(); };
        if (i == 1) { funcs.ui_alipay(); };
        if (i == 2) { funcs.island_wq(); };
        if (i == 3) { device.keepScreenDim(10 * 60000); };
    } else {
        exit();
    };
};

// *************Timer***************
funcs.start_timer = function (x1, x2, x3) {
    funcs.launch_package("com.sec.android.app.clockpackage");
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
    funcs.tap_back(1, 500);
};

funcs.start_stopwatch = function () {
    funcs.launch_package("com.sec.android.app.clockpackage");
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
    funcs.tap_back(1, 500);
};

funcs.ui_timer = function () {
    var options = ["Focus", "Distract", "Cancel"];
    var i = dialogs.select("Please select timer", options);
    if (i >= 0) {
        if (i == 0) { funcs.start_timer(0, 35, 0); };
        if (i == 1) { funcs.start_stopwatch(); };
    } else {
        exit();
    };
};

// ************Export module************
module.exports = funcs;