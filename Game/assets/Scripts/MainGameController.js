cc.Class({
    extends: cc.Component,

    properties: {
       _managerPhysics: null,
       _managerCollsion: null,
    },


    onLoad () {
        // this._managerCollsion = cc.director.getCollisionManager();
        let physics_manager = cc.director.getPhysicsManager()
        physics_manager.enabled = true;
        physics_manager.gravity = new cc.v2(0,0)
        
    },
});
