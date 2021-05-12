const Emitter = require("EventsListener")
cc.Class({
    extends: cc.Component,

    properties: {
       _managerPhysics: null,
       _managerCollsion: null,
       PlayerTank: cc.Node
    },
    
    onLoad () {
        let collision_manager = cc.director.getCollisionManager();
        let physics_manager = cc.director.getPhysicsManager()
        physics_manager.enabled = true;
        collision_manager.enable = true;
        physics_manager.gravity = new cc.v2(0,0)
        Emitter.instance = new Emitter()
        Emitter.instance.registerEvent("SpawnBullet", this.Shoot.bind(this))
    },

    Shoot(bulletPos, bullerDirec, bulletPre, bulletLookAt){
        let bullet =cc.instantiate(bulletPre) 
        bullet.setPosition(bulletPos)
        bullet.angle = bulletLookAt
        this.node.addChild(bullet)   
        let action = cc.moveBy(3, cc.v2(bullerDirec.x * 10, bullerDirec.y * 10))
        let destroyBullet = cc.callFunc(function(){
            bullet.destroy();
        },this)
        let sequence = cc.sequence(action, destroyBullet)
        bullet.runAction(sequence)
    }
});
