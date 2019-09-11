
class Seeker extends Phaser.Sprite {
    vecReference = new Phaser.Point(0, 0);
    constructor(game, posX, posY){
        super(game, posX, posY);
        this.game = game;
        this.posX = posX;
        this.posY = posY;
        this.game.add.existing(this)
        this.pVehicle = game.add.sprite(this.posX, this.posY, 'imgSeeker');
        this.pVehicle.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this.pVehicle, Phaser.Physics.ARCADE);
        this.pVehicle.MAX_SPEED = 240;
        this.pVehicle.MAX_STEER = 6;
        this.pVehicle.MAX_SPEED_SQ = this.pVehicle.MAX_SPEED * this.pVehicle.MAX_SPEED;
        this.pVehicle.MAX_STEER_SQ = this.pVehicle.MAX_STEER * this.pVehicle.MAX_STEER;
    }
    init(game){
        game.add.existing(this)
        // create seeker sprite
    }

    /**
     * Updates vehicle velocity so that it moves toward the target.
     */
    seek(pTarget){

        // 1. vector(desired velocity) = (target position) - (vehicle position):: mouvement
        let vecDesired = Phaser.Point.subtract(pTarget.position, this.pVehicle.position);

        // 2. normalize vector(desired velocity)::direction
        vecDesired.normalize();

        // 3. scale vector(desired velocity) to maximum speed::vitesse désirée
        vecDesired.multiply(this.pVehicle.MAX_SPEED, this.pVehicle.MAX_SPEED);

        // 4. vector(steering force) = vector(desired velocity) - vector(current velocity)
        let vecSteerForce = Phaser.Point.subtract(vecDesired, this.pVehicle.body.velocity);

        // 5. limit the magnitude of vector(steering force) to maximum force
        if(vecSteerForce.getMagnitudeSq() > this.pVehicle.MAX_STEER_SQ){
            vecSteerForce.setMagnitude(this.pVehicle.MAX_STEER);
        }

        // 6. vector(new velocity) = vector(current velocity) + vector(steering force)
        this.pVehicle.body.velocity.add(vecSteerForce.x, vecSteerForce.y);

        // 7. limit the magnitude of vector(new velocity) to maximum speed
        if(this.pVehicle.body.velocity.getMagnitudeSq() > this.pVehicle.MAX_SPEED_SQ){
            vecSteerForce.setMagnitude(this.pVehicle.MAX_SPEED);
        }

        // 8. update vehicle rotation according to the angle of the vehicle velocity
        this.pVehicle.rotation = this.vecReference.angle(this.pVehicle.body.velocity);
	}
}

