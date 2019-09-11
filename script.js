/**
 * Represents our tracking vehicle
 */
class Seeker extends Phaser.Sprite
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
     */
    constructor(game, posX, posY)
    {
        // Create the Phaser.Sprite object
        super(game, posX, posY, 'imgSeeker');
        // Initialize our Seeker
        this.init(game);
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
        vecDesired.multiply(this.position.x, this.position.y);

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

window.onload = function() {
    var width = 800,
        height = 480;

    var game = new Phaser.Game(
        "100", "100", Phaser.WEBGL, '',
        {preload: preload, create: create, update: update}
    );

    var vecReference = new Phaser.Point(0, 0);

    var sprSeeker;
    var sprTarget;

    /**
     *	Preload textures
     */
    function preload() {
        game.load.image('imgSeeker', 'assets/arrow_white_sm.png');
        game.load.image('imgTarget', 'assets/circle_blue.png');
    }

    /**
     *	Setup the game scene
     */
    function create(){
        // set the scale mode to cover the entire screen
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignVertically = true;
        this.scale.pageAlignHorizontally = true;

        // set the background color of the stage
        game.stage.backgroundColor = "#ccc";

        // start the Phaser arcade physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // create seeker sprite
        sprSeeker = new Seeker(game, game.world.centerX, game.world.centerY);

        // create target sprite
        sprTarget = game.add.sprite(game.input.x, game.input.y, 'imgTarget');
        sprTarget.anchor.setTo(0.5, 0.5);
    }

    /**
     * Update the scene, called every frame.
     */
    function update(){
        // update target position regarding to the current input control position
        sprTarget.position.setTo(game.input.x, game.input.y);

        // update seeker to move toward the target
        sprSeeker.seek(sprTarget);
    }
}
