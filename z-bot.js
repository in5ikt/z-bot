/*
 * Z-Bot is an automation script aiming to play the <http://www.phoboslab.org/ztype/> game Like a Boss(tm).
 * 
 * @author in5ikt <http://github.com/in5ikt>
 */
zBot = {
    settings: {
	speed: 100,
	safeRegion: 40,
    },
    /*
     * START ZE BÖÖÖT!
     */
    init: function () {
	this.setupPlayerShipLogicArmour();
	this.mainThreadId = setInterval(this.main, this.settings.speed );
    },
    /*
     * Quirky
     */
    timeoutLoop: function ( scope ) {
	var context = {};
	import = 'object' == typeof scope ? scope : this;
	for ( i in import ) {
	    context[ i ] = import[ i ];
	}
	context.main();
	setTimeout(context.timeoutLoop, 600 + ( (Math.random() * 1700) / 1000 ), context );
    },
    /*
     * Stops the execution of the zBot.main() function
     */
    stop: function () {
	clearInterval( this.mainThreadId );
    },
    /*
     * Main function, runs every Nth millisecond
     */
    main: function () {
	// This runs in the window scope
	var enemyShips = zBot.getEnemies();
	if ( enemyShips.length ) {
	    // Kill nearest ship
	    zBot.attackEnemy();
	}
    },
    attackEnemy: function () {/*
	ig.game.backupKeydown = ig.game.keydown;
	ig.game.keydown = function ( event ) {
	    console.log( event ) ;
	    this.backupKeydown( event );
	};*/
	var nearestEnemy = this.getEnemies().shift();
	if ( ! 'object' == typeof nearestEnemy ) {
	    return false;
	}
	if ( nearestEnemy.remainingWord.length == 0 ) {
	    this.activeTarget = undefined;
	} else {
	    this.activeTarget = nearestEnemy;
	
	    var char = this.activeTarget.remainingWord.split('')[0]
	    console.log( nearestEnemy, char );
	    ig.game.keydown( { keyCode: ig.KEY[char.toUpperCase()], target: {}, which: ig.KEY[char.toUpperCase()], stopPropagation: function () {}, preventDefault: function () {} } );
	}
    },
    /*
     * Returns visible enemy entities ordered by position on canvas, most urgent-to-kill enemy first.
     */
    getEnemies: function () {
	var enemyShips = [];
	for ( i in ig.game.entities ) {
	    if ( 'object' == typeof ig.game.entities[ i ] && ! ig.game.entities[ i ].isPlayerShip && ig.game.entities[ i ].remainingWord && ig.game.entities[ i ].pos.y > this.settings.safeRegion ) {
		enemyShips.push( ig.game.entities[ i ] );
	    }
	}
	enemyShips = enemyShips.sort( function ( a, b ) {
	    //console.log(a, b);
	    //console.log( typeof a, typeof b );
	    return b.pos.y - a.pos.y;
	} );
	return enemyShips;
    },
    /*
     * Makes the player ship unkillable
     */
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
    /*
     * Return player ship game entitiy
     */
    getPlayerShip: function() {
	return ig.game.entities[ ig.game.entities.length -1 ];
    },
    /*
     * A sleep() function, discarded in favor of setInterval
     */
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