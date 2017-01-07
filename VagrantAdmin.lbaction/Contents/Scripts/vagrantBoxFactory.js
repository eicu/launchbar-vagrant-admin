include('vagrantBox.js');

var VagrantBoxFactory = (function () {
    function VagrantBoxFactory () {}

    VagrantBoxFactory.prototype.buildBoxes = function (config) {
        var boxes = [];

        for (var id in config) {
            var boxConfig = config[id],
                box;

            // LaunchBar.debugLog(JSON.stringify(boxConfig));

            box = this.buildBox({
                'id': id,
                'name': boxConfig.name,
                'state': boxConfig.state,
                'path': boxConfig.vagrantfile_path
            });
            boxes.push(box);
        }

        return boxes;
    };

    VagrantBoxFactory.prototype.buildBox = function (params) {
        return new VagrantBox(params.id, params.name, params.state, params.path);
    };

    return new VagrantBoxFactory();
})();