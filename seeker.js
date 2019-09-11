class Seeker extends Phaser.Sprite {

    constructor(game, posX, posY){

        super(game, posX, posY, 'imgSeeker');

        // create seeker sprite
        this.anchor.setTo(0.5, 0.5); //set origin
        game.physics.enable(this, Phaser.Physics.ARCADE);
    
        //this because we're in constructor
        this.MAX_SPEED = 240;
        this.MAX_STEER = 6;
        this.MAX_SPEED_SQ = this.MAX_SPEED * this.MAX_SPEED;
        this.MAX_STEER_SQ = this.MAX_STEER * this.MAX_STEER;

        Seeker.init();
    }
    
    Seeker.init(game: Phaser.Game){
        game.add.existing(this);
    }
    //game.add.sprite= creer sprite + add sprite to game
}


    /**
     * Updates vehicle velocity so that it moves toward the target.
     */
    seek(pVehicle, pTarget){

        // 1. vector(desired velocity) = (target position) - (vehicle position):: mouvement
        let vecDesired = Phaser.Point.subtract(pTarget.position, pVehicle.position);

        // 2. normalize vector(desired velocity)::direction
        vecDesired.normalize();

        // 3. scale vector(desired velocity) to maximum speed::vitesse désirée
        vecDesired.multiply(pVehicle.MAX_SPEED, pVehicle.MAX_SPEED);

        // 4. vector(steering force) = vector(desired velocity) - vector(current velocity)
        vecSteerForce = Phaser.Point.subtract(vecDesired, pVehicle.body.velocity);

        // 5. limit the magnitude of vector(steering force) to maximum force
        if(vecSteerForce.getMagnitudeSq() > pVehicle.MAX_STEER_SQ){
            vecSteerForce.setMagnitude(pVehicle.MAX_STEER);
        }

        // 6. vector(new velocity) = vector(current velocity) + vector(steering force)
        pVehicle.body.velocity.add(vecSteerForce.x, vecSteerForce.y);

        // 7. limit the magnitude of vector(new velocity) to maximum speed
        if(pVehicle.body.velocity.getMagnitudeSq() > pVehicle.MAX_SPEED_SQ){
            vecSteerForce.setMagnitude(pVehicle.MAX_SPEED);
        }

        // 8. update vehicle rotation according to the angle of the vehicle velocity
        pVehicle.rotation = vecReference.angle(pVehicle.body.velocity);
    }
}