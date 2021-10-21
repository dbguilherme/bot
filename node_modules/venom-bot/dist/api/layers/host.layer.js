"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostLayer = void 0;
var create_config_1 = require("../../config/create-config");
var browser_1 = require("../../controllers/browser");
var helpers_1 = require("../helpers");
var auth_1 = require("../../controllers/auth");
var sleep_1 = require("../../utils/sleep");
var spinnies_1 = require("../../utils/spinnies");
var HostLayer = /** @class */ (function () {
    function HostLayer(page, session, options) {
        this.page = page;
        this.spinnies = (0, spinnies_1.getSpinnies)();
        this.spinStatus = {
            apiInject: '',
            autoCloseRemain: 0,
            previousText: '',
            previousStatus: null,
            state: ''
        };
        this.autoCloseInterval = null;
        this.statusFind = null;
        this.session = session;
        this.options = __assign(__assign({}, create_config_1.defaultOptions), options);
        // this.spin('Initializing...', 'spinning');
        //this._initialize(this.page);
    }
    HostLayer.prototype.spin = function (text, status) {
        var name = "session-" + this.session;
        text = text || this.spinStatus.previousText;
        this.spinStatus.previousText = text;
        status =
            status || this.spinStatus.previousStatus;
        this.spinStatus.previousStatus = status;
        var fullText = "[instance: " + this.session;
        // if (this.spinStatus.state) {
        //   fullText += `, ${this.spinStatus.state}`;
        // }
        fullText += "]: " + text;
        var prevText = '';
        try {
            prevText = this.spinnies.pick(name).text;
        }
        catch (error) {
            this.spinnies.add(name, { text: fullText, status: status });
            prevText = fullText;
        }
        if (prevText !== fullText) {
            this.spinnies.update(name, {
                text: fullText,
                status: status
            });
        }
    };
    HostLayer.prototype._initialize = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinStatus.apiInject = 'injecting';
                        return [4 /*yield*/, (0, browser_1.injectApi)(page)
                                .then(function () {
                                _this.spinStatus.apiInject = 'injected';
                            })
                                .catch(function () {
                                _this.spinStatus.apiInject = 'failed';
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HostLayer.prototype.tryAutoClose = function () {
        if (this.options.autoClose > 0 &&
            !this.autoCloseInterval &&
            !this.page.isClosed()) {
            this.statusFind && this.statusFind('autocloseCalled', this.session);
            try {
                this.page.close().catch(function () { });
            }
            catch (error) { }
        }
    };
    HostLayer.prototype.startAutoClose = function () {
        var _this = this;
        if (this.options.autoClose > 0 && !this.autoCloseInterval) {
            var remain_1 = this.options.autoClose;
            this.autoCloseInterval = setInterval(function () {
                if (_this.page.isClosed()) {
                    _this.cancelAutoClose();
                    return;
                }
                remain_1 -= 1000;
                _this.spinStatus.autoCloseRemain = Math.round(remain_1 / 1000);
                if (remain_1 <= 0) {
                    _this.cancelAutoClose();
                    _this.tryAutoClose();
                }
            }, 1000);
        }
    };
    HostLayer.prototype.cancelAutoClose = function () {
        clearInterval(this.autoCloseInterval);
        this.autoCloseInterval = null;
    };
    HostLayer.prototype.getQrCode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var qrResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, helpers_1.scrapeImg)(this.page).catch(function () { return undefined; })];
                    case 1:
                        qrResult = _a.sent();
                        if (!(!qrResult || !qrResult.urlCode)) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, auth_1.retrieveQR)(this.page).catch(function () { return undefined; })];
                    case 2:
                        qrResult = _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, qrResult];
                }
            });
        });
    };
    HostLayer.prototype.waitForQrCodeScan = function (catchQR) {
        return __awaiter(this, void 0, void 0, function () {
            var urlCode, attempt, needsScan, result, qr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urlCode = null;
                        attempt = 0;
                        _a.label = 1;
                    case 1:
                        if (!true) return [3 /*break*/, 8];
                        return [4 /*yield*/, (0, auth_1.needsToScan)(this.page).catch(function () { return null; })];
                    case 2:
                        needsScan = _a.sent();
                        if (!needsScan) {
                            return [3 /*break*/, 8];
                        }
                        return [4 /*yield*/, this.getQrCode()];
                    case 3:
                        result = _a.sent();
                        if (!(result === null || result === void 0 ? void 0 : result.urlCode)) {
                            return [3 /*break*/, 8];
                        }
                        if (!(urlCode !== result.urlCode)) return [3 /*break*/, 6];
                        urlCode = result.urlCode;
                        attempt++;
                        qr = '';
                        if (!(this.options.logQR || catchQR)) return [3 /*break*/, 5];
                        return [4 /*yield*/, (0, auth_1.asciiQr)(urlCode)];
                    case 4:
                        qr = _a.sent();
                        _a.label = 5;
                    case 5:
                        if (this.options.logQR) {
                            console.log(qr);
                        }
                        else {
                            this.spin("Waiting for QRCode Scan: Attempt " + attempt);
                        }
                        if (catchQR) {
                            catchQR(result.base64Image, qr, attempt, result.urlCode);
                        }
                        _a.label = 6;
                    case 6: return [4 /*yield*/, (0, sleep_1.sleep)(200)];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    HostLayer.prototype.waitForInChat = function () {
        return __awaiter(this, void 0, void 0, function () {
            var inChat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, auth_1.isInsideChats)(this.page)];
                    case 1:
                        inChat = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(inChat === false)) return [3 /*break*/, 5];
                        return [4 /*yield*/, (0, sleep_1.sleep)(200)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, (0, auth_1.isInsideChats)(this.page)];
                    case 4:
                        inChat = _a.sent();
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, inChat];
                }
            });
        });
    };
    HostLayer.prototype.waitForLogin = function (catchQR, statusFind) {
        return __awaiter(this, void 0, void 0, function () {
            var authenticated, inChat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.statusFind = statusFind;
                        this.spin('Waiting page load', 'spinning');
                        return [4 /*yield*/, this.page
                                .waitForFunction("!document.querySelector('#initial_startup')")
                                .catch(function () { })];
                    case 1:
                        _a.sent();
                        this.spin('Checking is logged...');
                        return [4 /*yield*/, (0, auth_1.isAuthenticated)(this.page).catch(function () { return null; })];
                    case 2:
                        authenticated = _a.sent();
                        if (typeof authenticated === 'object' && authenticated.type) {
                            this.spin("Error http: " + authenticated.type, 'fail');
                            this.page.close();
                            throw "Error http: " + authenticated.type;
                        }
                        this.startAutoClose();
                        if (!(authenticated === false)) return [3 /*break*/, 6];
                        this.spin('Waiting for QRCode Scan...');
                        statusFind && statusFind('notLogged', this.session);
                        return [4 /*yield*/, this.waitForQrCodeScan(catchQR)];
                    case 3:
                        _a.sent();
                        this.spin('Checking QRCode status...');
                        // Wait for interface update
                        return [4 /*yield*/, (0, sleep_1.sleep)(200)];
                    case 4:
                        // Wait for interface update
                        _a.sent();
                        return [4 /*yield*/, (0, auth_1.isAuthenticated)(this.page).catch(function () { return null; })];
                    case 5:
                        authenticated = _a.sent();
                        if (authenticated === null || JSON.stringify(authenticated) === '{}') {
                            this.spin('Failed to authenticate');
                            statusFind && statusFind('qrReadFail', this.session);
                        }
                        else if (authenticated) {
                            this.spin('QRCode Success');
                            statusFind && statusFind('qrReadSuccess', this.session);
                        }
                        else {
                            this.spin('QRCode Fail', 'fail');
                            statusFind && statusFind('qrReadFail', this.session);
                            this.cancelAutoClose();
                            this.tryAutoClose();
                            throw 'Failed to read the QRCode';
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        if (authenticated === true) {
                            this.spin('Authenticated');
                            statusFind && statusFind('isLogged', this.session);
                        }
                        _a.label = 7;
                    case 7:
                        if (!(authenticated === true)) return [3 /*break*/, 10];
                        // Reinicia o contador do autoclose
                        this.cancelAutoClose();
                        this.startAutoClose();
                        // Wait for interface update
                        return [4 /*yield*/, (0, sleep_1.sleep)(200)];
                    case 8:
                        // Wait for interface update
                        _a.sent();
                        this.spin('Checking phone is connected...');
                        return [4 /*yield*/, this.waitForInChat()];
                    case 9:
                        inChat = _a.sent();
                        if (!inChat) {
                            this.spin('Phone not connected', 'fail');
                            statusFind && statusFind('phoneNotConnected', this.session);
                            this.cancelAutoClose();
                            this.tryAutoClose();
                            throw 'Phone not connected';
                        }
                        this.cancelAutoClose();
                        this.spin('Connected', 'succeed');
                        //   statusFind && statusFind('inChat', this.session);
                        return [2 /*return*/, true];
                    case 10:
                        if (authenticated === false) {
                            this.cancelAutoClose();
                            this.tryAutoClose();
                            this.spin('Not logged', 'fail');
                            throw 'Not logged';
                        }
                        this.cancelAutoClose();
                        this.tryAutoClose();
                        this.spin('Unknow error', 'fail');
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Delete the Service Workers
     */
    HostLayer.prototype.killServiceWorker = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.evaluate(function () { return WAPI.killServiceWorker(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Load the service again
     */
    HostLayer.prototype.restartService = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.evaluate(function () { return WAPI.restartService(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @returns Current host device details
     */
    HostLayer.prototype.getHostDevice = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.evaluate(function () { return WAPI.getHost(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves WA version
     */
    HostLayer.prototype.getWAVersion = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.evaluate(function () { return WAPI.getWAVersion(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves the connecction state
     */
    HostLayer.prototype.getConnectionState = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.evaluate(function () {
                            //@ts-ignore
                            return Store.State.default.state;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves if the phone is online. Please note that this may not be real time.
     */
    HostLayer.prototype.isConnected = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.evaluate(function () { return WAPI.isConnected(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves if the phone is online. Please note that this may not be real time.
     */
    HostLayer.prototype.isLoggedIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.evaluate(function () { return WAPI.isLoggedIn(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves Battery Level
     */
    HostLayer.prototype.getBatteryLevel = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.evaluate(function () { return WAPI.getBatteryLevel(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return HostLayer;
}());
exports.HostLayer = HostLayer;
//# sourceMappingURL=host.layer.js.map