cc.Class({
    extends: cc.Component,

    properties: {
        target: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {

    },

    update (dt) {
        this.node.position = this.target.position
    },
});
