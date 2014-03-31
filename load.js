var load_state = {  
    preload: function() { 
        this.game.stage.backgroundColor = '#71c5cf';
        this.game.load.image('bird', 'assets/bird.png');  
        this.game.load.image('pipe', 'assets/pipe.png');  
        this.game.load.atlasJSONHash('pipe_down', 'assets/green_pipe_down_3.png', 'assets/green_pipe_down_3.json');  
        this.game.load.atlasJSONHash('pipe_up', 'assets/green_pipe_up_2.png', 'assets/green_pipe_up_2.json');  
        this.game.load.audio('jump', 'assets/jump.wav');
        this.game.load.atlasJSONHash('green_flappy', 'assets/green_flappy_flight_2.png', 'assets/green_flappy_flight_2.json');
        this.game.load.image('bg', 'sprites/background_day_3.png');
        this.game.load.image('ground', 'sprites/ground_long.png');
    },

    create: function() {
        // When all assets are loaded, go to the 'menu' state
        this.game.state.start('menu');
    }
};e