var menu_state = {  
    create: function() {

        //adding the background
        this.background1 = this.game.add.sprite(0, 0, 'bg');
        this.background2 = this.game.add.sprite(760, 0, 'bg');

        this.ground1 = this.game.add.sprite(0, 400, 'ground');
        this.ground2 = this.game.add.sprite(763, 400, 'ground');

        // Call the 'start' function when pressing the spacebar
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.start, this); 

        // Defining variables
        var style = { font: "30px Arial", fill: "#ffffff" };
        var x = game.world.width/2, y = game.world.height/2;

        // Adding a text centered on the screen
        var text = this.game.add.text(x, y-100, "Press space to start", style);
        text.anchor.setTo(0.5, 0.5); 

        // If the user already played
        if (score > 0) {
            // Display its score
            var score_label = this.game.add.text(x, y, "score: " + score, style);
            score_label.anchor.setTo(0.5, 0.5); 
        }
    },

    // Start the actual game
    start: function() {
        this.game.state.start('play');
    }
};