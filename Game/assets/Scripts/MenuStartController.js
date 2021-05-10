const Emitter = require("EventsListener")
cc.Class({
    extends: cc.Component,

    properties: {
        mainLayOut: cc.Layout,
        optionLayOut: cc.Layout,
        tutorialLayOut: cc.Layout,
        backBtn: cc.Button,
    },

    onLoad () {
        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent("ButtonOnClick", this.onClick.bind(this))
        this.backBtn.node.active = false;
    },

    start () {
        cc.log(this.backBtn)
    },

    onClick(btn){
        this.mainLayOut.node.active = false;
        if(btn["startFlag"]){   
            //chuyen scenes maingame
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
        this.mainLayOut.node.active = true
    }
});
