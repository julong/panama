


/*****************************************************
 * ypSlideOutMenu
 * http://ypslideoutmenus.sourceforge.net/
 * 3/04/2001
 * 
 * a nice little script to create exclusive, slide-out
 * menus for ns4, ns6, mozilla, opera, ie4, ie5 on 
 * mac and win32. I've got no linux or unix to test on but 
 * it should(?) work... 
 *
 * Licensed under AFL 2.0
 * http://www.opensource.org/licenses/afl-2.0.php
 *
 * Revised: 
 * - 08/29/2002 : added .hideAll()
 * - 04/15/2004 : added .writeCSS() to support more 
 *                than 30 menus.
 * - 10/20/2005 : Modified by SightWorks, Inc.
 * --youngpup--
 *****************************************************/

ypSlideOutMenu.Registry = []
ypSlideOutMenu.minCPUResolution = 10

// constructor
function ypSlideOutMenu(id, dir, left, top, width, height)
{
	this.ie  = document.all ? 1 : 0
	this.ns4 = document.layers ? 1 : 0
	this.dom = document.getElementById ? 1 : 0
	this.css = "";
	this.aniLen = 300
	this.hideDelay = 100
	
	if (this.ie || this.ns4 || this.dom) {
		this.id			 = id
		this.dir		 = dir
		this.orientation = dir == "left" || dir == "right" ? "h" : "v"
		this.dirType	 = dir == "right" || dir == "down" ? "-" : "+"
		this.dim		 = this.orientation == "h" ? width : height
		this.hideTimer	 = false
		this.aniTimer	 = false
		this.open		 = false
		this.over		 = false
		this.startTime	 = 0

		// global reference to this object
		this.gRef = "ypSlideOutMenu_"+id
		eval(this.gRef+"=this")

		// add this menu object to an internal list of all menus
		ypSlideOutMenu.Registry[id] = this

		var d = document

		var strCSS = "";
		strCSS += '#' + this.id + 'Container { visibility:hidden;  '
		//strCSS += 'display: none;';
		strCSS += 'left:' + left + 'px; '
		strCSS += 'top:' + top + 'px; ' 
		strCSS += 'overflow:visible; z-index:10000; }'
		strCSS += '#' + this.id + 'Container, #' + this.id + 'Content { position:absolute; '
		strCSS += 'width:' + width + 'px; '
		//strCSS += 'height:' + height + 'px; '
		//strCSS += 'height: 50; '
		strCSS += 'display: block; '
		strCSS += "background:transparent;";
		if(this.ie)
		{
			strCSS += 'clip:rect(0 ' + width + ' auto 0); '
		}
		else
		{
			strCSS += 'clip:rect(0 ' + width + ' ' + height + ' 0); '
		}
		
		
		
	//	
		strCSS += '}'

		this.css = strCSS;

		this.load()
	}
}

ypSlideOutMenu.writeCSS = function() {
	document.writeln('<style type="text/css">');

	for (var id in ypSlideOutMenu.Registry) {
		document.writeln(ypSlideOutMenu.Registry[id].css);
	}

	document.writeln('</style>');
}

ypSlideOutMenu.prototype.load = function() {
	var d = document
	var lyrId1 = this.id + "Container"
	var lyrId2 = this.id + "Content"
	var obj1 = this.dom ? d.getElementById(lyrId1) : this.ie ? d.all[lyrId1] : d.layers[lyrId1]
	if (obj1) var obj2 = this.ns4 ? obj1.layers[lyrId2] : this.ie ? d.all[lyrId2] : d.getElementById(lyrId2)
	var temp

	if (!obj1 || !obj2) window.setTimeout(this.gRef + ".load()", 100)
	else {
		this.container	= obj1
		this.menu		= obj2
		this.style		= this.ns4 ? this.menu : this.menu.style
		this.homePos	= eval("0" + this.dirType + this.dim)
		this.outPos		= 0
		this.accelConst	= (this.outPos - this.homePos) / this.aniLen / this.aniLen 

		// set event handlers.
		if (this.ns4) this.menu.captureEvents(Event.MOUSEOVER | Event.MOUSEOUT);
		this.menu.onmouseover = new Function("ypSlideOutMenu.showMenu('" + this.id + "')")
		this.menu.onmouseout = new Function("ypSlideOutMenu.hideMenu('" + this.id + "')")

		//set initial state
		this.endSlide()
	}
}
	
ypSlideOutMenu.showMenu = function(id)
{
	var reg = ypSlideOutMenu.Registry
	var obj = ypSlideOutMenu.Registry[id]
	
	if (obj.container) {
		obj.over = true

		// close other menus.
//		for (menu in reg) if (id != menu) ypSlideOutMenu.hideMenu(menu)

		// if this menu is scheduled to close, cancel it.
		if (obj.hideTimer) { reg[id].hideTimer = window.clearTimeout(reg[id].hideTimer) }

		// if this menu is closed, open it.
		if (!obj.open && !obj.aniTimer) reg[id].startSlide(true)
	}
}

ypSlideOutMenu.hideMenu = function(id)
{
	// schedules the menu to close after <hideDelay> ms, which
	// gives the user time to cancel the action if they accidentally moused out
	var obj = ypSlideOutMenu.Registry[id]
	if (obj.container) {
		if (obj.hideTimer) window.clearTimeout(obj.hideTimer)
		obj.hideTimer = window.setTimeout("ypSlideOutMenu.hide('" + id + "')", obj.hideDelay);
	}
}

ypSlideOutMenu.hideAll = function()
{
	var reg = ypSlideOutMenu.Registry
	for (menu in reg) {
		ypSlideOutMenu.hide(menu);
		if (menu.hideTimer) window.clearTimeout(menu.hideTimer);
	}
}

ypSlideOutMenu.hide = function(id)
{
	var obj = ypSlideOutMenu.Registry[id]
	obj.over = false

	if (obj.hideTimer) window.clearTimeout(obj.hideTimer)
	
	// flag that this scheduled event has occured.
	obj.hideTimer = 0

	// if this menu is open, close it.
	if (obj.open && !obj.aniTimer) obj.startSlide(false)
}

ypSlideOutMenu.prototype.startSlide = function(open) {
	this[open ? "onactivate" : "ondeactivate"]()
	this.open = open
	if (open) this.setVisibility(true)
	this.startTime = (new Date()).getTime()	
	this.aniTimer = window.setInterval(this.gRef + ".slide()", ypSlideOutMenu.minCPUResolution)
}

ypSlideOutMenu.prototype.slide = function() {
	var elapsed = (new Date()).getTime() - this.startTime
	if (elapsed > this.aniLen) this.endSlide()
	else {
		var d = Math.round(Math.pow(this.aniLen-elapsed, 2) * this.accelConst)
		if (this.open && this.dirType == "-")		d = -d
		else if (this.open && this.dirType == "+")	d = -d
		else if (!this.open && this.dirType == "-")	d = -this.dim + d
		else										d = this.dim + d

		this.moveTo(d)
	}
}

ypSlideOutMenu.prototype.endSlide = function() {
	this.aniTimer = window.clearTimeout(this.aniTimer)
	this.moveTo(this.open ? this.outPos : this.homePos)
	if (!this.open) this.setVisibility(false)
	if ((this.open && !this.over) || (!this.open && this.over)) {
		this.startSlide(this.over)
	}
}

ypSlideOutMenu.prototype.setVisibility = function(bShow) { 
	var s = this.ns4 ? this.container : this.container.style
	s.visibility = bShow ? "visible" : "hidden";
	//s.display = bShow ? "block" : "none";
}
ypSlideOutMenu.prototype.moveTo = function(p) { 
	this.style[this.orientation == "h" ? "left" : "top"] = this.ns4 ? p : p + "px"
}
ypSlideOutMenu.prototype.getPos = function(c) {
	return parseInt(this.style[c])
}

// events
ypSlideOutMenu.prototype.onactivate		= function() { }
ypSlideOutMenu.prototype.ondeactivate	= function() { }
