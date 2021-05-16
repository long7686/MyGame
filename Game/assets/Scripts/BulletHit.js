cc.Class({
    extends: cc.Component,

    properties: {
    },

    onBeginContact(contact, selfCollider, otherCollider){
        if (otherCollider.tag != 0){
            selfCollider.node.destroy()
        }
    },
});
