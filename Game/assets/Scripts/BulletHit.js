cc.Class({
    extends: cc.Component,

    properties: {
        collision_manager:  null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.collision_manager = cc.director.getCollisionManager();
        this.collision_manager.enable = true;
        this.collision_manager.enabled = true;
    },

    start () {
    },

    onCollisionEnter(other, self){
        this.node.destroy()
        if(other.tag == 3){
            other.node.destroy()
        } 
    },

    // update (dt) {},
});
