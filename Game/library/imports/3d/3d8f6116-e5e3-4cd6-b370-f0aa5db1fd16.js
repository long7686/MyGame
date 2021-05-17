"use strict";
cc._RF.push(module, '3d8f6EW5eNM1rNw8Kpdsf0W', 'TankController');
// Scripts/TankController.js

"use strict";

var Emitter = require("EventsListener");
cc.Class({
    extends: cc.Component,

    properties: {
        rb: cc.RigidBody,
        spawnBullet: cc.Node,
        BulletPrefabs: cc.Prefab,
        speedBullet: {
            default: 200,
            serializable: false
        },
        tankSpeed: {
            default: 300,
            serializable: false
        },
        _Ammunition: {
            default: 10,
            serializable: false
        },
        _playerHealth: {
            default: 100,
            serializable: false
        }
    },

    onLoad: function onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.node.on("rotation-changed", this.getBulletDirection.bind(this));
    },

    getBulletDirection: function getBulletDirection() {
        this.bulletPos = this.node.convertToWorldSpaceAR(this.spawnBullet.position);
        this.bulletPos = this.node.parent.convertToNodeSpaceAR(this.bulletPos);
    },


    onKeyDown: function onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.moveLeft();
                break;
            case cc.macro.KEY.d:
                this.moveRight();
                break;
            case cc.macro.KEY.w:
                this.moveUp();
                break;
            case cc.macro.KEY.s:
                this.moveDown();
                break;
        }

        switch (event.keyCode) {
            case cc.macro.KEY.space:
                if (this._Ammunition > 0) {
                    if (this.bulletPos != undefined) {
                        this.getBulletDirection();
                        this._Ammunition -= 1;
                        Emitter.instance.emit("SpawnBullet", this.bulletPos, this._shootDirec, this.BulletPrefabs, this.node.angle);
                        Emitter.instance.emit("HUDcontroll", this._playerHealth, this._Ammunition);
                    }
                }

                break;
        }
    },

    onKeyUp: function onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.w:
            case cc.macro.KEY.s:
            case cc.macro.KEY.a:
            case cc.macro.KEY.d:
                this.rb.linearVelocity = new cc.v2(0, 0);
                break;
        }
    },
    moveUp: function moveUp() {
        this.node.angle = 0;
        this._shootDirec = new cc.v2(0, this.speedBullet);
        this.rb.linearVelocity = new cc.v2(0, this.tankSpeed);
    },
    moveDown: function moveDown() {
        this.node.angle = 180;
        this._shootDirec = new cc.v2(0, -this.speedBullet);
        this.rb.linearVelocity = new cc.v2(0, -this.tankSpeed);
    },
    moveLeft: function moveLeft() {
        this.node.angle = 90;
        this._shootDirec = new cc.v2(-this.speedBullet, 0);
        this.rb.linearVelocity = new cc.v2(-this.tankSpeed, 0);
    },
    moveRight: function moveRight() {
        this.node.angle = 270;
        this._shootDirec = new cc.v2(this.speedBullet, 0);
        this.rb.linearVelocity = new cc.v2(this.tankSpeed, 0);
    },
    onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.tag === 5) {
            this._Ammunition += 5;
            Emitter.instance.emit("HUDcontroll", this._playerHealth, this._Ammunition);
            otherCollider.node.destroy();
        }

        if (otherCollider.tag === 3) {
            this._playerHealth -= 30;
            Emitter.instance.emit("HUDcontroll", this._playerHealth, this._Ammunition);
            if (this._playerHealth <= 0) {
                this.playerDead();
            } else {
                this.playerGetDame();
            }
        }

        if (otherCollider.tag === 6) {
            this._playerHealth -= 10;
            Emitter.instance.emit("HUDcontroll", this._playerHealth, this._Ammunition);
            if (this._playerHealth <= 0) {
                this.playerDead();
            } else {
                this.playerGetDame();
            }
        }

        if (otherCollider.tag === 10) {
            this._Ammunition = 0;
            Emitter.instance.emit("Win");
            this.node.active = false;
        }

        if (otherCollider.node.group === "Bullet") {
            otherCollider.node.destroy();
        }
    },
    playerDead: function playerDead() {
        this.node.active = false;
        this._Ammunition = 0;
        Emitter.instance.emit("Lose");
    },
    playerGetDame: function playerGetDame() {
        if (this._playerHealth > 0) {
            cc.tween(this.node).to(0.2, { color: new cc.Color(255, 0, 0, 255) }).to(0.2, { color: new cc.Color(255, 255, 255, 255) }).to(0.2, { color: new cc.Color(255, 0, 0, 255) }).to(0.2, { color: new cc.Color(255, 255, 255, 255) }).to(0.2, { color: new cc.Color(255, 0, 0, 255) }).to(0.2, { color: new cc.Color(255, 255, 255, 255) }).start();
        } else if (this._playerHealth <= 0) {
            this.playerDead();
        }
    }
});

cc._RF.pop();