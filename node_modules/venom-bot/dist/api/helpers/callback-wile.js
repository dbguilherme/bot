"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callbackWile = void 0;
var callbackWile = /** @class */ (function () {
    function callbackWile() {
        this.obj = [];
    }
    callbackWile.prototype.addObjects = function (ids, serializeds) {
        var checkFilter = this.obj['filter'](function (order) { return order.serialized === serializeds; });
        var add = null;
        if (!checkFilter.length) {
            add = {
                id: ids,
                serialized: serializeds
            };
            this.obj['push'](add);
            return true;
        }
        return false;
    };
    callbackWile.prototype.getObjKey = function (serialized) {
        for (var i in this.obj) {
            if (this.obj[i].serialized === serialized) {
                return i;
            }
        }
        return false;
    };
    callbackWile.prototype.checkObj = function (id, serialized) {
        var checkFilter = this.obj['filter'](function (order) { return order.id === id && order.serialized === serialized; });
        if (checkFilter.length) {
            return true;
        }
        return false;
    };
    Object.defineProperty(callbackWile.prototype, "module", {
        get: function () {
            return this.obj;
        },
        enumerable: false,
        configurable: true
    });
    return callbackWile;
}());
exports.callbackWile = callbackWile;
//# sourceMappingURL=callback-wile.js.map