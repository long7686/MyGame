"use strict";
cc._RF.push(module, '9bcb5/DCd9MmKZLdULJA398', 'MainLayOutController');
// Scripts/MainLayOutController.js

"use strict";

var Emitter = require("EventsListener");
cc.Class({
    extends: cc.Component,
    ctor: function ctor() {
        this._btnArr = {
            "startFlag": false,
            "tutorialFlag": false,
            "exitFlag": false
        };
    },


    properties: {},

    get: function get(key) {
        return this._btnArr[key];
    },
    clickStart: function clickStart() {
        this._btnArr["startFlag"] = true;
        this._btnArr["tutorialFlag"] = false;
        Emitter.instance.emit("ButtonOnClick", this._btnArr);
    },
    clickOption: function clickOption() {
        this._btnArr["startFlag"] = false;
        this._btnArr["tutorialFlag"] = false;
        Emitter.instance.emit("ButtonOnClick", this._btnArr);
    },
    clickTutorial: function clickTutorial() {
        this._btnArr["startFlag"] = false;
        this._btnArr["tutorialFlag"] = true;
        Emitter.instance.emit("ButtonOnClick", this._btnArr);
    }
});

cc._RF.pop();