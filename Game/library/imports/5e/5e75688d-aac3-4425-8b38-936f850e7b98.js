"use strict";
cc._RF.push(module, '5e756iNqsNEJYs4k2+FDnuY', 'MainCamera');
// Scripts/MainCamera.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        target: cc.Node
    },

    update: function update(dt) {
        this.node.position = this.target.position;
    }
});

cc._RF.pop();