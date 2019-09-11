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
        // Affects idle pacman new targets
        this.pacmanCollection
            .filter(p => !p.IsBusy) // Keep only idle pacmans
            .forEach(p => {
                this.foodCollection = this.foodCollection
                                                    .filter(f => !f.IsBusy)
                                                    .sort((first, second) => {
                                                        let distance1 = p.position.distance(first.position);
                                                        let distance2 = p.position.distance(second.position);

                                                        return distance1 < distance2 ? -1 : 0;
                                                    });

                p.setTrackTarget(this.foodCollection[0]);
            });

        // Do movements
        this.pacmanCollection.forEach(p => p.moveToTarget());

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
