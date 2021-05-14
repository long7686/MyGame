const Emitter = require("EventsListener")
cc.Class({
    extends: cc.Component,

    properties: {
        _target: cc.Node,
    },

    onLoad () {
        if (this.node.parent.name === "Man"){
            this.node.parent.getComponent(cc.Animation).play("MonIdle")
        } 
    },

    start () {

    },
    onBeginContact(contact, selfCollider, otherCollider){ 
        if (otherCollider.tag == 1){
            if (selfCollider.node.parent.name === "Man"){
                this._target = otherCollider.node
                this.flipMonster()
                selfCollider.node.parent.getComponent(cc.Animation).play("MonRun")
                this.node.active = false;
                this.chasePlayer()
            }
            else{
                this._target = otherCollider.node
                this.node.active = false;
                this.chasePlayer()
            }
        }
    },

    chasePlayer(){
        if (this.node.parent.name === "Man"){
            cc.tween(this.node.parent)
            .to(1.5,{position: cc.v2(this._target.position)})
            .call(()=>  this.node.parent.getComponent(cc.Animation).play("MonIdle"))
            .call(()=> this.node.active = true)
            .start() 
        } 
        else{
            cc.tween(this.node.parent)
            .to(1.5,{position: cc.v2(this._target.position)})
            .call(()=> this.node.active = true)
            .start() 
        }
        
    },

    flipMonster(){
        if (this._target.position.x > this.node.parent.position.x){
            this.node.parent.scale = cc.v2(1,1)
        }  
        else{
            this.node.parent.scale = cc.v2(-1,1)
        }
    },

    update (dt) {
        if( this.node.active){
            
        }
    },
});
