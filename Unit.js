import {ApproachingSeeker} from "./Seeker.js";

/**
 * Flags representing a Unit status
 * @type {{Done: number, Idle: number, Busy: number}}
 */
const Flags = {
    Idle: 0,
    Busy: 1,
    Done: 2,
};

/**
 * Represents a unit
 */
export class Unit extends ApproachingSeeker
{
    /**
     * Create a new Unit object
     * @param game {Phaser.Game}
     * @param posX {number}
     * @param posY {number}
     */
    constructor(game, posX, posY, imgName)
    {
        // Create the Phaser.Sprite object
        super(game, posX, posY, imgName);
        // Initialize the unit
        this.init(game);
    }

    /**
     *
     * @param game {Phaser.Game}
     */
    init(game)
    {
        // Add our Sprite to the game
        game.add.existing(this);
        game.physics.enable(this, Phaser.Physics.ARCADE);

        // Move origin to center
        this.anchor.setTo(0.5, 0.5);

        // Set flags to Idle
        this.__flags = Flags.Idle;
    }

    /**
     * Returns if the unit is busy
     * @returns {boolean}
     */
    get IsBusy()
    {
        return !!(this.__flags &= Flags.Busy);
    }

    /**
     * Assign the unit a target to track (seek)
     * @param target {Unit}
     */
    setTrackTarget(target)
    {
        // If target is invalid or busy, abort
        if (!target || target.IsBusy)
            return this;

        // Apply correct flags
        this.__target = target;
        this.__flags |= Flags.Busy;
        this.__target.__flags |= Flags.Busy;

        return this;
    }

    /**
     * Move the unit to the tracked target
     */
    moveToTarget()
    {
        if (!this.IsBusy || !this.__target)
            return this;

        // Move toward the tracked target
        super.seek(this.__target);

        // Check if we overlap with the target
        if (this.overlap(this.__target))
        {
            // Remove Sprite from game
            this.__target.destroy();
            // Reset flags
            this.__target = undefined;
            this.__flags = Flags.Idle;
            // Reset velocity
            this.body.velocity = new Phaser.Point(0, 0);
        }
    }

    /**
     * Generate a unit at randoms coordinates
     * @param game {Phaser.Game}
     * @returns {Unit}
     */
    static Spawn(game)
    {
        // Randomly generate coordinates
        let padding = 15;
        let world = game.world;
        let posX = padding + Math.random() * (world.width - padding);
        let posY = padding + Math.random() * (world.height - padding);

        // TODO: checks for collisions

        // Generate sprite
        return new this(game, posX, posY);
    }
}
