//Enumeration object for allowed at states.  i.e. if this header is used for the store then set g_curAtState = eAtState.store
var eAtStates = {store:"store", 
				 support:"support"};
				 
//var g_curAtState = eAtStates.support;
//var g_curAtState = eAtStates.store;

// ************ INIT MAIN NAV FLYOUT MENUS ****************
//NOTE: The desirable behavior would be to not specify the height and width of each menu
//      But, due to FireFox's way of handling the 'clip' CSS attribute, height & width must be supplied. 
       //                          ID       Dir  left top  width   height
       //                           |        |     |   |     |       |
       //                           V        V     V   V     V       V
var myMenu1 = new ypSlideOutMenu("menu1", "down", 0,  0,   150,    91);
var myMenu2 = new ypSlideOutMenu("menu2", "down", 0, 0, 250, 91);
var myMenu3 = new ypSlideOutMenu("menu3", "down", 0, 0, 394, 155);
var myMenu4 = new ypSlideOutMenu("menu4", "down", 0, 0, 182, 131);
var myMenu5 = new ypSlideOutMenu("menu5", "down", 0, 0, 251, 141);
var myMenu6 = new ypSlideOutMenu("menu6", "down", 0, 0, 132, 111);


//*** writeCSS should not be invoked from within a function, it causes major issues on IE
ypSlideOutMenu.writeCSS();	


//Utility function to reset all nav menus & rollovers
