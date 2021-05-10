const Emitter = require("EventsListener")
cc.Class({
    extends: cc.Component,
    ctor(){
        this._btnArr = {
            "startFlag": false,
            "optionFlag": false,
            "tutorialFlag": false,
            "exitFlag": false,
        }
    },

    properties: {
    },

    get (key){
        return this._btnArr[key]
    },


    onLoad () {
    },

    start () {
        
    },

    clickStart(){
        this._btnArr["startFlag"] = true;
        this._btnArr["optionFlag"] = false;
        this._btnArr["tutorialFlag"] = false;
        Emitter.instance.emit("ButtonOnClick", this._btnArr)
    },

    clickOption(){
        this._btnArr["startFlag"] = false;
        this._btnArr["optionFlag"] = true;
        this._btnArr["tutorialFlag"] = false;
        Emitter.instance.emit("ButtonOnClick", this._btnArr)
    },

    clickTutorial(){
        this._btnArr["startFlag"] = false;
        this._btnArr["optionFlag"] = false;
        this._btnArr["tutorialFlag"] = true;
        Emitter.instance.emit("ButtonOnClick", this._btnArr)
    }

});
