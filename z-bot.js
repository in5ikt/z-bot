zBot = {
    init: function () {
	this.setupPlayerShipLogicArmour();
//	while ( true ) {
	    this.main();
//	}
    },
    main: function () {
	this.getEnemies()[0].kill();
	this.sleep( 1000 )
    },
    getEnemies: function () {
	var enemyShips = [];
	for ( i in ig.game.entities ) {
	    if ( 'object' == typeof ig.game.entities[ i ] && ! ig.game.entities[ i ].isPlayerShip ) {
		enemyShips.push( ig.game.entities[ i ] );
	    }
	}
	enemyShips = enemyShips.sort( function ( a, b ) {
	    console.log(a, b);
	    console.log( typeof a, typeof b );
	    return b.pos.y - a.pos.y;
	} );
	return enemyShips;
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
    sleep: function ( naptime ){
	// From http://www.ozzu.com/programming-forum/javascript-sleep-function-t66049.html
        // Naptime is milliseconds // naptime = naptime * 1000;
        var sleeping = true;
        var now = new Date();
        var alarm;
        var startingMSeconds = now.getTime();
	console.log('Sleeping');
        while(sleeping){
            alarm = new Date();
            alarmMSeconds = alarm.getTime();
            if(alarmMSeconds - startingMSeconds > naptime){ sleeping = false; }
        }        
        console.log("Wake up!");
    }
};
zBot.init()


console.log( ig.game.entities[0].pos.x, ig.game.entities[0].pos.y )