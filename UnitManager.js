import { Ghost } from "./Ghost.js";
import { Pacman } from "./Pacman.js";

let __instance;

/**
 * Encapsulate all units operations
 */
export class UnitManager
{
    /**
     * {Phaser.Game}
     */
    __game;
    /**
     * {Pacman[]}
     */
    pacmanCollection;
    /**
     * {Ghost[]}
     */
    ghostCollection;

    /**
     *
     * @param game
     * @param nbPacman
     * @param minGhost
     */
    constructor(game, nbPacman, minGhost)
    {
        this.__game = game;

        // Generate pacman units
        this.pacmanCollection = [];
        for (let i = 0; i < nbPacman; ++i)
            this.pacmanCollection.push(Pacman.Spawn(game));

        // Generate ghost units
        this.ghostCollection = [];
        for (let i = 0; i < minGhost + Math.random() * nbPacman; ++i)
            this.ghostCollection.push(Ghost.Spawn(game));
    }

    __update()
    {
        // Spawn ghosts randomly
        if (Math.random() * 600 < 10)
            for (let i = 1; i < Math.random() * 5; ++i)
                this.ghostCollection.push(Ghost.Spawn(this.__game));

        let     idlePacmans = this.pacmanCollection.filter(p => !p.IsBusy);

        // Compute the nearest pacman for all ghosts
        this.ghostCollection.map(ghost =>
        {
            // Compute all pacmans' distance from this ghost
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
            })[0]; // Return nearest pacman to this ghost
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
        this.ghostCollection = this.ghostCollection.filter(f => !f.IsBusy);
    }

    /**
     * Use this function to initialize the UnitManager
     * @param game {Phaser.Game}
     * @param nbPacman {number}
     * @param minGhost {number}
     */
    static Initialize(game, nbPacman, minGhost)
    {
        if (__instance)
            return;

        __instance = new UnitManager(game, nbPacman, minGhost);
    }

    /***
     * Use this function at each frame to update the units
     */
    static Update()
    {
        __instance.__update();
    }
}
