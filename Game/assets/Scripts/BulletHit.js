cc.Class({
    extends: cc.Component,

    properties: {
        effectHit: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {
    },

    onBeginContact(contact, selfCollider, otherCollider){

        if (otherCollider.tag != 0){
            // this.effectHitAnyThing(selfCollider.node.position)
            selfCollider.node.destroy()
            if(otherCollider.node.group === "Enemies") {
                otherCollider.node.destroy()
            }
        }
    },

    effectHitAnyThing(effectPos){
        // this.bulletPos = this.node.convertToWorldSpaceAR(this.spawnBullet.position);
        // this.bulletPos = this.node.parent.convertToNodeSpaceAR(this.bulletPos);
        // effect.scale = cc.v2(0,0)
        // cc.tween(effect)
        //     .to(2,{scale:cc.v2(2,2)})
        //     .to(2,{scale:cc.v2(0,0)})
        //     .start()
    }

    // update (dt) {},
});
