/*:
* Version 0.8.0
* @target MZ
* Last update 29/08/20
* @author myenemy
* @plugindesc Allows you to see ME_SimpleTimeSystem on your scene Menu
* @help
* If you add this plugin below ME_SimpleTimeSystem, you will be able to see it in the menu.
* This plugin is made in order to provide a visual understanding in the demo, I suggest against
* using it in an actual project.
* I don't think I'll fix this alternate menu plugin.
*
*
==============================================
 * @Terms of use
 * - Common:
 * -  Free to use as in money.
 * -  Feel free to modify to redistribute it.
 * -  This plugin comes as is, with no guarantees.
 * -  I'll try to give support about it, but I can't say I will do it for sure.
 * - Non Commercial:
 * -  No credit required unless you modify it then credit yourself, in other words,
 *   no claiming as your own!
 * - Commercial:
 * -  Give credit me as the author of this plugin, I don't mind if you do so in some
 *   scene or some easter egg.
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
*
*/

var Imported = Imported || {};

var me_c_sts_dm_work = Imported.ME_SimpleTimeSystem;
var me_c_sts_dm_SceneMenu_create=Scene_Menu.prototype.create;
if (me_c_sts_dm_work)
{
    Scene_Menu.prototype.create = function() {
        me_c_sts_dm_SceneMenu_create.call(this);
        clock=$gameSystem.me_clock;
        this.createCalendarWindow();
    };

    Scene_Menu.prototype.createCalendarWindow = function() {
        const rect = this.calendarWindowRect();
        this.addWindow(new Window_Calendar(rect));
    };

    Scene_Menu.prototype.calendarWindowRect = function() {
        const ww = this.mainCommandWidth();
        const wh = this.calcWindowHeight(1, true);
        const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
        const wy = this.mainAreaBottom() - wh * 2;
        return new Rectangle(wx, wy, ww, wh);
    };

    function Window_Calendar() {
        this.initialize(...arguments);
    }

    Window_Calendar.prototype = Object.create(Window_Selectable.prototype);
    Window_Calendar.prototype.constructor = Window_Calendar;

    Window_Calendar.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this.refresh();
    };

    Window_Calendar.prototype.colSpacing = function() {
        return 0;
    };

    Window_Calendar.prototype.refresh = function() {
        const rect = this.itemLineRect(0);
        const x = rect.x;
        const y = rect.y;
        const width = rect.width;
        this.contents.clear();
        this.drawTime(x, y, width);
    };


    Window_Calendar.prototype.open = function() {
        this.refresh();
        Window_Selectable.prototype.open.call(this);
    };

    Window_Calendar.prototype.drawTime = function(x, y, width) {
        const unitWidth = 80;
        this.resetTextColor();
        
        var calendar=clock.get("day")+"/"+clock.get("month")+"/"+clock.get("year")+"\n";
        calendar+=clock.get("hour")+":"+clock.get("minute")+":"+clock.get("second");
        this.drawText(calendar, x, y, width - unitWidth - 6, "right");
        
    };
}