const Emitter = require("EventsListener")
cc.Class({
    extends: cc.Component,

    properties: {
        // bodyTank: cc.Node,
        barrelTank: cc.Node,
        directionNode: cc.Node,
        rb: cc.RigidBody,
        spawnBullet: cc.Node,
        _direc: cc.v2,
    },

    onLoad: function () {
        // add key down and key up event
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },


    start () {
    },

    getDirection(){
        this._direc = this.node.convertToWorldSpaceAR(this.directionNode.position);
        this._direc = this.node.parent.convertToNodeSpaceAR(this._direc);
        this._direc =new cc.v2(this._direc.x - this.node.position.x, this._direc.y- this.node.position.y)
    },

    update (dt) {
        this.getDirection()
    },

    onKeyDown: function (event) {
        this.getDirection()
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.node.angle += 10
                break;

            case cc.macro.KEY.d:
                this.node.angle -= 10
                break;
            case cc.macro.KEY.w:
                this.rb.linearVelocity = new cc.v2(this._direc.x, this._direc.y)
                break;

            case cc.macro.KEY.s:
                this.rb.linearVelocity = new cc.v2(-this._direc.x , -this._direc.y)
                break;
            case cc.macro.KEY.left:
                this.barrelTank.angle += 10
                break;

            case cc.macro.KEY.right:
                this.barrelTank.angle-= 10
                break;
        }
        switch(event.keyCode) {
            case cc.macro.KEY.space:
                Emitter.instance.emit("SpawnBullet", this.spawnBullet, this._direc)
            break;
        }
    },

    onKeyUp(event){
        switch(event.keyCode) {
            case cc.macro.KEY.w:
            case cc.macro.KEY.s:
                this.rb.linearVelocity = new cc.v2(0, 0)
                break;
        }
    },
});
