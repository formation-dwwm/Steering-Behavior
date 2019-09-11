"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var phaser_min_js_1 = require("./phaser.min.js");
var Seek = /** @class */ (function () {
    // vecDesired: any;
    // pTarget: any;
    // pVehicle: any;
    // pVehicle2bis: any;
    // tint: string;
    // vecReference: any;
    // constructor (vecDesired: any, pTarget: any, pVehicle: any, pVehicle2bis: any) {
    function Seek() {
        // this.vecDesired = vecDesired;
        // this.pTarget = pTarget;
        // this.pVehicle = pVehicle;
        // this.pVehicle2bis = pVehicle2bis;
        this.width = 800;
        this.height = 480;
        this.game = new phaser_min_js_1.Phaser.Game(this.width, this.height, phaser_min_js_1.Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
        this.vecReference = new phaser_min_js_1.Phaser.Point(0, 0);
        // this.tint;
        // super(vecDesired, pTarget, pVehicle, pVehicle2bis);
        // super();
    }
    return Seek;
}());
var ApproachingSeekerSimple = /** @class */ (function (_super) {
    __extends(ApproachingSeekerSimple, _super);
    function ApproachingSeekerSimple() {
        return _super.call(this) || this;
    }
    ApproachingSeekerSimple.prototype.getDesiredVelocity = function (pTarget, pVehicle2bis) {
        this.vecDesired2bis = new phaser_min_js_1.Phaser.Point.subtract(pTarget.position, pVehicle2bis.position);
        return this.vecDesired2bis;
    };
    return ApproachingSeekerSimple;
}(phaser_min_js_1.Phaser.Sprite));
var ApproachingSeeker = /** @class */ (function (_super) {
    __extends(ApproachingSeeker, _super);
    function ApproachingSeeker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ApproachingSeeker;
}(Seek));
window.onload = function () {
    var game = new Seek();
    function preload() {
        this.game.load.image('imgSeeker', 'assets/arrow_white_sm.png');
        this.game.load.image('imgTarget', 'assets/circle_blue.png');
    }
    var getDesiredVelocity = getDesiredVelocity();
};
