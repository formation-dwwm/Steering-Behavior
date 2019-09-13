import {ApproachingSeeker} from "./Seeker.js";

/**
 * @type {{Done: number, Busy: number, FlippedH: number, FlippedV: number}}
 */
const Flags = {
    Busy: 1 << 0,
    Done: 1 << 1,

    FlippedH: 1 << 16,
    FlippedV: 1 << 17,
};

/**
 * Represents a unit
 */
export class Unit extends ApproachingSeeker
{
    /**
     * {Unit}
     */
    __target;
    /**
     * {Flags}
     */
    __flags;

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

        // Init flags
        this.__flags = 0;

        // For debug purpose
        this.inputEnabled = true;
        this.events.onInputDown.add(function (unit, event)
        {
            console.log(event);
            console.log(unit);
            console.log();
            debugger;
        }, this);
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
     * Returns if the unit is flipped horizontally
     * @returns {boolean}
     */
    get IsFlippedH()
    {
        return !!(this.__flags &= Flags.FlippedH);
    }

    /**
     * Returns if the unit is flipped vertically
     * @returns {boolean}
     */
    get IsFlippedV()
    {
        return !!(this.__flags &= Flags.FlippedV);
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
        // Little visual effect
        this.__target.alpha = 0.5;

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

        // Ensure unit's orientation is correct
        {
            // TODO
        }

        // Check if we overlap with the target
        if (this.overlap(this.__target))
        {
            // Remove Sprite from game
            this.__target.destroy();
            // Reset flags
            this.__target = undefined;
            this.__flags &= ~Flags.Busy;
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
        let posX;
        let posY;
        let world = game.world;
        let worldPadding = 20;
        let maxTry = 20;

        // Randomly generate coordinates
        do
        {
            posX = worldPadding + Math.random() * (world.width - worldPadding * 2);
            posY = worldPadding + Math.random() * (world.height - worldPadding * 2);
        } while (--maxTry && world.children.length && world.children
                    .map(sprite => overlap(sprite, posX, posY))
                    .reduce((acc, isOverlap) => acc |= isOverlap));

        if (!maxTry)
            throw new Error(`Couldn't find a suitable position for a new ${this.name}`);
        // Generate sprite
        return new this(game, posX, posY);
    }
}

/**
 * Check if a given position overlap with the specified sprite
 * @param sprite
 * @param posX
 * @param posY
 * @returns {boolean}
 */
function overlap(sprite, posX, posY)
{
    // Keep in check with assets' dimensions
    const ASSET_WIDTH = 30;
    const ASSET_HEIGHT = 30;
    // Expected margin between sprites
    const MARGIN = 10;

    let paddingW = ASSET_WIDTH / 2 + MARGIN;
    let paddingH = ASSET_HEIGHT / 2 + MARGIN;

    // Sprite's bounds rectangle
    let spriteL = sprite.position.x - (sprite.width * sprite.anchor.x);
    let spriteT = sprite.position.y - (sprite.width * sprite.anchor.x);
    let spriteR = spriteL + sprite.width;
    let spriteB = spriteT + sprite.height;

    // This unit's bounds rectangle (assumed)
    let posL = posX - paddingW;
    let posT = posY - paddingH;
    let posR = posL + paddingW * 2;
    let posB = posT + paddingH * 2;

    // Compute intersection rectangle
    let intersectL = Math.max(spriteL, posL);
    let intersectT = Math.max(spriteT, posT);
    let intersectR = Math.min(spriteR, posR);
    let intersectB = Math.min(spriteB, posB);

    return intersectL < intersectR && intersectT < intersectB;
}
