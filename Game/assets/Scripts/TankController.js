cc.Class({
    extends: cc.Component,

    properties: {
        _tween: null,
        _action: null,
        bodyTurn: null,
        bodyMove: null,
        rotationBodyValue: 10,
        moveBodyValue: 2000,
    },

    onLoad: function () {
        // add key down and key up event
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this._tween = cc.tween(this.node)
        this._action= cc.rotateBy();
        this.bodyTurn = this.node.rotation;
        this.bodyMove = this.node.position;
    },


    start () {
        cc.log(this.node.angle)
    },

    update (dt) {
    },

    onKeyDown: function (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                let rto = cc.rotateBy(0.2,-20);
                this.node.runAction(rto);
                break;

            case cc.macro.KEY.d:
                let rto2 = cc.rotateBy(0.2,20);
                this.node.runAction(rto2);
                break;

            case cc.macro.KEY.w:
                let rto3 = cc.moveBy(0.2,30);
                this.node.runAction(rto3);
                break;

            case cc.macro.KEY.s:
                let rto4 = cc.moveBy(0.2,-30);
                this.node.runAction(rto4);
                break;
        }
    },

    onKeyUp: function (event) {
        // switch(event.keyCode) {
        //     case cc.macro.KEY.a:
        //         let rto2 = cc.rotateto(0,);
        //         this.node.runAction(rto2);
        //         break;
        //     case cc.macro.KEY.d:
        //         let rto = cc.rotateBy(0,0);
        //         this.node.runAction(rto);
        //         break;
               
        // }
    }
});
