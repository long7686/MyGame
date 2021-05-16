const Emitter = require("EventsListener")
cc.Class({
    extends: cc.Component,

    properties: {
        mainLayOut: cc.Layout,
        optionLayOut: cc.Layout,
        tutorialLayOut: cc.Layout,
        backBtn: cc.Button,
        backGround: cc.Node,
    },

    onLoad () {
        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent("ButtonOnClick", this.onClick.bind(this))
        this.backBtn.node.active = false;
    },

    start () {
        this.animationTitle()
    },

    onClick(btn){
        this.mainLayOut.node.active = false;
        if(btn["startFlag"]){   
            cc.director.loadScene("1");
        }
        else if(btn["optionFlag"]){
            this.backBtn.node.active = true;
            this.optionLayOut.node.active = true;
        }
        else if (btn["tutorialFlag"]){
            this.backBtn.node.active = true;
            this.tutorialLayOut.node.active = true;
        }
        else if(btn["exitFlag"]){
            //exit game
        }
    },

    clickBack(){
        this.tutorialLayOut.node.active = false;
        this.optionLayOut.node.active = false;
        this.backBtn.node.active = false;
        this.mainLayOut.node.active = true;
    },

    animationTitle(){
        let dropTitle = cc.tween()
            // .to(1,{scale:1.5},{easing: "easeOutBack"})
            // .to(1,{scale:1},{easing: "easeInBack"})
            .to(1,{scale: 1.5})
            .to(1,{scale:1})

        let animationTitle = cc.tween()
                .to(1,{skewY:10})
                .to(1,{skewY:0}) 
                .to(1,{skewY:-10})
                .to(1,{skewY:0}) 

        dropTitle.clone(cc.find('Canvas/MainLayOut/Title')).start()
        animationTitle.clone(cc.find('Canvas/MainLayOut/Title')).repeatForever().start()
    },

    update(dt){    
        this.backGround.position = cc.v2(0, this.backGround.position.y - 1)
        if(this.backGround.position.y === -640){
            this.backGround.position = cc.v2(0,0)
        }
    }
});
