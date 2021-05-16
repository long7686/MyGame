const Emitter = require("EventsListener")
const EnemiesTank = require("EnemiesTank")
cc.Class({
    extends: cc.Component,

    properties: {
        _target: cc.Node,
    },

    onLoad () {
        if (this.node.parent.name === "Monster"){
            this.node.parent.getComponent(cc.Animation).play("MonIdle")
        } 
    },

    onBeginContact(contact, selfCollider, otherCollider){ 
        if (otherCollider.tag == 1){
            if (selfCollider.node.parent.name === "Monster"){
                this._target = otherCollider.node
                this.flipMonster()
                selfCollider.node.parent.getComponent(cc.Animation).play("MonRun")
                this.node.active = false;
                this.chasePlayer()
            }
            else{
                this._target = otherCollider.node
                this.node.active = false;
                this.node.active = true;
                this.chasePlayer()
            }
        }
    },

    chasePlayer(){
        if (this.node.parent.name === "Monster"){
            cc.tween(this.node.parent)
            .to(1.3,{position: cc.v2(this._target.position)})
            .call(()=>  this.node.parent.getComponent(cc.Animation).play("MonIdle"))
            .call(()=> this.node.active = true)
            .start() 
        } 
        else{
            Emitter.instance.emit("playerGetIn", this._target, this._whichTank)
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

});
