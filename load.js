var load_state = {  
    preload: function() { 
        this.game.stage.backgroundColor = '#71c5cf';
        this.game.load.image('bird', 'assets/bird.png');  
        this.game.load.image('pipe', 'assets/pipe.png');  
        this.game.load.audio('jump', 'assets/jump.wav');
        this.game.load.atlasJSONHash('green_flappy', 'assets/green_flappy_flight.png', 'assets/green_flappy_flight.json');
        this.game.load.image('bg', 'sprites/background_day_3.png');
    },

    create: function() {
        // When all assets are loaded, go to the 'menu' state
        this.game.state.start('menu');
    }
};