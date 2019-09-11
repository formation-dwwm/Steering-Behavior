export default class Seeker extends Phaser.Sprite {
    // Calcul de la vitesse désirée
    // Calcul de la vitesse de changement de direction
    // Mise à jour de la vitesse actuelle
    // Mise à jour de la rotation du véhicule
    constructor(game, centerX, centerY) {
        super(game, centerX, centerY, "imgSeeker");
        // this.sprSeeker = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'imgSeeker');
        this.init(game);
    }
    init(game) {
        // game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'imgSeeker');
        // Phaser.Game.add.existing(object: Phaser.DisplayObject)
        game.add.existing(this);
        this.anchor.setTo(0.5, 0.5);
        game.physics.enable(this, Phaser.Physics.ARCADE);
    }
    ;
    seek(pTarget) {
        var vecDesired;
        // 1. vector(desired velocity) = (target position) - (vehicle position)
        vecDesired = Phaser.Point.subtract(pTarget.position, this.position);
        // console.log(vecDesired);
        // 2. normalize vector(desired velocity)
        vecDesired.normalize();
        // 3. scale vector(desired velocity) to maximum speed
        vecDesired.multiply(Seeker.MAX_SPEED, Seeker.MAX_SPEED);
        // 4. vector(steering force) = vector(desired velocity) - vector(current velocity)
        var vecSteer = Phaser.Point.subtract(vecDesired, this.body.velocity);
        // 5. limit the magnitude of vector(steering force) to maximum force
        if (vecSteer.getMagnitudeSq() > Seeker.MAX_STEER_SQ) {
            vecSteer.setMagnitude(Seeker.MAX_STEER);
        }
        // 6. vector(new velocity) = vector(current velocity) + vector(steering force)
        // newVecVelocity = vecCurrent + vecSteering;
        this.body.velocity.add(vecSteer.x, vecSteer.y);
        // 7. limit the magnitude of vector(new velocity) to maximum speed
        if (this.body.velocity.getMagnitudeSq() > Seeker.MAX_SPEED_SQ) {
            this.body.velocity.setMagnitude(Seeker.MAX_SPEED);
        }
        // 8. update vehicle rotation according to the angle of the vehicle velocity
        this.rotation = Seeker.vecReference.angle(this.body.velocity);
    }
}
Seeker.vecReference = new Phaser.Point(0, 0);
Seeker.MAX_SPEED = 240;
Seeker.MAX_STEER = 6;
Seeker.MAX_SPEED_SQ = Seeker.MAX_SPEED * Seeker.MAX_SPEED;
Seeker.MAX_STEER_SQ = Seeker.MAX_STEER * Seeker.MAX_STEER;
// export default class ApproachingSeekerSimple extends Seeker {
//     // Vector (desired velocity) = Position (target) – Position (vehicle) 2bis. 
//     // Limit the magnitude of Vector (desired velocity) to the maximum speed
//     vecDesired2bis: any;
//     // constructor () {
//     //     super();
//     // }
//     getDesiredVelocity(pTarget, this2bis) {
//         this.vecDesired2bis = new Phaser.Point.subtract(pTarget.position, this2bis.position);
//         return this.vecDesired2bis;
//     }
//     // mise à jour des fonction create et update
// }
// class ApproachingSeeker extends Seek {
//     // this.ApproachingSeeker.SLOWING_DISTANCE_THRESHOLD;
// }
//# sourceMappingURL=seek.js.map