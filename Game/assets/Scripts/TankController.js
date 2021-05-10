cc.Class({
    extends: cc.Component,

    properties: {
        bodyTank: cc.Node,
        barrelTank: cc.Node,
        directionNode: cc.Node,
        rb: cc.RigidBody,
        _tween: null,
        _action: null,
        rotationBodyValue: 20,
        moveBodyValue: 2000,
    },

    onLoad: function () {
        // add key down and key up event
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.node.parent.on("mousemove", this.lookAtMouse, this)
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this._tween = cc.tween(this.node)
        this._action= cc.rotateBy();
        this.bodyTurn = this.node.rotation;
        this.bodyMove = this.node.position;
    },


    start () {
        
    },

    update (dt) {
    },

    onKeyDown: function (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                let rto = cc.rotateBy(0.2, -this.rotationBodyValue);  
                this.bodyTank.runAction(rto);
                break;

            case cc.macro.KEY.d:
                rto = cc.rotateBy(0.2, this.rotationBodyValue);
                this.bodyTank.runAction(rto);
                break;
        }
        switch(event.keyCode) {
            case cc.macro.KEY.w:
                this.node.y += 10
                break;

            case cc.macro.KEY.s:
                this.node.y -= 10
                break;
        }
    },

    lookAtMouse(event){
        var tankPosition = cc.v2(this.barrelTank.x, this.barrelTank.y)
        var mousePosition = event.getLocation();

        mousePosition = this.node.parent.convertToNodeSpaceAR(mousePosition) // Covert to mouse location became a Node
        var angle = mousePosition.signAngle(tankPosition)
        angle = cc.misc.radiansToDegrees(mousePosition.signAngle(tankPosition))
        angle *= -1 
        this.barrelTank.angle = angle;
    },

    moveToward(){
        var towardNode = cc.v2(this.directionNode.x, this.directionNode.y)
        // var tankPosition = 
    }, 
});
