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

auto();
calendar_quicklaunch("Add task", "Tasks");
engines.stopAll();