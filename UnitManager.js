import { Food } from "./Food.js";
import { Pacman } from "./Pacman.js";

let __instance;

/**
 * Encapsulate all units operations
 */
export class UnitManager
{
    /**
     *
     * @param game
     * @param nbPacman
     * @param minFood
     */
    constructor(game, nbPacman, minFood)
    {
        this.__game = game;

        // Generate pacman units
        this.pacmanCollection = [];
        for (let i = 0; i < nbPacman; ++i)
            this.pacmanCollection.push(Pacman.Spawn(game));

        // Generate food units
        this.foodCollection = [];
        for (let i = 0; i < minFood + Math.random() * nbPacman; ++i)
            this.foodCollection.push(Food.Spawn(game));
    }

    __update()
    {
        let     idlePacmans = this.pacmanCollection.filter(p => !p.IsBusy);

        // Compute the nearest pacman for all ghosts
        this.foodCollection.map(ghost =>
        {
            // Compute all pacman's distance from this ghost
            return idlePacmans.map(pacman =>
            {
                return {
                    distance: pacman.position.distance(ghost.position),
                    ghost: ghost,
                    pacman: pacman
                };
            })
            // Sort them from nearest to farthest
            .sort((first, second) =>
            {
                return first.distance < second.distance ? -1 : 0;
            })[0]; // Return nearest ghost to this food
        })
        // Sort them with nearest distances
        .sort((first, second) =>
        {
            return first.distance < second.distance ? -1 : 0;
        })
        // Iterate through everyone of them
        .forEach(potentialTarget =>
        {
            if (!potentialTarget)
                return;
            const { ghost, pacman } = potentialTarget;

            if (!pacman.IsBusy)
            {
                // Affects the ghost to the pacman
                pacman.setTrackTarget(ghost);
            }
        });

        // Do movements
        this.pacmanCollection.forEach(p => p.moveToTarget());

        // Remove ghosts reference that are being processed
        this.foodCollection = this.foodCollection.filter(f => !f.IsBusy);

        // Spawn ghosts randomly
        if (Math.random() * 600 < 10)
            for (let i = 1; i < Math.random() * 5; ++i)
                this.foodCollection.push(Food.Spawn(this.__game));
    }

    /**
     * Use this function to initialize the UnitManager
     * @param game {Phaser.Game}
     * @param nbPacman {number}
     * @param minFood {number}
     */
    static Initialize(game, nbPacman, minFood)
    {
        if (__instance)
            return;

        __instance = new UnitManager(game, nbPacman, minFood);
    }

    /***
     * Use this function at each frame to update the units
     */
    static Update()
    {
        __instance.__update();
    }
}
