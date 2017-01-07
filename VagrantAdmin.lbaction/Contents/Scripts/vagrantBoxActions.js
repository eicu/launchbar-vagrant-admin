var BaseAction = (function () {
    function Action () {
        this.title = 'Up';
        this.path = null;
        this.excludeFromState = [];
    }

    Action.prototype.setPath = function (path) {
        this.path = path;
    };

    Action.prototype.runNotOn = function (state) {
         return this.excludeFromState.indexOf(state) > -1;
    };

    Action.prototype.runOn = function (state) {
        return !this.runNotOn(state);
    };

    Action.prototype.renderItem = function () {
        return {
            'title': this.title,
            'icon': 'font-awesome:' + this.icon,
            'action': 'runBoxAction',
            'actionArgument': JSON.stringify({
                'path': this.path,
                'command': this.command
            })
        }
    };

    return Action;
})();

var ActionUp = (function () {
    function Action() {
        this.title = 'Up';
        this.icon = 'fa-cloud-upload';
        this.command = 'up';
        this.excludeFromState = ['running'];
    }
    Action.prototype = new BaseAction();

    return new Action();
})();

var ActionProvision = (function () {
    function Action() {
        this.title = 'Provision';
        this.icon = 'fa-cogs';
        this.command = 'provision';
        this.excludeFromState = ['poweroff'];
    }
    Action.prototype = new BaseAction();

    return new Action();
})();

var ActionHalt = (function () {
    function Action() {
        this.title = 'Halt';
        this.icon = 'fa-cloud-download';
        this.command = 'halt';
        this.excludeFromState = ['poweroff'];
    }
    Action.prototype = new BaseAction();

    return new Action();
})();

var ActionReload = (function () {
    function Action() {
        this.title = 'Reload';
        this.icon = 'fa-recycle';
        this.command = 'reload';
        this.excludeFromState = ['poweroff'];
    }
    Action.prototype = new BaseAction();

    return new Action();
})();

var ActionDestroy = (function () {
    function Action() {
        this.title = 'Destroy';
        this.icon = 'fa-trash-o';
        this.command = 'destroy';
    }
    Action.prototype = new BaseAction();

    return new Action();
})();