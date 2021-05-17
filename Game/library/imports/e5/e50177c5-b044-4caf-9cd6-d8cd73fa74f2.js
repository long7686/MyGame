"use strict";
cc._RF.push(module, 'e5017fFsERMr5zW2M1z+nTy', 'AmmoBoxEffect');
// Scripts/AmmoBoxEffect.js

"use strict";

var Emitter = require("EventsListener");

cc.Class({
    extends: cc.Component,

    properties: {},

    start: function start() {
        this.ammoBoxAnimation();
    },
    ammoBoxAnimation: function ammoBoxAnimation() {
        cc.tween(this.node).repeatForever(cc.tween(this.node).to(0.5, { scale: 1.2 }).to(0.5, { scale: 1 })).start();
    }
});

cc._RF.pop();