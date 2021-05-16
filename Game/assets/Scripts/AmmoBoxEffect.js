const Emitter = require("EventsListener")

cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    start(){
        this.ammoBoxAnimation()
    },

    ammoBoxAnimation(){
        cc.tween(this.node)
            .repeatForever(
                cc.tween(this.node)
                    .to(0.5,{scale:1.2})
                    .to(0.5,{scale:1})
            ) 
            .start()
    }
});
