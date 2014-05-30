'use strict';

// Private



// Public
module.exports = {

    /*
     * serialize - obj to URI encoded string
     *
     * @param - obj - {foo: "hi there", bar: "100%" }
     * @return - string - foo=hi%20there&bar=100%25
     */
    serialize: function(obj) {
        var str = [];
        for(var p in obj) {
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        }
        return str.join("&");
    }

};