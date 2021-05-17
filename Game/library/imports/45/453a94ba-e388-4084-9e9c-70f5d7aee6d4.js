"use strict";
cc._RF.push(module, '453a9S644hAhJ6ccPXXrubU', 'MainGameController');
// Scripts/MainGameController.js

"use strict";

var Emitter = require("EventsListener");
cc.Class({
    extends: cc.Component,

    properties: {
        _managerPhysics: null,
        _managerCollsion: null,
        effectHit: cc.Prefab
    },

    onLoad: function onLoad() {
        var collision_manager = cc.director.getCollisionManager();
        var physics_manager = cc.director.getPhysicsManager();
        physics_manager.enabled = true;
        collision_manager.enable = true;
        collision_manager.enabledDebugDraw = true;
        physics_manager.enabledDebugDraw = true;
        physics_manager.gravity = new cc.v2(0, 0);

        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent("SpawnBullet", this.Shoot.bind(this));
    },
    Shoot: function Shoot(bulletPos, bullerDirec, bulletPre, bulletLookAt) {
        this.node.getComponent(cc.AudioSource).play();
        var bullet = cc.instantiate(bulletPre);
        var effect = cc.instantiate(this.effectHit);

        bullet.setPosition(bulletPos);
        bullet.angle = bulletLookAt;
        effect.angle = bulletLookAt;
        effect.setPosition(bulletPos);

        this.node.parent.addChild(effect);
        this.node.parent.addChild(bullet);

        var action = cc.moveBy(3, cc.v2(bullerDirec.x * 10, bullerDirec.y * 10));
        var destroyBullet = cc.callFunc(function () {
            bullet.destroy();
        }, this);
        var sequence = cc.sequence(action, destroyBullet);
        cc.tween(effect).to(0.1, { scaleX: 0 }).call(function () {
            return effect.destroy();
        }).start();
        bullet.runAction(sequence);
    }
});

cc._RF.pop();