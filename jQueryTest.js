/**
 * Created by sun on 9/30/2016.
 */
var jQuery = function(selector) {
    console.log(selector);
    return new jQuery.fn.init(selector);
};
jQuery.fn = jQuery.prototype = {
    init: function( selector) {
        //..//
    }
};
jQuery.fn.init.prototype = jQuery.fn;
jQuery.prototype.removeClass = function (className) {
    console.log(className);
};

jQuery("test").removeClass("className")