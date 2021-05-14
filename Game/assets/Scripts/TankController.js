const Emitter = require("EventsListener")
cc.Class({
    extends: cc.Component,

    properties: {
        rb: cc.RigidBody,
        spawnBullet: cc.Node,
        BulletPrefabs: cc.Prefab,
        speedBullet: 100,
        tankSpeed: 300,
    },

    onLoad: function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.node.on("rotation-changed", this.getBulletDirection.bind(this))
    },

    start(){
        this.getBulletDirection();
    },

    getBulletDirection(){
        this.bulletPos = this.node.convertToWorldSpaceAR(this.spawnBullet.position);
        this.bulletPos = this.node.parent.convertToNodeSpaceAR(this.bulletPos);
    },

    onKeyDown: function (event) {   
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.moveLeft()
                break;
            case cc.macro.KEY.d:
                this.moveRight()
                break;
            case cc.macro.KEY.w:
                this.moveUp()
                break;
            case cc.macro.KEY.s:
                this.moveDown()
                break;
        }
        
        switch(event.keyCode) {
            case cc.macro.KEY.space:
                this.getBulletDirection()
                Emitter.instance.emit("SpawnBullet", this.bulletPos, this._shootDirec, this.BulletPrefabs, this.node.angle)
            break;
        }
    },

    onKeyUp(event){
        switch(event.keyCode) {
            case cc.macro.KEY.w:
            case cc.macro.KEY.s:
            case cc.macro.KEY.a:
            case cc.macro.KEY.d:
                this.rb.linearVelocity = new cc.v2(0, 0)
                break;
        }
    },

    moveUp(){
        this.node.angle = 0
        this._shootDirec = new cc.v2(0,this.speedBullet)
        this.rb.linearVelocity = new cc.v2(0, this.tankSpeed)
        
    },

    moveDown(){
        this.node.angle = 180
        this._shootDirec = new cc.v2(0,-this.speedBullet)
        this.rb.linearVelocity = new cc.v2(0, -this.tankSpeed)
    },

    moveLeft(){
        this.node.angle = 90
        this._shootDirec = new cc.v2(-this.speedBullet,0)
        this.rb.linearVelocity = new cc.v2(-this.tankSpeed, 0)
    },

    moveRight(){
        this.node.angle = 270
        this._shootDirec = new cc.v2(this.speedBullet,0)
        this.rb.linearVelocity = new cc.v2(this.tankSpeed, 0)
       
    }
});
