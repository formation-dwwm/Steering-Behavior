import {Unit} from "./Unit.js";

/**
 * Represents a Pacman unit
 */
export class Pacman extends Unit
{
    /**
     * Create a new Pacman object
     * @param game
     * @param posX
     * @param posY
     */
    constructor(game, posX, posY)
    {
        // Create the Phaser.Sprite object
        super(game, posX, posY, `imgPacman`);

        this.init(game);
    }
}
