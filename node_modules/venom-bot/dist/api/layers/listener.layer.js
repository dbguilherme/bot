"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListenerLayer = void 0;
/*
NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
mMMMMMMMMMNNNmmNNNMMNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
mmNMMNMMMMNNNNNmmmddhdddNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
mddNMMNy:/odNmmddmmNNmdhhddmNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
NmmdNMNd:--+dNmmddhhddmmhsyhhmdmmNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
NmNmdNmy:.-oyNmmmhmdhho+sososyhhhddNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
NmmNdh+-`.:oyNNdmmdmmdo-://oysssyhhhdmNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
Nmmmoyyyo+osdNmdmmddNNhs+/::/+osyssydyhdNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
NNmhsymMMNmmmmdmdNNddNmsso+++////ossssyyhdmNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
mhhhmNNMNNNhssshhmmddmmssyooooso/::+oysshhhhmMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
mmdhdddNNdyoosyhdmddmmmsoooooyysyys/::/oyyhhhyMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
mdddhddmhsooshdmdmdhhyyyysso/ooo+syhhs/-/+shyhMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
dyyhdmd+ososhdmdmyyhhhhhhhyo++o/+///+ohhso++sdMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
dhdmNNdsossyhmdmsydhssssyhhs/++o/o+//:++yhhy+/hNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
mdmNNNNmhysshddyshdyyy/oss+s::/:://++///++++/::hmNNNNNNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
NNMNNNmmNNdymNNhshdshdyhdysh+sy+-:++osssosss++yNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
NmNNNmdNNmNmmmNmyyddyyhdhydyohys/-oo+osssysyyohNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
mmNNNhdNmmNNmNMMNhyyhhhdhyyhmmyh+-/s+sysssyyhyydNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
mNMMMhdNdmMNMMMMMNNmdhdddmhdmmNho/-osoyyo++oyddhhNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
NMMMNmhNdNMNMNMMNmNNNmmmdyoohmhoyo::hsooo++oooydhymMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMNNNhmNNMmmNMNNmmmmdmmdyhhoyddddoo++yoyysooossyhsmMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMNNNmmNNNmdNdNmmddhhhdNNhsmNssdooo/dso++osyyysoymMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMNNNNmNNNNNmddmmNhshNmmmNmNMdhNsh/ohho++/:++MMNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MNNNMMNNNNmmmhhhhdyosdNmdmMMhoNmhdmys+ooo++/+MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
mmNNNMMNNNNmddmdoodmMMNmmNNhssdmNMMMNdNd/osomMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
NmNdhMNmNNMNmdNddohmMMNNNmdmdddNMMMMMMMMmMNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
NmNhmMmmmmNNmdNyoNMNmNmdhyyyhdhoyNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
NmdmMmmddddNmmdys+hmMMMmmhysssyy++dMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
NmdNMMdmdddmmNNyshmNNNNNNNdhhs+yy//dMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
NmNMMMdmdddmmMNysdmNNMMMNhhNdhs+y+/:mMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
mmNMMNhmmddNNNMdyydmMMMNdyshNhyoss+:/MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
NmNMMddmmmmNMNMNdsymNNmdhhdNMNdhsss+:yMMMMMMMMMMMMMMMMNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMdhmmmmmNMNNMmshNMMMmmMMMMMmNdyo+//NMMMMMMMMMMMMMMMhNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMmhmmmmmmNMMNNMyshdhhhyhNMMMMMMdhso+sMMMMMMMMMMMMMMMhmMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMmdmmmmmmmNMMMmNm+ys++oyyNMMMMMMNmmyyoyNMMMMMMMMMMMMMddMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
NmmmmmmmmmmmNMNNmNNyyo+/oohNMMMMMMMMdhhsshmMMMMMMMMMMMyNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
mmNNNNNNmmmmNMMNmmddNmmdhhdmMMMMMMMMMNddhssshmmNNNmmdhdMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
NNNNNNNNNNNNNNNNmNNNNMMMMMNomMMMMMMMMMNNmdhhyyyyyyyhdmMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
Nd+oNMMMMMMMmodo++++++++++m..yNMMMMMNo+mNMMmhssshdNMMNhNMMMMMMMMMMMddMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MN+ /NMMMMMm: d` -ssssss+`d. `+mMMMMN. dNm+:+syso//hNN--yNMMMMMMMd+`yMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMN+ /NMMMm: oM` +NMMMMMNdN. /`.yNMMN. dh.omMMMMMNy.oM- `:hNMMMm+.  yMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMN/ /NMm: oNy` :sssmMMMMN. dh-`/mMN. d-/NMMMMMMMMy`m- y/`/dmo..o: yMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMN/ /m: +NNy. /yyyNMMMMN. dNNo`.yN- d.oNMMMMMMMMd d- mNh-`.`+mN/ yMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMN/ . +NMMN- oNMMMMMNdN. dMMMd:`/. ds.dNMMMMMMm::M- dMMNy/dMMN/ yMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMN/ +NMMMN- /yyyyyys d. dMMMMNo`  dNy-+ymmmho-+NN- dMMMMMMMMN/ yMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMNyNMMMMN+::::::::::m+/mMMMMMMd: dMMNho///+ymMMN+/mMMMMMMMMNs/hMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMNMMMMMMMMMMMMMMMMMMMMMMMMMMMMNsmMMMMMMMMMMMMMMNNNNMMNNNMMNNNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNMMMMMMMMMMMMMMNMMNMNMMMNMMNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNMMNMNMMMNMMNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNNMMNNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
*/
var events_1 = require("events");
var exposed_enum_1 = require("../helpers/exposed.enum");
var profile_layer_1 = require("./profile.layer");
var helpers_1 = require("../helpers");
var callonMessage = new helpers_1.callbackWile();
var callOnack = new helpers_1.callbackWile();
var ListenerLayer = /** @class */ (function (_super) {
    __extends(ListenerLayer, _super);
    function ListenerLayer(page, session, options) {
        var _this = _super.call(this, page, session, options) || this;
        _this.page = page;
        _this.listenerEmitter = new events_1.EventEmitter();
        _this.page.on('load', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, page.waitForSelector('canvas, #app .two, #startup', {
                                visible: true
                            })];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 3: return [4 /*yield*/, this._initialize(this.page)];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.initialize()];
                    case 5:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        _this.page.on('close', function () {
            _this.cancelAutoClose();
            _this.spin('Page Closed', 'fail');
        });
        return _this;
    }
    ListenerLayer.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var functions, _loop_1, this_1, _i, functions_1, func;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        functions = __spreadArray(__spreadArray([], Object.values(exposed_enum_1.ExposedFn), true), [
                            'onAddedToGroup',
                            'onIncomingCall'
                        ], false);
                        _loop_1 = function (func) {
                            var has;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, this_1.page
                                            .evaluate(function (func) { return typeof window[func] === 'function'; }, func)
                                            .catch(function () { return false; })];
                                    case 1:
                                        has = _b.sent();
                                        if (!!has) return [3 /*break*/, 3];
                                        return [4 /*yield*/, this_1.page
                                                .exposeFunction(func, function () {
                                                var _a;
                                                var args = [];
                                                for (var _i = 0; _i < arguments.length; _i++) {
                                                    args[_i] = arguments[_i];
                                                }
                                                return (_a = _this.listenerEmitter).emit.apply(_a, __spreadArray([func], args, false));
                                            })
                                                .catch(function () { })];
                                    case 2:
                                        _b.sent();
                                        _b.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, functions_1 = functions;
                        _a.label = 1;
                    case 1:
                        if (!(_i < functions_1.length)) return [3 /*break*/, 4];
                        func = functions_1[_i];
                        return [5 /*yield**/, _loop_1(func)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, this.page
                            .evaluate(function () {
                            if (!window['onAnyMessage'].exposed) {
                                window.WAPI.allNewMessagesListener(window['onAnyMessage']);
                                window['onAnyMessage'].exposed = true;
                            }
                            if (!window['onStateChange'].exposed) {
                                window.WAPI.onStateChange(window['onStateChange']);
                                window['onStateChange'].exposed = true;
                            }
                            if (!window['onStreamChange'].exposed) {
                                window.WAPI.onStreamChange(window['onStreamChange']);
                                window['onStreamChange'].exposed = true;
                            }
                            if (!window['onAddedToGroup'].exposed) {
                                window.WAPI.onAddedToGroup(window['onAddedToGroup']);
                                window['onAddedToGroup'].exposed = true;
                            }
                            if (!window['onIncomingCall'].exposed) {
                                window.WAPI.onIncomingCall(window['onIncomingCall']);
                                window['onIncomingCall'].exposed = true;
                            }
                            if (!window['onInterfaceChange'].exposed) {
                                window.WAPI.onInterfaceChange(window['onInterfaceChange']);
                                window['onInterfaceChange'].exposed = true;
                            }
                            if (!window['onMessage'].exposed) {
                                window.WAPI.onMessage(window['onMessage']);
                                window['onMessage'].exposed = true;
                            }
                            if (!window['onAck'].exposed) {
                                window.WAPI.onMessage(window['onAck']);
                                window['onAck'].exposed = true;
                            }
                        })
                            .catch(function () { })];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @returns Returns the current state of the connection
     */
    ListenerLayer.prototype.onStreamChange = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.listenerEmitter.on(exposed_enum_1.ExposedFn.onStreamChange, function (state) {
                    fn(state);
                });
                return [2 /*return*/, {
                        dispose: function () {
                            _this.listenerEmitter.off(exposed_enum_1.ExposedFn.onStreamChange, fn);
                        }
                    }];
            });
        });
    };
    /**
     * @event Listens to messages received
     * @returns Observable stream of messages
     */
    ListenerLayer.prototype.onMessage = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.listenerEmitter.on(exposed_enum_1.ExposedFn.OnMessage, function (state) {
                    if (!callonMessage.checkObj(state.from, state.id)) {
                        callonMessage.addObjects(state.from, state.id);
                        fn(state);
                    }
                });
                return [2 /*return*/, {
                        dispose: function () {
                            _this.listenerEmitter.off(exposed_enum_1.ExposedFn.OnMessage, function (state) {
                                if (!callonMessage.checkObj(state.from, state.id)) {
                                    callonMessage.addObjects(state.from, state.id);
                                    fn(state);
                                }
                            });
                        }
                    }];
            });
        });
    };
    /**
     * @event Listens to all new messages
     * @param to callback
     * @fires Message
     */
    ListenerLayer.prototype.onAnyMessage = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.listenerEmitter.on(exposed_enum_1.ExposedFn.OnAnyMessage, fn);
                return [2 /*return*/, {
                        dispose: function () {
                            _this.listenerEmitter.off(exposed_enum_1.ExposedFn.OnAnyMessage, fn);
                        }
                    }];
            });
        });
    };
    /**
     * @event Listens to messages received
     * @returns Observable stream of messages
     */
    ListenerLayer.prototype.onStateChange = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.listenerEmitter.on(exposed_enum_1.ExposedFn.onStateChange, fn);
                return [2 /*return*/, {
                        dispose: function () {
                            _this.listenerEmitter.off(exposed_enum_1.ExposedFn.onStateChange, fn);
                        }
                    }];
            });
        });
    };
    /**
     * @event Listens to interface mode change See {@link InterfaceState} and {@link InterfaceMode} for details
     * @returns A disposable object to cancel the event
     */
    ListenerLayer.prototype.onInterfaceChange = function (fn) {
        var _this = this;
        this.listenerEmitter.on(exposed_enum_1.ExposedFn.onInterfaceChange, fn);
        return {
            dispose: function () {
                _this.listenerEmitter.off(exposed_enum_1.ExposedFn.onInterfaceChange, fn);
            }
        };
    };
    /**
     * @event Listens to messages acknowledgement Changes
     * @returns Observable stream of messages
     */
    ListenerLayer.prototype.onAck = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.listenerEmitter.on(exposed_enum_1.ExposedFn.onAck, function (e) {
                    if (!callOnack.checkObj(e.ack, e.id._serialized)) {
                        var key = callOnack.getObjKey(e.id._serialized);
                        if (key) {
                            callOnack.module[key].id = e.ack;
                            fn(e);
                        }
                        else {
                            callOnack.addObjects(e.ack, e.id._serialized);
                            fn(e);
                        }
                    }
                });
                return [2 /*return*/, {
                        dispose: function () {
                            _this.listenerEmitter.off(exposed_enum_1.ExposedFn.onAck, function (e) {
                                if (!callOnack.checkObj(e.ack, e.id._serialized)) {
                                    var key = callOnack.getObjKey(e.id._serialized);
                                    if (key) {
                                        callOnack.module[key].id = e.ack;
                                        fn(e);
                                    }
                                    else {
                                        callOnack.addObjects(e.ack, e.id._serialized);
                                        fn(e);
                                    }
                                }
                            });
                        }
                    }];
            });
        });
    };
    /**
     * @event Listens to live locations from a chat that already has valid live locations
     * @param chatId the chat from which you want to subscribes to live location updates
     * @param fn callback that takes in a LiveLocation
     * @returns boolean, if returns false then there were no valid live locations in the chat of chatId
     * @emits <LiveLocation> LiveLocation
     */
    ListenerLayer.prototype.onLiveLocation = function (chatId, fn) {
        return __awaiter(this, void 0, void 0, function () {
            var method;
            var _this = this;
            return __generator(this, function (_a) {
                method = 'onLiveLocation_' + chatId.replace('_', '').replace('_', '');
                return [2 /*return*/, this.page
                        .exposeFunction(method, function (liveLocationChangedEvent) {
                        return fn(liveLocationChangedEvent);
                    })
                        .then(function (_) {
                        return _this.page.evaluate(function (_a) {
                            var chatId = _a.chatId, method = _a.method;
                            //@ts-ignore
                            return WAPI.onLiveLocation(chatId, window[method]);
                        }, { chatId: chatId, method: method });
                    })];
            });
        });
    };
    /**
     * @event Listens to participants changed
     * @param to group id: xxxxx-yyyy@us.c
     * @param to callback
     * @returns Stream of ParticipantEvent
     */
    ListenerLayer.prototype.onParticipantsChanged = function (groupId, fn) {
        return __awaiter(this, void 0, void 0, function () {
            var method;
            var _this = this;
            return __generator(this, function (_a) {
                method = 'onParticipantsChanged_' + groupId.replace('_', '').replace('_', '');
                return [2 /*return*/, this.page
                        .exposeFunction(method, function (participantChangedEvent) {
                        return fn(participantChangedEvent);
                    })
                        .then(function (_) {
                        return _this.page.evaluate(function (_a) {
                            var groupId = _a.groupId, method = _a.method;
                            //@ts-ignore
                            WAPI.onParticipantsChanged(groupId, window[method]);
                        }, { groupId: groupId, method: method });
                    })];
            });
        });
    };
    /**
     * @event Fires callback with Chat object every time the host phone is added to a group.
     * @param to callback
     * @returns Observable stream of Chats
     */
    ListenerLayer.prototype.onAddedToGroup = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.listenerEmitter.on('onAddedToGroup', fn);
                return [2 /*return*/, {
                        dispose: function () {
                            _this.listenerEmitter.off('onAddedToGroup', fn);
                        }
                    }];
            });
        });
    };
    /**
     * @event Listens to messages received
     * @returns Observable stream of messages
     */
    ListenerLayer.prototype.onIncomingCall = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.listenerEmitter.on('onIncomingCall', fn);
                return [2 /*return*/, {
                        dispose: function () {
                            _this.listenerEmitter.off('onIncomingCall', fn);
                        }
                    }];
            });
        });
    };
    return ListenerLayer;
}(profile_layer_1.ProfileLayer));
exports.ListenerLayer = ListenerLayer;
//# sourceMappingURL=listener.layer.js.map