function launch_package(x) {
    app.launchPackage(x);
    waitForPackage(x);
};

function launch_activity(x1, x2) {
    app.startActivity({
        packageName: x1,
        className: x2,
    });
    waitForActivity(x2);
};

function screen_timeout_10min() {
    launch_activity("com.android.settings", "com.samsung.android.settings.display.ScreenTimeoutActivity");
    while (!click("10 minutes"));
};

function screen_timeout_30second() {
    launch_activity("com.android.settings", "com.samsung.android.settings.display.ScreenTimeoutActivity");
    while (!click("30 seconds"));
};

// "On" "Off"
function fastcharge(x) {
    launch_activity("com.samsung.android.sm_cn", "com.samsung.android.sm.battery.ui.BatteryActivity");
    while (className("android.widget.TextView").textContains("connected").exists()) {
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
    while (!bounds(21, 73, 121, 173).findOne(5000).click());
    sleep(500);
    while (!bounds(21, 73, 121, 173).findOne(5000).click());
    sleep(500);
    while (!bounds(21, 73, 121, 173).findOne(5000).click());
    sleep(500);
    while (!back());
};

// "Disabled" "Enabled"
function wechat_speaker(x) {
    app.openAppSetting("com.tencent.mm");
    waitForActivity("com.android.settings.applications.InstalledAppDetailsTop");
    while (!click("Force stop"));
    sleep(500);
    while (!click("Force stop"));
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
    while (!bounds(0, 63, 108, 193).findOne(5000).click());
    sleep(500);
    while (!bounds(0, 63, 108, 193).findOne(5000).click());
    sleep(500);
    while (!bounds(0, 2069, 270, 2220).findOne(5000).click());
    sleep(1000);
    if (textContains("Logged in to WeChat for Windows").exists()) {
        while (!bounds(0, 195, 1080, 325).findOne(5000).click());
    };
    while (!click("Log Out of WeChat for Windows"));
    while (!click("Exit"));
};