function launch_package(x) {
    while (currentPackage() != x) {
        app.launchPackage(x);
        sleep(500);
    };
};

function launch_activity(x1, x2) {
    while (currentActivity() != x2) {
        app.startActivity({
            packageName: x1,
            className: x2,
        });
        sleep(500);
    };
};

function tap_back(x) {
    var i = 0;
    while (i < x) {
        while (!back());
        sleep(300);
        i++;
    };
};

// "10 minutes" "30 seconds"
function screen_timeout(x) {
    launch_activity("com.android.settings", "com.samsung.android.settings.display.ScreenTimeoutActivity");
    while (!click(x));
};

// "On" "Off"
function fastcharge(x) {
    launch_activity("com.samsung.android.sm_cn", "com.samsung.android.sm.battery.ui.BatteryActivity");
    while (device.isCharging()) {
        alert("Please disconnect charger!");
        sleep(500);
    };
    var location = bounds(956, 63, 1080, 210).findOne(5000).bounds();
    while (!click(location.centerX(), location.centerY()));
    while (!bounds(630, 212, 1080, 346).findOne(5000).click());
    waitForActivity("com.samsung.android.sm.battery.ui.BatteryActivity");
    sleep(500);
    if (bounds(904, 1623, 1017, 1681).findOne(5000).text() != x) {
        while (!bounds(904, 1623, 1017, 1681).findOne(5000).click());
    };
    tap_back(2);
};

// "ON" "OFF"
function MiBand3_alert(x) {
    launch_package("com.xiaomi.hm.health");
    while (!click("Profile"));
    while (!click("Mi Band 3"));
    waitForActivity("com.xiaomi.hm.health.device.HMMiLiSettingActivity");
    sleep(1000);
    while (textContains("Syncing data").exists());
    while (!click("More"));
    while (!click("Incoming call"));
    if (bounds(921, 817, 1027, 871).findOne(5000).text() != x) {
        while (!click("Incoming call alerts"));
        sleep(500);
        if (currentActivity() == "com.xiaomi.hm.health.ui.keekalive.KeepAliveTipsActivity") {
            while (!click("Got it"));
        };
    };
    while (!bounds(21, 73, 121, 173).findOne(5000).click());
    while (!click("App alerts"));
    if (bounds(921, 341, 1027, 395).findOne(5000).text() != x) {
        while (!click("App alerts"));
        sleep(500);
        if (currentActivity() == "com.xiaomi.hm.health.ui.keekalive.KeepAliveTipsActivity") {
            while (!click("Got it"));
        };
    };
    while (!bounds(21, 73, 121, 173).findOne(5000).click());
    while (!click("Incoming SMS"));
    if (bounds(921, 817, 1027, 871).findOne(5000).text() != x) {
        while (!click("Incoming SMS alerts"));
        sleep(500);
        if (currentActivity() == "com.xiaomi.hm.health.ui.keekalive.KeepAliveTipsActivity") {
            while (!click("Got it"));
        };
    };
    tap_back(4);
};

function wechat_logout() {
    launch_package("com.tencent.mm");
    tap_back(8);
    launch_package("com.tencent.mm");
    while (!bounds(0, 2069, 270, 2220).findOne(5000).click());
    var location = bounds(0, 63, 778, 193).findOne(5000).bounds();
    while (!click(location.centerX(), location.centerY()));
    while (!click(location.centerX(), location.centerY()));
    sleep(500);
    if (textContains("Logged in to WeChat for Windows").exists()) {
        while (!bounds(0, 195, 1080, 325).findOne(5000).click());
        while (!click("Log Out of WeChat"));
        while (!click("Exit"));
        while (!bounds(38, 97, 199, 159).text("WeChat").exists()) {
            sleep(500);
        };
    };
    tap_back(1);
};

// "Disabled" "Enabled"
function wechat_offspeaker(x) {
    launch_package("com.tencent.mm");
    tap_back(8);
    launch_package("com.tencent.mm");
    while (!bounds(810, 2069, 1080, 2220).findOne(5000).click());
    while (!click("Settings"));
    sleep(500);
    var location = text("Chats").findOne(5000).bounds();
    while (!click(location.centerX(), location.centerY()));
    sleep(500);
    if (bounds(915, 237, 1037, 302).findOne(5000).desc() != x) {
        location = bounds(915, 237, 1037, 302).findOne(5000).bounds();
        while (!click(location.centerX(), location.centerY()));
    };
    tap_back(3);
};

// 0 1
function adj_volume(x) {
    launch_activity("com.android.settings", "com.android.settings.Settings$SoundSettingsActivity");
    while (!click("Volume"));
    sleep(500);
    if (x == 0) {
        var location = desc("Notifications").findOne(5000).bounds();
        while (!swipe(location.centerX(), location.centerY(), location.left, location.centerY(), 200));
        var location = desc("System").findOne(5000).bounds();
        while (!swipe(location.centerX(), location.centerY(), location.left, location.centerY(), 200));
        var location = desc("Media").findOne(5000).bounds();
        while (!swipe(location.centerX(), location.centerY(), location.left, location.centerY(), 200));
        var location = desc("Bixby Voice").findOne(5000).bounds();
        while (!swipe(location.centerX(), location.centerY(), location.left, location.centerY(), 200));
        var location = desc("Ringtone").findOne(5000).bounds();
        while (!swipe(location.centerX(), location.centerY(), location.left, location.centerY(), 200));
    } else {
        var location = desc("Ringtone").findOne(5000).bounds();
        while (!swipe(location.left, location.centerY(), (location.centerX() + location.left) / 2, location.centerY(), 200));
        var location = desc("Notifications").findOne(5000).bounds();
        while (!swipe(location.left, location.centerY(), (location.centerX() + location.left) / 2, location.centerY(), 200));
        var location = desc("Media").findOne(5000).bounds();
        while (!swipe(location.left, location.centerY(), (location.centerX() + location.left) / 2, location.centerY(), 200));
        var location = desc("Bixby Voice").findOne(5000).bounds();
        while (!swipe((location.centerX() + location.left) / 2, location.centerY(), (location.centerX() + location.right) / 2, location.centerY(), 200));
        var location = desc("System").findOne(5000).bounds();
        while (!swipe((location.centerX() + location.left) / 2, location.centerY(), location.left, location.centerY(), 200));
    };
    tap_back(2);
};

function adaptive_brightness() {
    // launch_activity("com.android.settings", "com.android.settings.Settings$DisplaySettingsActivity");
    // while (!click("Adaptive brightness"));
    // while (!bounds(904, 297, 1017, 355).findOne(5000).click());
    // while (bounds(904, 297, 1017, 355).findOne(5000).text() == "Off") {
    //     sleep(500);
    //     while (!bounds(904, 297, 1017, 355).findOne(5000).click());
    // };
    // tap_back(2);
    device.setBrightnessMode(0);
    sleep(800);
    device.setBrightnessMode(1);
};

// 0 1
function timer_sound(x) {
    launch_package("com.sec.android.app.clockpackage");
    while (!click("Timer"));
    var location = bounds(956, 63, 1080, 210).findOne(5000).bounds();
    while (!click(location.centerX(), location.centerY()));
    while (!click("Set timer sound"));
    if (x == 0) {
        while (!click("Silent")) {
            scrollUp();
            sleep(500);
        };
    } else {
        while (!click("Time Up")) {
            scrollDown();
            sleep(500);
        };
    };
    tap_back(2);
};

function off_nfc() {
    launch_activity("com.android.settings", "com.android.settings.Settings$ConnectionsSettingsActivity");
    while (!textContains("Make mobile payments, share data").exists()) {
        while (!bounds(880, 634, 1080, 830).findOne(5000).click());
        sleep(500);
    };
    tap_back(1);
};

// "OFF" "ATT"
function mobile_data(x) {
    launch_activity("com.sec.android.app.simsettingmgr", "com.sec.android.app.simsettingmgr.NetworkManagement");
    while (!click("Mobile data"));
    while (!click(x));
    tap_back(1);
};

// "Off" "On"
function switch_wlan(x) {
    launch_activity("com.android.settings", "com.android.settings.Settings$ConnectionsSettingsActivity");
    while (bounds(880, 242, 1080, 438).findOne(5000).text() != x) {
        while (!bounds(880, 242, 1080, 438).findOne(5000).click());
        sleep(500);
    };
    tap_back(1);
};

// "On" "Off"
function hard_press_home(x) {
    launch_package("com.android.settings");
    launch_activity("com.android.settings", "com.android.settings.Settings$DisplaySettingsActivity");
    while (!click("Navigation bar")) {
        scrollDown();
        sleep(300);
    }
    while (!click("Hard press Home button"));
    while (bounds(904, 297, 1017, 355).findOne(5000).text() != x) {
        while (!bounds(904, 297, 1017, 355).findOne(5000).click());
    };
    tap_back(4);
};

function close_all() {
    while (!recents());
    sleep(500);
    while (!click("Close all"));
    sleep(500);
};

// "Optimized" "Medium power saving"
function power_mode(x) {
    launch_activity("com.samsung.android.sm_cn", "com.samsung.android.sm.battery.ui.BatteryActivity");
    while (!click("Power mode"));
    sleep(500);
    while (!click(x));
    if (x != "Optimized") {
        while (!click("Apply"));
    };
    sleep(1000);
    waitForActivity("com.samsung.android.sm.battery.ui.mode.PowerModeSettingsActivity");
    tap_back(2);
};

function freeze_app() {
    while (!home());
    sleep(500);
    while (!click("Ice Box"));
    sleep(500);
    if (textContains("Turn on").exists()) {
        while (!click("Cancel"));
    } else {
        while (!bounds(0, 2073, 228, 2220).findOne(5000).click());
    };
};

function turnoff_work_profile() {
    while (!quickSettings());
    sleep(500);
    while (!click("Work profile"));
    while (!click("Details"));
    sleep(500);
    if (textContains("Turn on").exists()) {
        while (!click("Cancel"));
    } else {
        while (!bounds(904, 1793, 1017, 1851).findOne(5000).click());
        while (!click("TURN OFF"));
    };
};

function start_timer(x1, x2, x3) {
    launch_package("com.sec.android.app.clockpackage");
    while (!click("Timer"));
    sleep(1000);
    if (text("Cancel").exists()) {
        while (!click("Cancel"));
    };
    while (!bounds(428, 706, 652, 923).findOne(5000).click());
    sleep(500);
    while (!setText(0, x1));
    while (!setText(1, x2));
    while (!setText(2, x3));
    while (!click("Start"));
    tap_back(1);
};