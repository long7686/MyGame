"use strict";
cc._RF.push(module, '17703kFl4RFi4UrE9TGRnl/', 'SaveName');
// Scripts/SaveName.js

'use strict';

var Emitter = require("EventsListener");
cc.Class({
    extends: cc.Component,

    properties: {
        nameEditBox: cc.EditBox,
        _arrPlayer: []
    },

    onLoad: function onLoad() {
        var nameStorage = cc.sys.localStorage.getItem('winPlayer');
        if (nameStorage !== null) {
            this._arrPlayer = JSON.parse(nameStorage);
        } else {
            this._arrPlayer = [];
        }
        // cc.sys.localStorage.removeItem('winPlayer')
        cc.log(nameStorage);
    },
    enterName: function enterName() {
        var newPlayerName = this.nameEditBox.getComponent(cc.EditBox).string;
        this._arrPlayer.push(newPlayerName);
        cc.sys.localStorage.setItem('winPlayer', JSON.stringify(this._arrPlayer));
        cc.director.loadScene("StartMenu");
    }
});

cc._RF.pop();