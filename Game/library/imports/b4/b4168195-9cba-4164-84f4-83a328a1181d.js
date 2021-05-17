"use strict";
cc._RF.push(module, 'b4168GVnLpBZIT0g6MooRgd', 'HUD Controller');
// Scripts/HUD Controller.js

"use strict";

var Emitter = require("EventsListener");
cc.Class({
    extends: cc.Component,

    properties: {
        hudHealth: cc.Node,
        hudAmmo: cc.Node,
        loseLayOut: cc.Layout,
        winLayOut: cc.Layout,
        scene: null
    },

    start: function start() {
        Emitter.instance.registerEvent("HUDcontroll", this.HUD.bind(this));
        Emitter.instance.registerEvent("Lose", this.loseLevel.bind(this));
        Emitter.instance.registerEvent("Win", this.winLevel.bind(this));
        this.scene = cc.director.getScene(this.Scene);
    },
    HUD: function HUD(health, ammo) {
        if (health > 0) {
            this.hudHealth.getComponent(cc.Label).string = "HEALTH: " + health;
        } else {
            this.hudHealth.getComponent(cc.Label).string = "HEALTH: 0";
        }
        this.hudAmmo.getComponent(cc.Label).string = "AMMO x " + ammo;
    },
    loseLevel: function loseLevel() {
        this.loseLayOut.node.active = true;
        this.loseLayOut.node.scale = 0;
        cc.tween(this.loseLayOut.node).to(1, { scale: 1 }).start();
    },
    winLevel: function winLevel() {
        this.winLayOut.node.active = true;
        this.winLayOut.node.scale = 0;
        cc.tween(this.winLayOut.node).to(1, { scale: 1 }).start();
    },
    onResetClick: function onResetClick() {
        cc.director.loadScene(this.scene.name);
    },
    onExitClick: function onExitClick() {
        cc.director.loadScene("StartMenu");
    },
    onNextLevelClick: function onNextLevelClick() {
        var nextScene = parseInt(this.scene.name) + 1;
        nextScene = String(nextScene);
        cc.director.loadScene(nextScene);
    }
});

cc._RF.pop();