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
        command;

    command = 'cd ' + actionParams.path + ' && ' + 'vagrant ' + actionParams.command;

    LaunchBar.executeAppleScript(
        'tell application "Terminal"',
        '   do script "' + command + '"' ,
        '   activate',
        'end tell'
    );
    LaunchBar.executeAppleScript('tell application "LaunchBar" to hide');
}
