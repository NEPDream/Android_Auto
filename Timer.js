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
    tap_back(1, 500);
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
    tap_back(1, 500);
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

auto();
ui_timer();
engines.stopAll();