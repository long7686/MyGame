const Emitter = require("EventsListener")
cc.Class({
    
    extends: cc.Component,

    properties: {
       _managerPhysics: null,
       _managerCollsion: null,
       Bullet: cc.Prefab,
       PlayerTank: cc.Node
    },
    

    
    onLoad () {
        let physics_manager = cc.director.getPhysicsManager()
        physics_manager.enabled = true;
        physics_manager.gravity = new cc.v2(0,0)
        Emitter.instance = new Emitter()
        Emitter.instance.registerEvent("SpawnBullet", this.Shoot.bind(this))
    },

    Shoot(bulletPos, bullerDirec){
        // cc.log(bulletPos.position)
        // cc.log(bullerDirec)
        var bullet =cc.instantiate(this.Bullet)
        bullet.parent = this.PlayerTank
        bullet.setPosition(bulletPos)
        cc.log(bullet)
        var action = moveTo(0.2, cc.v2(bullerDirec.x, bullerDirec.y))
        var destroyBullet = cc.callFunc(function(){
            bullet.destroy();
        },this)
        var sequence = cc.sequence(moveTo(0.2, cc.v2(bullerDirec.x, bullerDirec.y)), destroyBullet)
        // bullet.node.runAction(action)
    }
});
