"use strict";
cc._RF.push(module, '820c5GcNSZM5LWFWTBZr51Q', 'EnemiesTank');
// Scripts/EnemiesTank.js

"use strict";

var _properties;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Emitter = require("EventsListener");
cc.Class({
    extends: cc.Component,

    properties: (_properties = {
        barrel: cc.Node,
        _enemyHealth: {
            default: 60,
            serializable: false
        },
        _shootCountTime: {
            default: 60,
            serializable: false
        },
        _target: null,
        _angleD: null,
        enemyBullet: cc.Prefab,
        bulletSpawnPos: cc.Node,
        bulletPos: null
    }, _defineProperty(_properties, "_angleD", null), _defineProperty(_properties, "deadEffect", cc.Prefab), _defineProperty(_properties, "_isDead", false), _properties),

    start: function start() {
        Emitter.instance.registerEvent("playerGetIn", this.lookAtPlayer.bind(this));
        this.barrel.on("rotation-changed", this.getBulletDirection.bind(this));
    },
    lookAtPlayer: function lookAtPlayer(player) {
        this._shootCountTime += 1;
        this._target = cc.v2(player.position.x - this.node.position.x, player.position.y - this.node.position.y);
        var angle = Math.atan2(this._target.y, this._target.x);
        this._angleD = cc.misc.radiansToDegrees(angle) + 90;
        this.barrel.angle = this._angleD;
        if (this._shootCountTime >= 120) {
            this.shootPlayer();
            this._shootCountTime = 0;
        }
    },
    getBulletDirection: function getBulletDirection() {
        this.bulletPos = this.barrel.convertToWorldSpaceAR(this.bulletSpawnPos.position);
        this.bulletPos = this.node.parent.convertToNodeSpaceAR(this.bulletPos);
    },
    shootPlayer: function shootPlayer() {
        if (!this._isDead) {
            Emitter.instance.emit('SpawnBullet', this.bulletPos, this._target, this.enemyBullet, this._angleD + 180);
        }
    },
    onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.tag == 4) {
            if (this._enemyHealth > 0) {
                this._enemyHealth -= 10;
                Emitter.instance.emit("getDamge", this.node);
            }
            if (this._enemyHealth <= 0) {

                this.enemyDead();
            }
        }
        if (otherCollider.node.group === "Bullet") {
            otherCollider.node.destroy();
        }
    },
    enemyDead: function enemyDead() {
        this.node.active = false;
        this._isDead = true;
        var effect = cc.instantiate(this.deadEffect);
        this.node.parent.addChild(effect);
        effect.position = this.node.position;
        effect.scale = 0;
        cc.tween(effect).to(0.2, { scale: 0.5 }).to(0.5, { opacity: 0 }).call(function () {
            return effect.destroy();
        }).start();
    }
});

cc._RF.pop();