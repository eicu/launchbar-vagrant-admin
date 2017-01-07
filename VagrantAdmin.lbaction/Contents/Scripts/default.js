include('vagrantBoxFactory.js');

var pathToVagrantIndex = '~/.vagrant.d/data/machine-index/index';

function run(argument) {
    var vagrantIndex, vagrantBoxes, items = [];

    // LaunchBar.debugLog(JSON.stringify(VagrantBoxFactory));

    vagrantIndex = File.readJSON(pathToVagrantIndex);
    vagrantBoxes = VagrantBoxFactory.buildBoxes(vagrantIndex.machines);
    vagrantBoxes.forEach(function (box) {
        items.push(box.renderItem());
    });

    LaunchBar.debugLog(JSON.stringify(items));

    return items;
}

function runBox(arguments) {
    var box,
        boxConfig = JSON.parse(arguments);

    box = VagrantBoxFactory.buildBox(boxConfig);

    return box.renderActionList();
}

function runBoxAction(arguments) {
    var actionParams = JSON.parse(arguments),
        command, aScript;

    command = 'cd ' + actionParams.path + ' && ' + 'vagrant ' + actionParams.command;
    aScript = 'tell application "Terminal" to activate';

    // var result = LaunchBar.execute('/usr/bin/osascript', '-e', aScript);
    LaunchBar.executeAppleScript(aScript);
}
