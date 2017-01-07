include('vagrantBoxActions.js');

var VagrantBox = (function () {
    function VagrantBox (id, name, state, path) {
        this.id = id;
        this.name = name;
        this.state = state;
        this.path = path;

        return this;
    }

    VagrantBox.prototype.getIcon = function () {
        var iconFile;

        switch (this.state) {
            case 'running':
                iconFile = 'box.online.tiff';
                break;
            case 'poweroff':
                iconFile = 'box.offline.tiff';
                break;
            default:
                iconFile = 'box.default.tiff';
        }

        return iconFile;
    };

    VagrantBox.prototype.renderActionList = function () {
        var list = [],
            actions = [
                ActionUp,
                ActionHalt,
                ActionReload,
                ActionProvision,
                ActionDestroy
            ];

        actions.forEach(function (action) {
            if (action.runOn(this.state)) {
                list.push(action.renderItem());
            }
        }.bind(this));

        return list;
    };

    VagrantBox.prototype.renderItem = function () {
        return {
            'title': this.name,
            'subtitle': this.id,
            'alwaysShowsSubtitle': true,
            'icon': this.getIcon(),
            'action': 'runBox',
            'actionArgument': JSON.stringify(this),
            'actionReturnsItems': true
        }
    };

    return VagrantBox;
})();