var play_state = {

    // No more 'preload' function, since it is already done in the 'load' state

    create: function() { 
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.jump, this); 

        //adding the background
        this.background1 = this.game.add.sprite(0, 0, 'bg');
        this.background2 = this.game.add.sprite(760, 0, 'bg');

        this.pipes = game.add.group();
        this.pipes.createMultiple(20, 'pipe');  

        this.invs = game.add.group();

        this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);           

        //adding the flapping bird
        this.bird = this.game.add.sprite(100, 245, 'green_flappy');
        this.bird.body.gravity.y = 1000; 
        this.bird.anchor.setTo(-0.2, 0.5);
        this.bird.animations.add('flap');
        this.bird.animations.play('flap', 15, true);

        // No 'this.score', but just 'score'
        score = 0; 
        var style = { font: "30px Arial", fill: "#ffffff" };
        this.label_score = this.game.add.text(20, 20, "0", style); 

        this.jump_sound = this.game.add.audio('jump');
    },

    update: function() {

        if (this.bird.inWorld == false)
            this.restart_game(); 

        if (this.bird.angle < 20)
            this.bird.angle += 1;

        this.game.physics.overlap(this.bird, this.pipes, this.hit_pipe, null, this);      
        this.game.physics.overlap(this.bird, this.invs, this.add_score, null, this);

        this.moveBackground(this.background1);
        this.moveBackground(this.background2);
    },

    moveBackground: function(background) {

        if (background.x < -760 ) {

            background.x = 760;
            background.x -= 0.5;
        } else {
            background.x -= 0.5;
        }

    },
    jump: function() {
        if (this.bird.alive == false)
            return; 

        this.bird.body.velocity.y = -350;
        this.game.add.tween(this.bird).to({angle: -20}, 100).start();
        this.jump_sound.play();
    },

    hit_pipe: function() {
        if (this.bird.alive == false)
            return;

        this.bird.alive = false;
        this.game.time.events.remove(this.timer);

        this.pipes.forEachAlive(function(p){
            p.body.velocity.x = 0;
        }, this);

        this.invs.forEach(function(inv) {
            inv.body.velocity.x = 0;
        });
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

        var pipes = new Array()

        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole+1) 
                pipes.push(this.add_one_pipe(800, i*60+10));

        var single_pipe = pipes[0]
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