"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketTransport = void 0;
var WebSocket = require("ws");
var WebSocketTransport = /** @class */ (function () {
    function WebSocketTransport(ws) {
        var _this = this;
        this._ws = ws;
        this._ws.addEventListener('message', function (event) {
            if (_this.onmessage)
                _this.onmessage.call(null, event.data);
        });
        this._ws.addEventListener('close', function () {
            if (_this.onclose)
                _this.onclose.call(null);
        });
        // Silently ignore all errors - we don't know what to do with them.
        this._ws.addEventListener('error', function () { });
        this.onmessage = null;
        this.onclose = null;
    }
    WebSocketTransport.create = function (url, timeout) {
        return new Promise(function (resolve, reject) {
            var ws = new WebSocket(url, [], {
                perMessageDeflate: false,
                maxPayload: 256 * 1024 * 1024,
                handshakeTimeout: timeout
            });
            ws.addEventListener('open', function () { return resolve(new WebSocketTransport(ws)); });
            ws.addEventListener('error', reject);
        });
    };
    WebSocketTransport.prototype.send = function (message) {
        this._ws.send(message);
    };
    WebSocketTransport.prototype.close = function () {
        this._ws.close();
    };
    return WebSocketTransport;
}());
exports.WebSocketTransport = WebSocketTransport;
//# sourceMappingURL=websocket.js.map