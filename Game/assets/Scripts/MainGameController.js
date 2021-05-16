const Emitter = require("EventsListener")
cc.Class({
    extends: cc.Component,

    properties: {
       _managerPhysics: null,
       _managerCollsion: null,
       effectHit: cc.Prefab,
    },
    
    onLoad () {
        let collision_manager = cc.director.getCollisionManager();
        let physics_manager = cc.director.getPhysicsManager()
        physics_manager.enabled = true;
        collision_manager.enable = true;
        collision_manager.enabledDebugDraw = true
        physics_manager.enabledDebugDraw = true
        physics_manager.gravity = new cc.v2(0,0)

        Emitter.instance = new Emitter()
        Emitter.instance.registerEvent("SpawnBullet", this.Shoot.bind(this))
    },

    Shoot(bulletPos, bullerDirec, bulletPre, bulletLookAt){
        this.node.getComponent(cc.AudioSource).play();
        let bullet = cc.instantiate(bulletPre)  
        let effect = cc.instantiate(this.effectHit) 

        bullet.setPosition(bulletPos)
        bullet.angle = bulletLookAt
        effect.angle = bulletLookAt
        effect.setPosition(bulletPos)

        this.node.parent.addChild(effect)
        this.node.parent.addChild(bullet)   

        let action = cc.moveBy(3, cc.v2(bullerDirec.x * 10, bullerDirec.y * 10))
        let destroyBullet = cc.callFunc(function(){
            bullet.destroy();
        },this)
        let sequence = cc.sequence(action, destroyBullet)
        cc.tween(effect)
            .to(0.1,{scaleX:0})
            .call(() => effect.destroy())
            .start()  
        bullet.runAction(sequence)    
    },
});
