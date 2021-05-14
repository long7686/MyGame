const Emitter = require("EventsListener")
cc.Class ({
    extends: cc.Component,

    properties: {
        animator: cc.Animation
    },


    onLoad () {

    },

    start () {

    },
    onBeginContact(contact, selfCollider, otherCollider){ 
        if (otherCollider.tag == 1){
            this.node.destroy();
        }
    }

});
