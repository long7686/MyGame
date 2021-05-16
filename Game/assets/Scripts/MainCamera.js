cc.Class({
    extends: cc.Component,

    properties: {
        target: cc.Node,
    },

    update (dt) {
        this.node.position = this.target.position
    },
});
