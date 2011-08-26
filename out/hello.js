goog.provide('hello');
goog.require('cljs.core');
goog.require('goog.dom');
goog.require('goog.object');
goog.require('goog.events.Event');
goog.require('goog.events.EventType');
goog.require('goog.ui.ColorButton');
goog.require('goog.ui.Tab');
goog.require('goog.ui.TabBar');
/**
* Output goes to your web browser's console
*/
hello.debug = (function debug(msg){
return goog.global['console']['log'].call(null,msg);
});
hello.database_connected_QMARK_ = cljs.core.atom.call(null,false);
hello.messaging_connected_QMARK_ = cljs.core.atom.call(null,false);
hello.database_button = (function (){var G__1996__1997 = (new goog.ui.ColorButton("Database"));

G__1996__1997.setTooltip("Database Connection Status");
G__1996__1997.setValue("red");
return G__1996__1997;
})();
hello.messaging_button = (function (){var G__1998__1999 = (new goog.ui.ColorButton("Messaging"));

G__1998__1999.setTooltip("Messaging Connection Status");
G__1998__1999.setValue("red");
return G__1998__1999;
})();
hello.tabbar = (new goog.ui.TabBar());
hello.events = goog.object.getValues(goog.ui.Component.EventType);
hello.handle_tab_select = (function handle_tab_select(tabbar,e){
var tab__2000 = e.target;
var content__2001 = goog.dom.getElement(cljs.core.str.call(null,tabbar.getId(),"_content"));

return goog.dom.setTextContent(content__2001,cljs.core.str.call(null,"You selected the \"",tab__2000.getCaption(),"\" tab"));
});
/**
* Associate a colour with the states
*/
hello.button_color = (function button_color(x){
if(cljs.core.truth_(x))
{return "green";
} else
{return "red";
}
});
/**
* Simulate trivial connect/disconnect functionality for the buttions
*/
hello.toggle_state_BANG_ = (function toggle_state_BANG_(x){
return cljs.core.swap_BANG_.call(null,x,cljs.core.not);
});
hello.handle_button_push = (function handle_button_push(s,e){
return e.target.setValue(hello.button_color.call(null,hello.toggle_state_BANG_.call(null,s)));
});
hello.handle_advanced_enable_disable_check_box = (function handle_advanced_enable_disable_check_box(e){
var checkbox__2002 = e.target;
var advanced_tab__2003 = hello.tabbar.getChildAt(3);

hello.debug.call(null,cljs.core.str.call(null,"box is check with ",checkbox__2002.checked));
return advanced_tab__2003.setEnabled(checkbox__2002.checked);
});
hello.handle_hellow_show_hide_check_box = (function handle_hellow_show_hide_check_box(e){
var checkbox__2004 = e.target;
var hello_tab__2005 = hello.tabbar.getChildAt(0);

return hello_tab__2005.setVisible(checkbox__2004.checked);
});
hello.main = (function main(){
hello.debug.call(null,"Entered into the main function -- should be seen on browser console");
hello.tabbar.decorate(goog.dom.getElement("top"));
hello.database_button.render(goog.dom.getElement("buttons"));
hello.messaging_button.render(goog.dom.getElement("buttons"));
goog.events.listen(hello.tabbar,goog.ui.Component.EventType.SELECT,cljs.core.partial.call(null,hello.handle_tab_select,hello.tabbar));
goog.events.listen(hello.database_button,goog.ui.Component.EventType.ACTION,cljs.core.partial.call(null,hello.handle_button_push,hello.database_connected_QMARK_));
goog.events.listen(hello.messaging_button,goog.ui.Component.EventType.ACTION,cljs.core.partial.call(null,hello.handle_button_push,hello.messaging_connected_QMARK_));
goog.events.listen(goog.dom.getElement("enable_top"),goog.events.EventType.CLICK,hello.handle_advanced_enable_disable_check_box);
return goog.events.listen(goog.dom.getElement("show_top"),goog.events.EventType.CLICK,hello.handle_hellow_show_hide_check_box);
});
goog.exportSymbol('hello.main', hello.main);
