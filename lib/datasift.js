'use strict';

// Private
var b = 2;
function sum(x, y) {
    return x + y;
}
function isXEqualTo5() {
    return (module.exports.x === 5);
}

// Public
module.exports = {
    x: 5,
    add2: function(num) {
        return sum(b, num);
    },
    addX: function(num) {
        return sum(module.exports.x, num);
    },
    compile: function(csdl, cb){
        isXEqualTo5();
        cb();
    }
};