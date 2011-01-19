zBot = {
    init: function () {
	this.setupPlayerShipLogicArmour();
	while ( true ) {
	    this.main();
	}
    },
    main: function () {
	console.log( this.getEnemies() );
	this.sleep( 1000 )
    },
    getEnemies: function () {
	var enemies = [];
	for ( i in ig.game.entities ) {
	    if ( ! ig.game.entities[ i ].isPlayerShip ) {
		enemies.push( ig.game.entities[ i ] );
	    }
	}
	return enemies;
    },
    setupPlayerShipLogicArmour: function () {
	zBot.playerShip = this.getPlayerShip();
	zBot.playerShip.reallyKill = this.playerShip.kill;
	zBot.playerShip.kill = function ( really ) {
	    if ( true === really ) {
		this.reallyKill();
	    } else {
		console.log('*Player dies* nooot! ;)');
	    }
	}
	this.playerShip.kill(); // Noot!
	//this.playerShip.target();
	this.playerShip.isPlayerShip = true;
    },
    getPlayerShip: function() {
	return ig.game.entities[ ig.game.entities.length -1 ];
    },
    sleep = function ( naptime ){
	// From http://www.ozzu.com/programming-forum/javascript-sleep-function-t66049.html
        naptime = naptime * 1000;
        var sleeping = true;
        var now = new Date();
        var alarm;
        var startingMSeconds = now.getTime();
        alert("starting nap at timestamp: " + startingMSeconds + "\nWill sleep for: " + naptime + " ms");
        while(sleeping){
            alarm = new Date();
            alarmMSeconds = alarm.getTime();
            if(alarmMSeconds - startingMSeconds > naptime){ sleeping = false; }
        }        
        alert("Wakeup!");
    }
};
zBot.init()


console.log( ig.game.entities[0].pos.x, ig.game.entities[0].pos.y )