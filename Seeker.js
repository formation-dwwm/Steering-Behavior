/**
 * Represents our tracking vehicle
 */
export class Seeker extends Phaser.Sprite
{
    /**
     * @returns {Phaser.Point}
     */
    static get VEC_REF()
    {
        return new Phaser.Point(0, 0);
    }

    /**
     * @returns {number}
     */
    static get MAX_SPEED()
    {
        return 240;
    }

    /**
     * @returns {number}
     */
    static get MAX_SPEED_SQ()
    {
        return this.MAX_SPEED * this.MAX_SPEED;
    }

    /**
     * @returns {number}
     */
    static get MAX_STEER()
    {
        return 6;
    }

    /**
     * @returns {number}
     */
    static get MAX_STEER_SQ()
    {
        return this.MAX_STEER_SQ * this.MAX_STEER_SQ;
    }

    /**
     * Create a new Seeker object
     * @param game  The Phaser.Game instance
     * @param posX  The x coordinate (in world space) to position the Sprite at
     * @param posY  The y coordinate (in world space) to position the Sprite at
     * @param tint  Optional A tint color to apply to the sprite
     */
    constructor(game, posX, posY, tint = 0xFFFFFF)
    {
        // Create the Phaser.Sprite object
        super(game, posX, posY, 'imgSeeker');
        // Initialize our Seeker
        this.init(game);
        // Apply the tint
        this.tint = tint;
    }

    /**
     *
     * @param game
     */
    init(game)
    {
        // Add our Sprite to the game
        game.add.existing(this);
        game.physics.enable(this, Phaser.Physics.ARCADE);

        // Fix origin to center-right
        this.anchor.x = 1;
        this.anchor.y = 0.5;
    }

    /**
     * Move the vehicle toward the target
     * @param pTarget {Phaser.Sprite} The target to track
     */
    seek(pTarget)
    {
        let velocity = this.getDesiredVelocity(pTarget);
        let steering = this.getSteeringForce(velocity);

        this.setNewVelocity(steering);
        this.lookAhead();
    }

    /**
     * @param pTarget {Phaser.Sprite}
     * @returns {Phaser.Point}
     */
    getDesiredVelocity(pTarget)
    {
        // vector(desired velocity) = (target position) - (vehicle position)
        let vecDesired = pTarget.position.clone().subtract(this.position.x, this.position.y);

        // normalize vector(desired velocity)
        vecDesired.normalize();

        // scale vector(desired velocity) to maximum speed
        vecDesired.multiply(Seeker.MAX_SPEED, Seeker.MAX_SPEED);

        return vecDesired;
    }

    /**
     * @param vecDesired {Phaser.Point}
     * @returns {Phaser.Point}
     */
    getSteeringForce(vecDesired)
    {
        let vehicleVelocity = this.body.velocity;

        // vector(steering force) = vector(desired velocity) - vector(current velocity)
        let vecSteering = vecDesired.clone().subtract(vehicleVelocity.x, vehicleVelocity.y);

        // limit the magnitude of vector(steering force) to maximum force
        vecSteering.setMagnitude(Math.min(Seeker.MAX_STEER, vecSteering.getMagnitude()));

        return vecSteering;
    }

    /**
     * Apply the specified velocity
     * @param newVelocity {Phaser.Point}
     */
    setNewVelocity(newVelocity)
    {
        let vehicleVelocity = this.body.velocity;

        // vector(new velocity) = vector(current velocity) + vector(steering force)
        vehicleVelocity.add(newVelocity.x, newVelocity.y);

        // limit the magnitude of vector(new velocity) to maximum speed
        vehicleVelocity.setMagnitude(Math.min(Seeker.MAX_SPEED, vehicleVelocity.getMagnitude()));
    }

    lookAhead()
    {
        // Update vehicle rotation according to the angle of the vehicle velocity
        this.rotation = Seeker.VEC_REF.angle(this.body.velocity);
    }
}

/**
 * Seeker using a simple Arrival Behavior implementation
 */
export class ApproachingSeekerSimple extends Seeker
{
    /**
     * Create a new ApproachingSeekerSimple object
     * @param game  The Phaser.Game instance
     * @param posX  The x coordinate (in world space) to position the Sprite at
     * @param posY  The y coordinate (in world space) to position the Sprite at
     * @param tint  Optional A tint color to apply to the sprite
     */
    constructor(game, posX, posY, tint = 0xFFFFFF)
    {
        super(game, posX, posY, tint);
    }

    /**
     * @param pTarget {Phaser.Sprite}
     * @returns {Phaser.Point}
     */
    getDesiredVelocity(pTarget)
    {
        // vector(desired velocity) = (target position) - (vehicle position)
        let vecDesired = pTarget.position.clone().subtract(this.position.x, this.position.y);

        // limit the magnitude of vector(desired velocity) to maximum speed
        vecDesired.setMagnitude(Math.min(Seeker.MAX_SPEED, vecDesired.getMagnitude()));

        return vecDesired;
    }
}

/**
 * Seeker using a better Arrival Behavior implementation
 */
export class ApproachingSeeker extends Seeker
{
    static get SLOWING_DISTANCE_THRESHOLD()
    {
        return 100;
    }

    /**
     * Create a new ApproachingSeeker object
     * @param game  The Phaser.Game instance
     * @param posX  The x coordinate (in world space) to position the Sprite at
     * @param posY  The y coordinate (in world space) to position the Sprite at
     * @param tint  Optional A tint color to apply to the sprite
     */
    constructor(game, posX, posY, tint = 0xFFFFFF)
    {
        super(game, posX, posY, tint);
    }

    /**
     * @param pTarget {Phaser.Sprite}
     * @returns {Phaser.Point}
     */
    getDesiredVelocity(pTarget)
    {
        // Implementation of Craig W. Reynolds' algorithm

        // vector(offset) = (target position) - (vehicle position)
        let vecOffset = pTarget.position.clone().subtract(this.position.x, this.position.y);

        // distance = length(vecOffset)
        let distance = vecOffset.getMagnitude();

        // ramped_speed = max_speed * (distance / slowing_distance)
        let rampedSpeed = Seeker.MAX_SPEED * (distance / ApproachingSeeker.SLOWING_DISTANCE_THRESHOLD);

        // clipped_speed = minimum (ramped_speed, max_speed)
        let clippedSpeed = Math.min(rampedSpeed, Seeker.MAX_SPEED);

        // desired_velocity = (clipped_speed / distance) * target_offset
        let m = clippedSpeed / distance;

        return vecOffset.multiply(m, m);
    }
}
