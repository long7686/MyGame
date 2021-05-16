const Emitter = require("EventsListener")
cc.Class ({
    extends: cc.Component,

    properties: {
        animator: cc.Animation,
        deadEffect: cc.Prefab,
        _monsterHealth: {
            default: 30,
            serializable:false,
        },
    },
    start () {
        Emitter.instance.registerEvent("getDamge", this.monsterGetDamge.bind(this))
    },

    onBeginContact(contact, selfCollider, otherCollider){ 
        if (otherCollider.tag == 1) {
            this.deadMonster()
        }
        if (otherCollider.tag == 4){
            if (this._monsterHealth > 0){
                this._monsterHealth -= 10
                this.monsterGetDamge(this.node)
            }
            if (this._monsterHealth <= 0){
                this.deadMonster()
            }
        }
        if (otherCollider.node.group ==="Bullet"){
            otherCollider.node.destroy()
        }
    },

    deadMonster(){
        let effect = cc.instantiate(this.deadEffect)
        this.node.parent.addChild(effect)
        effect.position = this.node.position
        effect.scale = 0
        cc.tween(effect)
            .to(0.2,{scale:0.5})
            .to(0.5,{opacity: 0})
            .call(() => effect.destroy())
            .start()  
        this.node.destroy()
    },

    monsterGetDamge(target){
        cc.tween(target)
            .to(0.2,{color: new cc.Color(255,0,0,255)})
            .to(0.2,{color: new cc.Color(255,255,255,255)})
            .to(0.2,{color: new cc.Color(255,0,0,255)})
            .to(0.2,{color: new cc.Color(255,255,255,255)})
            .to(0.2,{color: new cc.Color(255,0,0,255)})
            .to(0.2,{color: new cc.Color(255,255,255,255)})
            .start()
    }

});
