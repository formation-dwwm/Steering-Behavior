
import { Phaser } from './phaser.min.js';

interface ISeeker {
    // static VEC_REF: Phaser.Point;
    // static MAX_SPEED: number;
    // //...
 
    // constructor(game: Phaser.Game, posX: number, posY: number): ISeeker;
    // init(game: Phaser.Game): void;
    // seek(pTarget: Phaser.Sprite): void;

    // getDesiredVelocity(pTarget: Phaser.Sprite): Phaser.Point;
    // getSteeringForce(vecDesired: Phaser.Point): Phaser.Point;
    // setNewVelocity(newVelocity: Phaser.Point): void;
    // lookAhead(): void;

}

class Seek implements ISeeker {

    width: number = 800;
    height: number = 480;
    sprSeeker: any;
    sprTarget: any;
    preload;
    create;
    vecReference;

    // vecDesired: any;
    // pTarget: any;
    // pVehicle: any;
    // pVehicle2bis: any;
    // tint: string;
    // vecReference: any;

    // constructor (vecDesired: any, pTarget: any, pVehicle: any, pVehicle2bis: any) {
    constructor() {
        // this.vecDesired = vecDesired;
        // this.pTarget = pTarget;
        // this.pVehicle = pVehicle;
        // this.pVehicle2bis = pVehicle2bis;

        this.game = new Phaser.Game(this.width, this.height, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
        this.vecReference = new Phaser.Point(0, 0);

        // this.tint;
        // super(vecDesired, pTarget, pVehicle, pVehicle2bis);

        // super();
    }

    game: Phaser.Game;


    // Calcul de la vitesse désirée
    // Calcul de la vitesse de changement de direction
    // Mise à jour de la vitesse actuelle
    // Mise à jour de la rotation du véhicule

    // 1. vector(desired velocity) = (target position) - (vehicle position)
    // Vector (desired velocity) = Position (target) – Position (vehicle)

    // phaser = new Phaser();
    // getvecVelocity(pTarget, pVehicle) {
    //     this.vecDesired = Phaser.Point.subtract(pTarget.position, pVehicle.position);
    //     return vecDesired;
    // }

    // 2. normalize vector(desired velocity)
    // Normalize Vector (desired velocity)

    // 3. scale vector(desired velocity) to maximum speed
    // Scale Vector (desired velocity) to the maximum speed

    //  getDesiredVelocity(); dans class ApproachingSeekerSimple

    // const sprite = new Phaser.Sprite(/* ... */);
    // sprite.tint = 0xff0000;

    // target_offset = target - position
    // distance = length (target_offset)
    // ramped_speed = max_speed * (distance / slowing_distance)
    // clipped_speed = minimum (ramped_speed, max_speed)
    // desired_velocity = (clipped_speed / distance) * target_offset
    // steering = desired_velocity - velocity


// 4. vector(steering force) = vector(desired velocity) - vector(current velocity)
// 5. limit the magnitude of vector(steering force) to maximum force
// 6. vector(new velocity) = vector(current velocity) + vector(steering force)
// 7. limit the magnitude of vector(new velocity) to maximum speed
// 8. update vehicle rotation according to the angle of the vehicle velocity


}


class ApproachingSeekerSimple extends Phaser.Sprite {

    // Vector (desired velocity) = Position (target) – Position (vehicle) 2bis. 
    // Limit the magnitude of Vector (desired velocity) to the maximum speed

    vecDesired2bis: any;

    constructor () {
        super();
    }

    getDesiredVelocity(pTarget, pVehicle2bis) {
        this.vecDesired2bis = new Phaser.Point.subtract(pTarget.position, pVehicle2bis.position);
        return this.vecDesired2bis;
    }

    // mise à jour des fonction create et update


}


class ApproachingSeeker extends Seek {

    // this.ApproachingSeeker.SLOWING_DISTANCE_THRESHOLD;

}



window.onload = () => {
     
    var game = new Seek();

    function preload() {
        this.game.load.image('imgSeeker', 'assets/arrow_white_sm.png');
		this.game.load.image('imgTarget', 'assets/circle_blue.png');
    }


    var getDesiredVelocity = getDesiredVelocity();

}

