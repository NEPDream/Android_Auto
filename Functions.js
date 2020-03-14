var funcs = {};

// *************Dependencies***************
funcs.launch_package = function (x) {
    while (currentPackage() != x) {
        app.launch(x);
        sleep(2000);
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
    funcs.launch_package("com.android.settings");
    text("Connections").waitFor();
    while (!click(335, 1705));
    text("Blue light filter").waitFor();
    while (!click("Screen timeout"));
    while (!click(x));
    funcs.tap_back(2, 500);
    sleep(500);
};

// "On" "Off"
funcs.fastcharge = function (x) {
    while (device.isCharging()) {
        alert("Please disconnect charger!");
    };
    funcs.launch_package("com.samsung.android.sm_cn");
    text("Battery").waitFor();
    while (!click("Battery"));
    text("Power mode").waitFor();
    className("android.widget.Switch").id("switch_widget").find().forEach(function (i) {
        if (i.text() != x) {
            while (!i.click());
        }
    });
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
    funcs.tap_back(4, 500);
};

funcs.Mi3_SmartUnlock = function () {
    funcs.launch_package("com.android.settings");
    while (!click("Screen lock type"));
    text("Smart Lock").waitFor();
    while (!click("Smart Lock"));
    text("Trusted devices").waitFor();
    while (!click("Trusted devices"));
    text("Add trusted device").waitFor();
    if (text("Mi Band 3").exists()) {
        sleep(500);
        funcs.tap_back(4, 500);
    } else {
        while (!click("Add trusted device"));
        text("Mi Band 3").waitFor();
        while (!click("Mi Band 3"));
        text("YES, ADD").waitFor();
        while (!click("YES, ADD"));
        sleep(500);
        funcs.tap_back(4, 500);
    }
};

// "Disabled" "Enabled"
funcs.wechat_offspeaker = function (x) {
    while (!className("android.widget.TextView").text("Discover").exists()) {
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
    var l = className("android.view.View").id("com.tencent.mm:id/aol").find().get(0);
    while (l.desc() != x) {
        while (!click(l.bounds().centerX(), l.bounds().centerY()));
        sleep(500);
        l = className("android.view.View").id("com.tencent.mm:id/aol").find().get(0);
    }
    funcs.tap_back(3, 500);
};

// 0 1/3
funcs.adj_volume = function (x) {
    funcs.launch_package("com.android.settings");
    text("Sounds and vibration").waitFor();
    while (!click(392, 1295));
    sleep(500);
    if (x == 0) {
        while (!click(538, 538));
    } else {
        while (!click(205, 508));
    }
    device.setMusicVolume(device.getMusicMaxVolume() * x);
    device.setNotificationVolume(device.getNotificationMaxVolume() * x);
    device.setAlarmVolume(device.getAlarmMaxVolume());
    funcs.tap_back(2, 500);
};

funcs.adaptive_brightness = function () {
    device.setBrightnessMode(0);
    sleep(800);
    device.setBrightnessMode(1);
};

// "On"  "Off"
funcs.timer_sound = function (x) {
    funcs.launch_package("com.sec.android.app.clockpackage");
    while (!click("Timer"));
    text("Seconds").waitFor();
    while (!click(1000, 140));
    sleep(500);
    while (!click(815, 150));
    text("Show weather").waitFor();
    var l = id("com.sec.android.app.clockpackage:id/timer_sound_switch").findOne();
    while (l.text() != x) {
        while (!l.click());
        sleep(200);
        l = id("com.sec.android.app.clockpackage:id/timer_sound_switch").findOne();
    }
    sleep(300);
    l = id("com.sec.android.app.clockpackage:id/timer_vib_switch").findOne();
    while (l.text() == x) {
        while (!l.click());
        sleep(500);
        l = id("com.sec.android.app.clockpackage:id/timer_vib_switch").findOne();
    }
    funcs.tap_back(2, 500);
};

// "On" "Off"
funcs.nfc = function (x) {
    funcs.launch_package("com.android.settings");
    text("Connections").waitFor();
    while (!click(530, 1045));
    text("NFC and payment").waitFor();
    while (desc("NFC and payment").findOne().text() != x) {
        while (!desc("NFC and payment").findOne().click());
        sleep(500);
    };
    funcs.tap_back(2, 500);
};

// "OFF" "Unicom" "Mobile"
funcs.mobile_data = function (x) {
    funcs.launch_package("com.android.settings");
    text("Connections").waitFor();
    while (!click(530, 1045));
    text("NFC and payment").waitFor();
    while (!click("SIM card manager"));
    text("Preferred SIM card").waitFor();
    while (!click("Mobile data"));
    while (!click(x));
    funcs.tap_back(3, 500);
};

// "Off" "On"
funcs.switch_wlan = function (x) {
    funcs.launch_package("com.android.settings");
    text("Connections").waitFor();
    while (!click(530, 1045));
    text("NFC and payment").waitFor();
    while (desc("WLAN").findOne().text() != x) {
        while (!desc("WLAN").findOne().click());
        sleep(500);
    };
    funcs.tap_back(2, 500);
};

// "On" "Off"
funcs.hard_press_home = function (x) {
    funcs.launch_package("com.android.settings");
    text("Connections").waitFor();
    while (!click(335, 1705));
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
    funcs.tap_back(3, 500);
};

funcs.close_all = function () {
    while (!recents());
    text("Close all").waitFor();
    while (!click("Close all"));
    sleep(500);
};

// "Optimized" "Medium power saving"
funcs.power_mode = function (x) {
    funcs.launch_package("com.samsung.android.sm_cn");
    text("Battery").waitFor();
    while (!click("Battery"));
    text("Power mode").waitFor();
    if (id("android:id/summary").findOne().text() != x) {
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

funcs.greenify_freeze_app = function () {
    funcs.launch_package("com.oasisfeng.greenify");
    text("Greenify").className("android.widget.TextView").waitFor();
    while (!(className("android.widget.ImageButton").clickable(true).id("com.oasisfeng.greenify:id/fab").findOne().click()));
    text("Greenify").className("android.widget.TextView").waitFor();
    sleep(8000);
    // funcs.tap_back(1, 500);
}

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
    desc("抽屉导航").waitFor();
    while (!desc("抽屉导航").findOne().click());
    id("com.samsung.android.bixby.agent:id/drawer_settings_icon_container").waitFor();
    id("com.samsung.android.bixby.agent:id/drawer_settings_icon_container").findOne().click();
    text("语音唤醒").waitFor();
    while (!click("语音唤醒"));
    text("提升语音唤醒的准确性").waitFor();
    var l = id("com.samsung.android.bixby.agent:id/switch_widget").findOne();
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
    id("com.samsung.android.spay:id/iv_activity_spay_more_menu_settings").waitFor();
    while (!id("com.samsung.android.spay:id/iv_activity_spay_more_menu_settings").findOne().click());
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
    funcs.wechat_offspeaker("Enabled");
    funcs.greenify_freeze_app();
    funcs.adj_volume(0);
    funcs.adaptive_brightness();
    funcs.timer_sound("Off");
    funcs.samsung_pay("On");
    funcs.nfc("On");
    funcs.hard_press_home("Off");
    funcs.power_mode("Medium power saving");
    funcs.screen_timeout("30 seconds");
    funcs.bixby_voice_wakeup("未使用");
    funcs.close_all();
    device.cancelKeepingAwake();
    alert("Actions are done!");
};

funcs.back_home = function () {
    funcs.fastcharge("Off");
    funcs.switch_wlan("On");
    funcs.MiBand3_alert("Off");
    funcs.wechat_offspeaker("Disabled");
    funcs.adj_volume(1 / 3);
    funcs.adaptive_brightness();
    funcs.timer_sound("On");
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

// *************QuickLaunch***************
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
    while (!text("确定").className("android.widget.Button").exists()) {
        var l = text("提交").findOne().bounds();
        while (!click(l.centerX(), l.centerY()));
        sleep(100);
    }
    while (!text("提交成功").exists()) {
        text("确定").className("android.widget.Button").findOne().click();
        sleep(100);
    }
    alert("Success!")
}

funcs.ui_else = function () {
    var options = ["10 minutes sceen timeout", "Smart Unlock", "Cancel"];
    var i = dialogs.select("Please select function", options);
    if (i >= 0) {
        if (i == 0) { funcs.screen_timeout("10 minutes"); };
        // if (i == 1) { funcs.reserve_swimming(); };
        if (i == 1) { funcs.Mi3_SmartUnlock(); };
    } else {
        exit();
    };
};

funcs.ui_quicklaunch = function () {
    var options = ["Go out", "Back home", "Else", "Cancel"];
    var i = dialogs.select("Please select function", options);
    if (i >= 0) {
        if (i == 0) { funcs.go_out(); };
        if (i == 1) { funcs.back_home(); };
        if (i == 2) { funcs.ui_else(); };
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