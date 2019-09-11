import { UnitManager} from "./UnitManager.js";

window.onload = function() {
    var game = new Phaser.Game(
        "100", "100", Phaser.WEBGL, '',
        {preload: preload, create: create, update: update}
    );

    /**
     *	Preload textures
     */
    function preload() {
        game.load.image('imgSeeker', 'assets/arrow_white_sm.png');
        game.load.image('imgTarget', 'assets/circle_blue.png');
        game.load.image('imgPacman', 'assets/pacman.png');
        for (let i = 0; i < 3; ++i)
            game.load.image(`imgFood${i}`, `assets/food${i}.png`);
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

        // Init our UnitManager
        UnitManager.Initialize(game, 5, 15);
    }

    /**
     * Update the scene, called every frame.
     */
    function update() {
        // Update all units
        UnitManager.Update();
    }
}
