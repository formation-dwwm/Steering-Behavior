import {Unit} from "./Unit.js";

/**
 * Represents a Ghost unit
 */
export class Ghost extends Unit
{
    /**
     * Create a new Ghost object
     * @param game {Phaser.Game}
     * @param posX {number}
     * @param posY {number}
     */
    constructor(game, posX, posY)
    {
        // Create the Phaser.Sprite object
        super(game, posX, posY, `imgFood${(Math.random() * 3) << 1 >> 1}`);
    }
}
