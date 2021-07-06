/*:
* @target MZ
* Version 0.0.0
* Last update 24/09/20
* @author myenemy
* @plugindesc This is a plugin for ingame time
* @help
* This plugin allows you to have a ingame clock for you to manage with events and act the way you want with it
*
==============================================
 * @Terms of use
 * - Common:
 * -  Free to use as in money.
 * -  Feel free to modify to redistribute it.
 * -  This plugin comes as is, with no guarantees.
 * -  I'll try to give support about it, but I can't say I will do it for sure.
 * -  Give credit me as the author of this plugin, I don't mind if you do so in some
 *   scene or some easter egg.
 * - Commercial:
 * -  Report any bugs, incompatibilities and issues with this plugin to me, even if
 *   you have someone else fixing them.
 * 
 * @Terms of redistribution and disambiguation
 * - You must include a link to the original RPG Maker Forums Post plugin.
 * - You can add terms to it, but you can't remove or modify the ones already existent.
 * - You must follow LGPL 3.0.
 *
==============================================
 * 
 * @param lengthS
 * @text Second length
 * @type number
 * @default 30
 * @min 1
 * @max 600
 * @desc How many frames make one second. (Game goes at 60 Frames Per Second)
 * 
 * @param secondsDuration
 * @text Minute length
 * @type number
 * @default 60
 * @min 2
 * @desc How many ingame seconds make one ingame minute
 * 
 * @param minutesDuration
 * @text Hour length
 * @type number
 * @default 60
 * @min 2
 * @desc How many ingame minutes make one ingame hour.
 * 
 * @param hoursDuration
 * @text Day length
 * @type number
 * @default 24
 * @min 2
 * @desc How many ingame hours are one ingame day.
 * 
 * @param daysDuration
 * @text Month length
 * @type number
 * @default 30
 * @min 2
 * @desc How many ingame days make one ingame month by default.
 * 
 * @param monthsDuration
 * @text Year length
 * @type number
 * @default 12
 * @min 2
 * @desc How many ingame months make one ingame year.
 * 
 * @param day
 * @text Starting day
 * @type number
 * @default 1
 * @desc What day in the month does the game start?
 * 
 * @param month
 * @text Starting month
 * @type number
 * @default 1
 * @desc What month in the year does the game start?
 * 
 * @param year
 * @text Starting year
 * @type number
 * @default 1
 * @desc What year is it in the game at game start?
 * 
 * @param hour
 * @text Starting hour
 * @type number
 * @default 6
 * @desc What hour is it at game start?
 * 
 * @param minute
 * @text Starting minute
 * @type number
 * @default 0
 * @desc What minute is it at game start?
 * 
 * @param second
 * @text Starting second
 * @type number
 * @default 0
 * @desc What second is it at game start?
 * 
 * /////////////////////
 * @command dump
 * @text Copy value
 * @arg time
 * @arg variableId
 * @desc Copies current time (hour, day...), to a variable
 * 
 * @command setvar
 * @text Set value
 * @arg time
 * @arg variableId
 * @desc Sets on time (hour, day...), whatever the variable ID has
 * 
 * @command set
 * @text Set value
 * @arg time
 * @arg number
 * @desc Sets on time (hour, day...), bynumber.
 * 
 * @command increase
 * @text Set value
 * @arg time
 * @arg number
 * @desc Increase current time (hour, day...), by number.
 * 
 * @command increasevar
 * @text Set value
 * @arg time
 * @arg variableId
 * @desc Increase current time (hour, day...), by the variable number variableId.
 * 
 * @command decrease
 * @text Set value
 * @arg time
 * @arg number
 * @desc decrease current time (hour, day...), by number.
 * 
 * @command decreasevar
 * @text Set value
 * @arg time
 * @arg variableId
 * @desc decrease current time (hour, day...), by the variable number variableId.
 * 
 *  
 */


var Imported = Imported || {};
Imported.ME_SimpleTimeSystem = "0.5.0";


var me_sts_systemInitialize = Game_System.prototype.initialize;
var me_sts_parameters = PluginManager.parameters('ME_SimpleTimeSystem');
var me_sts_refreshRate=parseInt(me_sts_parameters["lengthS"]);


PluginManager.registerCommand("ME_SimpleTimeSystem","dump",args => {
	
	if (args)
	{
		var time=args["time"];
		var value=args["variableId"];
		
		if (time&&value)
		{
			time=time.toLowerCase();
			if (time[time.length-1]==s)
				time=time.substring(0, time.length - 1);
			value=Number.parseInt(value);
			var result=$gameSystem.me_clock.get(time);
			
			$gameVariables.setValue(value,result ? result : 0);
		}
	}
});

PluginManager.registerCommand("ME_SimpleTimeSystem","set",args => {
	
	if (args)
	{
		var time=args["time"];
		var value=args["number"];
		
		if (time&&value)
		{
			time=time.toLowerCase();
			if (time[time.length-1]==s)
				time=time.substring(0, time.length - 1);
			value=Number.parseInt(value);

			$gameSystem.me_clock.set(time,value);
			$gameSystem.me_clock._frames=0;
		}
	}
});

PluginManager.registerCommand("ME_SimpleTimeSystem","setvar",args => {
	
	if (args)
	{
		var time=args["time"];
		var value=args["variableId"];
		
		if (time&&value)
		{
			time=time.toLowerCase();
			if (time[time.length-1]==s)
				time=time.substring(0, time.length - 1);
			value=Number.parseInt(value);

			$gameSystem.me_clock.set(time,$gameVariables.value(value) ? $gameVariables.value(value):0);
			$gameSystem.me_clock._frames=0;
		}
	}
});





Game_System.prototype.initialize = function() {
	me_sts_systemInitialize.call(this);
	this.me_clock=new ME_Clock();
};

function ME_Clock() {
	this.initialize(...arguments);
}

ME_Clock.prototype.initialize = function() {
	this._seconds = parseInt(me_sts_parameters['second']);
	this._mins = parseInt(me_sts_parameters['minute']);
	this._hours = parseInt(me_sts_parameters['hour']);
	this._day = parseInt(me_sts_parameters['day']);
	this._month = parseInt(me_sts_parameters['month']);
	this._year = parseInt(me_sts_parameters['year']);
	this._frames = 0;
    this._working = false;
};

ME_Clock.prototype.update = function(sceneActive)
{
	if (sceneActive && this._working) {
		this._frames++;
		if (this._frames>me_sts_refreshRate)
		{
			this._frames=0; 
			this.increase("second",1)
		}
	}
};

ME_Clock.prototype.start = function() {
    this._frames = 0;
    this._working = true;
};

ME_Clock.prototype.pause = function() {
    this._working = false;
};

ME_Clock.prototype.isWorking = function() {
    return this._working;
};



Scene_Map.prototype.updateMain = function() {
    $gameMap.update(this.isActive());
	$gamePlayer.update(this.isPlayerActive());
	$gameSystem.me_clock.update(this.isActive());
    $gameTimer.update(this.isActive());
    $gameScreen.update();
};

Scene_Battle.prototype.update = function() {
    const active = this.isActive();
	$gameTimer.update(active);
	$gameSystem.me_clock.update(active);
    $gameScreen.update();
    this.updateVisibility();
    if (active && !this.isBusy()) {
        this.updateBattleProcess();
    }
    Scene_Message.prototype.update.call(this);
};



ME_Clock.prototype.set = function(time,value)
{
	var ammount=parseInt(value)
	switch(typeof time === "string" ? this.internalValue(time):time)
	{
		case 0:
			this._seconds=ammount;
			break;
		case 1:
			this._mins=ammount;
			break;
		case 2:
			this._hours=ammount;
			break;
		case 3:
			this._day=ammount;
			break;
		case 4:
			this._month=ammount;
			break;
		case 5:
			this._year=ammount;
			break;
	}
};

ME_Clock.prototype.get = function(time)
{
	switch(typeof time === "string" ? this.internalValue(time):time)
	{
		case 0:
			return this._seconds;
		case 1:
			return this._mins;
		case 2:
			return this._hours;
		case 3:
			return this._day;
		case 4:
			return this._month;
		case 5:
			return this._year;
	}
};

ME_Clock.prototype.internalValue = function(variable)
{
	switch (variable)
	{
		case "second":
			return 0;
		case "minute":
			return 1;
		case "hour":
			return 2;
		case "day":
			return 3;
		case "month":
			return 4;
		case "year":
			return 5;
		case 0:
			return "second";
		case 1:
			return "minute";
		case 2:
			return "hour";
		case 3:
			return "day";
		case 4:
			return "month";
		case 5:
			return "year";
	}
};

ME_Clock.prototype.increase = function(time, ammount) {
	var timeNumber;
	var timeString;
	if (typeof time === "string")
	{
		timeString=time;
		timeNumber=this.internalValue(time);
	}
	else
	{
		timeString=this.internalValue(time);
		timeNumber=time;
	}
	var fragment = this.get(timeNumber);
	fragment+=ammount;
	if (timeString!="year")
	{
		var duration = me_sts_parameters[timeString+'sDuration'];
		while (fragment>duration)
		{
			fragment-=duration;
			this.increase(timeNumber+1,1);
		}
	}
	this.set(timeNumber,fragment);

};

ME_Clock.prototype.decrease = function(time, ammount) {
	var timeNumber;
	var timeString;
	if (typeof time === "string")
	{
		timeString=time;
		timeNumber=this.internalValue(time);
	}
	else
	{
		timeString=this.internalValue(time);
		timeNumber=time;
	}
	if (timeString!="")
	{
		var fragment = this.get(timeNumber);
		fragment-=ammount;
		if (timeString!="year")
		{
			var duration = parseInt(me_sts_parameters[timeString+'sDuration']);
			
			while (fragment < (timeNumber < 3 ? 0 : 1) )
			{
				fragment+=duration;
				this.decrease(timeNumber+1,1);
			}
			
		}
		this.set(timeNumber,fragment);
		}
}; 
