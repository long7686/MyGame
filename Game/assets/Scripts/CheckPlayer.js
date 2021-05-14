cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    onBeginContact(contact, selfCollider, otherCollider){
        if (otherCollider.tag == 1){
            cc.log("Player In")
            cc.tween(this.node.parent)
                .repeatForever(
                    cc.tween(this.node.parent)
                        .to(1,{position: cc.v2(otherCollider.node.position)})
                )
                .start()
            
        }
    },

    onEndContact(contact, selfCollider, otherCollider){
        if (otherCollider.tag == 1){
            cc.log("Player Out")
        }
    },

    onPreSolve: function (contact, selfCollider, otherCollider) {
        cc.log(contact)
    },

    // update (dt) {},
});
