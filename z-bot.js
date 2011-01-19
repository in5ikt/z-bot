zBot = {
    init: function () {
	this.setupPlayerShipLogicArmour();
	while ( true ) {
	    this.main();
	}
    },
    main: function () {
	console.log( this.getEnemies() );
    },
    getEnemies: function () {
	var enemies = [];
	for ( i in ig.game.entities ) {
	    if ( ! ig.game.entities[ i ].isPlayerShip ) {
		enemies.push( ig.game.entities[ i ] );
	    }
	}
	return enemies;
    }
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
    }
};
zBot.init()


console.log( ig.game.entities[0].pos.x, ig.game.entities[0].pos.y )