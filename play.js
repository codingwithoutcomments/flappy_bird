var play_state = {

    // No more 'preload' function, since it is already done in the 'load' state

    create: function() { 
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.jump, this); 

        //adding the background
        this.background1 = this.game.add.sprite(0, 0, 'bg');
        this.background2 = this.game.add.sprite(760, 0, 'bg');

        this.down_pipes = game.add.group();
        this.down_pipes.createMultiple(20, 'pipe_down');  

        this.up_pipes = game.add.group();
        this.up_pipes.createMultiple(20, 'pipe_up');  

        this.ground1 = this.game.add.sprite(0, 400, 'ground');
        this.ground2 = this.game.add.sprite(763, 400, 'ground');
        this.ground1.body.allowGravity = false;
        this.ground1.body.velocity.x = -200;
        this.ground2.body.allowGravity = false;
        this.ground2.body.velocity.x = -200;

        this.invs = game.add.group();

        this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);           

        //adding the flapping bird
        this.bird = this.game.add.sprite(100, 245, 'green_flappy');
        this.bird.body.gravity.y = 1000; 
        this.bird.anchor.setTo(-0.4, 0.5);
        this.bird.animations.add('flap');
        this.bird.animations.play('flap', 15, true);
        this.bird.sitting = false;

        // No 'this.score', but just 'score'
        score = 0; 
        var style = { font: "30px Arial", fill: "#ffffff" };
        this.label_score = this.game.add.text(20, 20, "0", style); 

    },

    update: function() {

        if (this.bird.angle < 20 && this.bird.alive == true)
            this.bird.angle += 1;

       this.game.physics.overlap(this.bird, this.up_pipes, this.hit_pipe, null, this);      
       this.game.physics.overlap(this.bird, this.down_pipes, this.hit_pipe, null, this);      

        this.game.physics.overlap(this.bird, this.invs, this.add_score, null, this);

        this.game.physics.overlap(this.bird, this.ground1, this.sit_on_ground, null, this);
        this.game.physics.overlap(this.bird, this.ground2, this.sit_on_ground, null, this);

        this.moveBackground(this.background1);
        this.moveBackground(this.background2);

        this.moveGround(this.ground1);
        this.moveGround(this.ground2);
    },
    moveGround: function(ground) {

        if(this.bird.alive == false) return;

        if (ground.x < - 763 ) {

            ground.x = 763;
        } 

    },

    moveBackground: function(background) {

        if(this.bird.alive == false) return;

        if (background.x < -760 ) {

            background.x = 760;
            background.x -= 0.5;

        } else {

            background.x -= 0.5;
        }

    },
    jump: function() {

        if (this.bird.inWorld == false)
            return

        if(this.bird.sitting == true)
            this.restart_game();

        if (this.bird.alive == false)
            return; 

        this.bird.body.velocity.y = -350;
        this.game.add.tween(this.bird).to({angle: -20}, 100).start();
    },
    sit_on_ground: function() {

        if(this.bird.sitting == true)
            return 

        this.bird.sitting = true;
        this.bird.y = 375;
        this.bird.angle = 0;
        this.bird.body.velocity.y = 0;
        this.bird.body.gravity.y = 0;
        this.bird.animations.stop();
        this.bird.animations.play('flap', 8, true);

        this.hit_pipe();
    },
    hit_pipe: function() {
        if (this.bird.alive == false)
            return;

        this.bird.alive = false;
        this.game.time.events.remove(this.timer);

        this.up_pipes.forEachAlive(function(p){
            p.body.velocity.x = 0;
        }, this);

        this.down_pipes.forEachAlive(function(p){
            p.body.velocity.x = 0;
        }, this);

        this.invs.forEach(function(inv) {
            inv.body.velocity.x = 0;
        });

        this.ground1.body.velocity.x = 0;
        this.ground2.body.velocity.x = 0;
    },
    restart_game: function() {
        this.game.time.events.remove(this.timer);

        // This time we go back to the 'menu' state
        this.game.state.start('menu');
    },
    add_one_pipe: function(x, y) {
        var pipe = this.pipes.getFirstDead();
        pipe.reset(x, y);
        pipe.body.velocity.x = -200; 
        pipe.outOfBoundsKill = true;
        return pipe
    },
    add_row_of_pipes: function() {

        var hole = Math.floor(Math.random()*5)+1;

        var START_POINT_OF_DOWN_PIPE = -240;
        var FIRST_PIPE_RANDOMNESS = Math.floor(Math.random()*150)+1;
        var HOLE_LENGTH = 100;

        var down_pipe = this.down_pipes.getFirstDead();
        down_pipe.reset(800, START_POINT_OF_DOWN_PIPE + FIRST_PIPE_RANDOMNESS);
        down_pipe.body.velocity.x = -200;
        down_pipe.outOfBoundsKill = true;

        var up_pipe = this.up_pipes.getFirstDead();
        var Y_POSITION_OF_UP_PIPE = START_POINT_OF_DOWN_PIPE + down_pipe.height + FIRST_PIPE_RANDOMNESS + HOLE_LENGTH;
        up_pipe.reset(800, Y_POSITION_OF_UP_PIPE);
        up_pipe.body.velocity.x = -200;
        up_pipe.outOfBoundsKill = true;

        var single_pipe = down_pipe
        var inv = this.invs.create(single_pipe.x + single_pipe.width, 0);
        inv.width = 2;
        inv.height = game.world.height;
        inv.body.allowGravity = false;
        inv.body.velocity.x = -200;
    },
    add_score: function(_, inv) {
        this.invs.remove(inv);
        score += 1; 
        this.label_score.content = score;  
    },
};