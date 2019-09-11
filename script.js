import { Seeker, ApproachingSeeker, ApproachingSeekerSimple} from "./Seeker.js";

window.onload = function() {
    var width = 800,
        height = 480;

    var game = new Phaser.Game(
        "100", "100", Phaser.WEBGL, '',
        {preload: preload, create: create, update: update}
    );

    var vecReference = new Phaser.Point(0, 0);

    var seekersCollection;
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
        seekersCollection = [
            new Seeker(game, game.world.centerX, game.world.centerY),
            new ApproachingSeekerSimple(game, game.world.centerX, game.world.centerY, 0xFF00FF),
            new ApproachingSeeker(game, game.world.centerX, game.world.centerY, 0xFF00)
            ];
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
        seekersCollection.forEach(seeker => seeker.seek(sprTarget));
    }
}
