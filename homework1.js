/// Тестовый вызов функции,
/// передаём фейковый объект {location: {hash:""}} для подмены window.location (Зависимость 1),
/// а также фейковую функцию jQueryFakeFunction (Зависимость 2)
checkURL({location: {hash:""}}, jQueryFakeFunction);
/// Реальный вызов фукнции
checkURL(window, jQueryFunction);

function jQueryFunction(selector){
    return $(selector);
}

/// Заменяем фейковой функцией для зависимости 2 ///
var jQueryFakeFunction = function (selector) {
    //...//какая-то логика
    return new jQuery.fn.init(selector);
};
jQueryFakeFunction.fn = jQueryFakeFunction.prototype = {
    init: function (selector) {//..//}
};
jQueryFakeFunction.fn.init.prototype = jQueryFakeFunction.fn;
jQueryFakeFunction.prototype.removeClass = function(className){//...//};
jQueryFakeFunction.prototype.addClass = function(className){//...//};
jQueryFakeFunction.prototype.attr = function(attributeName){//...//};


function checkURL(windowArg, jQueryFakeFunction) {

    //get the url by removing the hash
    /////////////////////////////////////////////////////////////
    /// Зависимость 1 location (window также к ней относится) ///
    var url = windowArg.location.hash.replace(/^#/, '');                ///
    /////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////
    /// Зависимость 2 $ (также все последующие вызовы jQuery) ///
    container = jQueryFakeFunction('#content');                                ///
    /////////////////////////////////////////////////////////////
    // Do this if url exists (for page refresh, etc...)
    if (url) {
        // remove all active class
        jQueryFakeFunction('nav li.active').removeClass("active");
        // match the url and add the active class
        jQueryFakeFunction('nav li:has(a[href="' + url + '"])').addClass("active");
        var title = (jQueryFakeFunction('nav a[href="' + url + '"]').attr('title'));

        // change page title from global var
        document.title = (title || document.title);
        //console.log("page title: " + document.title);

        // parse url to jquery
        /////////////////////
        /// Шов 1 loadURL ///
        loadURL(url + windowArg.location.search, container);
        /////////////////////
    } else {

        // grab the first URL from nav
        var $this = jQueryFakeFunction('nav > ul > li:first-child > a[href!="#"]');

        //update hash
        windowArg.location.hash = $this.attr('href');

    }
}

