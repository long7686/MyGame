const Emitter = require("EventsListener")

cc.Class({
    extends: cc.Component,

    properties: {
        directionNode: cc.Node,
        rb: cc.RigidBody,
        spawnBullet: cc.Node,
        BulletPrefabs: cc.Prefab,
        speedBullet: 200
    },

    onLoad: function () {
        Emitter.instance.emit("enableCollison")
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.node.on("rotation-changed", this.getDirection.bind(this))
        
    },

    start(){
        this.getDirection();
    },

    getDirection(){
        this._direc = this.node.convertToWorldSpaceAR(this.directionNode.position);
        this._direc = this.node.parent.convertToNodeSpaceAR(this._direc);
        this._direc = new cc.v2(this._direc.x - this.node.position.x, this._direc.y- this.node.position.y)
    
        this.bulletPos = this.node.convertToWorldSpaceAR(this.spawnBullet.position);
        this.bulletPos = this.node.parent.convertToNodeSpaceAR(this.bulletPos);
    },

    onKeyDown: function (event) {   
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.node.angle = 90
                this._shootDirec = new cc.v2(-this.speedBullet,0)
                this.rb.linearVelocity = new cc.v2(this._direc.x, this._direc.y)
                break;
            case cc.macro.KEY.d:
                this.node.angle = 270
                this._shootDirec = new cc.v2(this.speedBullet,0)
                this.rb.linearVelocity = new cc.v2(this._direc.x, this._direc.y)
                break;
            case cc.macro.KEY.w:
                this.node.angle = 0
                this._shootDirec = new cc.v2(0,this.speedBullet)
                this.rb.linearVelocity = new cc.v2(this._direc.x, this._direc.y)
                break;
            case cc.macro.KEY.s:
                this.node.angle = 180
                this._shootDirec = new cc.v2(0,-this.speedBullet)
                this.rb.linearVelocity = new cc.v2(this._direc.x, this._direc.y)
                break;
        }
        
        switch(event.keyCode) {
            case cc.macro.KEY.space:
                this.getDirection()
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

    update(){
        this.getDirection()
        this.rayCast = cc.director.getPhysicsManager().rayCast (this.node.position,this.directionNode.position, cc.RayCastType.Any);
        // cc.log(this.rayCast)
        if (this.rayCast.child != null){
            cc.log(this.rayCast)
        }
        // this.drawing = this.node.getComponent(cc.Graphics);
        // this.drawing.lineWidth = 6;
        // this.drawing.moveTo(x, y);
        // this.drawing.lineTo(x2, y2);
        // this.drawing.strokeColor = cc.Color.RED;
        // this.drawing.stroke();
        // this.drawing.fill();
    },
});
