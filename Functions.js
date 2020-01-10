var funcs = {};

// *************Dependencies***************
funcs.launch_package = function (x) {
    while (currentPackage() != x) {
        app.launchPackage(x);
        sleep(2000);
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

funcs.MiBand3_pair = function (x) {
    funcs.launch_package("com.xiaomi.hm.health");
    while (!click("Profile"));
    while (!click("Mi Band 3"));
    text("Unlock screen").waitFor();
    while (textContains("Syncing data").exists());
    while (!click("Unlock screen"));
    text("Go to Settings").waitFor();
    while (!click("Go to Settings"));
    textContains("Bluetooth pairing request").waitFor();
    while (!click("OK"));
    funcs.tap_back(5, 500)
};

funcs.wechat_logout = function () {
    while (!text("Discover").exists()) {
        funcs.tap_back(1, 500);
        funcs.launch_package("com.tencent.mm");
    };
    var l = bounds(97, 2085, 173, 2161).findOne().bounds();
    while (!click(l.centerX(), l.centerY()));
    textContains("WeChat").className("android.widget.TextView").drawingOrder(2).waitFor();
    var l = textContains("WeChat").className("android.widget.TextView").drawingOrder(2).findOne().bounds();
    while (!click(l.centerX(), l.centerY()));
    while (!click(l.centerX(), l.centerY()));
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
    var l = text("Volume").className("android.widget.TextView").findOne().bounds();
    while (!text("Bixby Voice").exists()) {
        while (!click(l.centerX(), l.centerY()));
        sleep(500);
    };
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
    var l = boundsInside(0, 0, device.width, 1 / 3 * device.height).className("android.widget.FrameLayout").clickable(false).drawingOrder(2).enabled(true).findOne().bounds();
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

// "On" "Off"
funcs.nfc = function (x) {
    funcs.launch_activity("com.android.settings", "com.android.settings.Settings$ConnectionsSettingsActivity");
    text("NFC and payment").waitFor();
    if (desc("NFC and payment").findOne().text() != x) {
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

funcs.icebox_freeze_app = function () {
    while (!text("Island").className("android.widget.TextView").exists()) {
        home();
        sleep(500);
    };
    while (!click("Island"));
    while (!click("Ice Box"));
    sleep(500);
    if (textContains("Turn on").exists()) {
        while (!click("Cancel"));
    } else {
        text("APPS").waitFor();
        while (!className("android.widget.LinearLayout").clickable(true).id("com.catchingnow.icebox:id/b1").drawingOrder(6).findOne().click());
    };
};

funcs.greenify_freeze_app = function () {
    funcs.launch_package("com.oasisfeng.greenify");
    text("Greenify").className("android.widget.TextView").waitFor();
    while (!(className("android.widget.ImageButton").clickable(true).id("com.oasisfeng.greenify:id/fab").findOne().click()));
    text("Greenify").className("android.widget.TextView").waitFor();
    sleep(8000);
    funcs.tap_back(1, 500);
}

funcs.turnoff_work_profile = function () {
    funcs.launch_package("com.android.settings");
    text("Connections").waitFor();
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
    while (!text("Mainland").className("android.widget.TextView").exists()) {
        home();
        sleep(500);
    };
    text("Mainland").waitFor();
    swipe(0, device.height / 2 + 5, device.width / 5 * 4, device.height / 2 - 5, 800);
    sleep(1000);
    text("Bixby Voice").clickable(true).waitFor();
    while (!text("Bixby Voice").clickable(true).findOne().click());
    sleep(1000);
    desc("搜索").waitFor();
    var a = desc("搜索").findOne().bounds();
    var l = boundsInside(a.right, 0, device.width, device.height).className("android.widget.FrameLayout").enabled(true).findOne().bounds();
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

// "On"  "Off"
funcs.samsung_pay = function (x) {
    funcs.launch_package("com.samsung.android.spay");
    text("Home").className("android.widget.TextView").waitFor();
    var l = id("com.samsung.android.spay:id/iv_activity_spay_tab_bottom_tab_home_icon").findOne().bounds();
    while (!click(l.centerX(), l.centerY()));
    id("com.samsung.android.spay:id/iv_fragment_spay_home_drawer_button").waitFor();
    while (!(id("com.samsung.android.spay:id/iv_fragment_spay_home_drawer_button").findOne().click()));
    text("Settings").waitFor();
    while (!click("Settings"));
    text("Quick access").waitFor();
    while (!click("Quick access"));
    text("Lock screen").waitFor();
    var s = className("android.widget.Switch").find();
    for (var i = 0; i < s.length; i++) {
        if (s[i].text() != x) {
            while (!click(s[i].bounds().centerX(), s[i].bounds().centerY()));
        };
    };
    funcs.tap_back(3, 500);
};

funcs.go_out = function () {
    funcs.fastcharge("On");
    funcs.MiBand3_alert("On");
    funcs.mobile_data("Mobile");
    funcs.wechat_logout();
    funcs.wechat_offspeaker("Enabled");
    funcs.greenify_freeze_app();
    funcs.adj_volume(0);
    funcs.adaptive_brightness();
    funcs.timer_sound("Silent");
    funcs.samsung_pay("On");
    funcs.nfc("On");
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
    funcs.fastcharge("Off");
    funcs.switch_wlan("On");
    funcs.MiBand3_alert("Off");
    funcs.wechat_offspeaker("Disabled");
    funcs.adj_volume(1);
    funcs.adaptive_brightness();
    funcs.timer_sound("Time Up");
    funcs.samsung_pay("Off");
    funcs.nfc("Off");
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
        var l = className("android.widget.FrameLayout").id("com.samsung.android.calendar:id/open_drawer_container").findOne().bounds();
        while (!click(l.centerX(), l.centerY()));
        text("Reminder").waitFor();
        while (!click(x2));
    };
};

// *************QuickLaunch***************
// "Scan" "Money" | 1 2
funcs.wechat_quicklaunch = function (x1, x2) {
    while (!text("Discover").exists()) {
        funcs.tap_back(1, 500);
        funcs.launch_package("com.tencent.mm");
    };
    var l = bounds(97, 2085, 173, 2161).findOne().bounds();
    while (!click(l.centerX(), l.centerY()));
    textContains("WeChat").className("android.widget.TextView").drawingOrder(2).waitFor();
    if (x2 == 1) {
        var l = id("com.tencent.mm:id/ra").clickable(true).className("android.widget.ImageView").findOne().bounds();
        while (!click(l.centerX(), l.centerY()));
        while (!click(x1));
    };
    if (x2 == 2) {
        var l = id("com.tencent.mm:id/r9").clickable(true).className("android.widget.ImageView").findOne().bounds();
        while (!click(l.centerX(), l.centerY()));
        text("Filter by").waitFor();
        while (!setText(x1));
        text("Recently Used Mini Programs").waitFor();
        click(x1, 1)
    };
};

funcs.ui_wechat = function () {
    var options = ["Scan", "Pay", "Cancel"];
    var i = dialogs.select("Please select function", options);
    if (i >= 0) {
        if (i == 0) { funcs.wechat_quicklaunch("Scan", 1); };
        if (i == 1) { funcs.wechat_quicklaunch("Money", 1); };
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
    text("Scan").className("android.widget.TextView").waitFor();
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

// ["QQ","QXposed"] | "Unfreeze" "Freeze"
funcs.island_app = function (x1, x2) {
    app.openAppSetting("com.oasisfeng.island");
    while (!click("Force stop"));
    text("Cancel").waitFor();
    while (!click("Force stop"));
    funcs.tap_back(2, 500);
    funcs.launch_package("com.oasisfeng.island");
    while (!desc("Island").clickable(true).findOne().click());
    for (var i in x1) {
        while (!packageName("com.oasisfeng.island").clickable(true).desc("Search").findOne().click());
        while (!setText(x1[i]));
        id("com.oasisfeng.island:id/entry_name").text(x1[i]).clickable(true).waitFor();
        while (!boundsInside(0, 2 / 3 * device.height, device.width, device.height).textContains(x1[i]).exists()) {
            while (!id("com.oasisfeng.island:id/entry_name").text(x1[i]).clickable(true).findOne().click());
            sleep(500);
        };
        if (boundsInside(0, 2 / 3 * device.height, device.width, device.height).className("android.widget.Button").clickable(true).findOne().desc() == x2) {
            while (!boundsInside(0, 2 / 3 * device.height, device.width, device.height).className("android.widget.Button").clickable(true).findOne().click());
        };
        sleep(500);
        if (text("Turn on").exists()) {
            while (!click("Turn on"));
            sleep(4000);
        };
    };
    funcs.tap_back(2, 500);
};

// "QQ"
funcs.island_launch = function (x) {
    app.openAppSetting("com.oasisfeng.island");
    while (!click("Force stop"));
    text("Cancel").waitFor();
    while (!click("Force stop"));
    funcs.tap_back(2, 500);
    funcs.launch_package("com.oasisfeng.island");
    while (!desc("Island").clickable(true).findOne().click());
    while (!packageName("com.oasisfeng.island").clickable(true).desc("Search").findOne().click());
    while (!setText(x));
    id("com.oasisfeng.island:id/entry_name").text(x).clickable(true).waitFor();
    while (!boundsInside(0, 2 / 3 * device.height, device.width, device.height).textContains(x).exists()) {
        while (!id("com.oasisfeng.island:id/entry_name").text(x).clickable(true).findOne().click());
        sleep(500);
    };
    var ly = id("com.oasisfeng.island:id/entry_name").text(x).clickable(true).findOne().bounds();
    var lx = desc("More options").clickable(true).className("android.widget.ImageButton").findOne().bounds();
    while (!click(lx.centerX(), ly.centerY()));
    sleep(500);
    if (text("Turn on").exists()) {
        while (!click("Turn on"));
        sleep(4000);
    };
};

funcs.vpn_setting = function () {
    funcs.launch_activity("com.android.settings", "com.android.settings.Settings$ConnectionsSettingsActivity");
    text("More connection settings").waitFor();
    while (!click("More connection settings"));
    text("VPN").waitFor();
    while (!click("VPN"));
};

funcs.ui_transport = function () {
    var options = ["Wechat transport", "Alipay transport", "Metro", "Meituan Riding", "Hello Riding", "Cancel"];
    var i = dialogs.select("Please select function", options);
    if (i >= 0) {
        if (i == 0) { funcs.wechat_quicklaunch("乘车码", 2); };
        if (i == 1) {
            funcs.alipay_quicklaunch("Pay");
            while (!click("Transport Code"));
        };
        if (i == 2) { funcs.island_launch("Metro大都会"); };
        if (i == 3) { funcs.island_launch("Meituan"); };
        if (i == 4) { funcs.island_launch("哈啰出行"); };
    } else {
        exit();
    };
};

funcs.reserve_swimming = function () {
    className("android.widget.TextView").text("报名工具").waitFor();
    var l = text("报名工具").findOne().bounds();
    while (!click(l.centerX(), l.centerY()));
    className("android.view.View").text("立即报名").waitFor();
    while (!className("android.widget.TextView").text("报名信息").exists()) {
        var l = text("立即报名").findOne().bounds();
        while (!click(l.centerX(), l.centerY()));
        sleep(100);
    }
    className("android.view.View").text("提交").waitFor();
    while (!text("提交成功").exists()) {
        var l = text("提交").findOne().bounds();
        while (!click(l.centerX(), l.centerY()));
        sleep(100);
    }
    alert("Success!")
}

funcs.ui_else = function () {
    var options = ["10 minutes sceen timeout", "Swimming Club", "Pair Miband3", "Cancel"];
    var i = dialogs.select("Please select function", options);
    if (i >= 0) {
        if (i == 0) { funcs.screen_timeout("10 minutes"); };
        if (i == 1) { funcs.reserve_swimming(); };
        if (i == 2) { funcs.MiBand3_pair(); };
    } else {
        exit();
    };
};

funcs.ui_quicklaunch = function () {
    var options = ["Wechat", "Alipay", "Environment", "Transport", "Else", "Cancel"];
    var i = dialogs.select("Please select function", options);
    if (i >= 0) {
        if (i == 0) { funcs.ui_wechat(); };
        if (i == 1) { funcs.ui_alipay(); };
        if (i == 2) { funcs.ui_environment(); };
        if (i == 3) { funcs.ui_transport(); };
        if (i == 4) { funcs.ui_else(); };
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