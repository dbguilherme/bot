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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupLayer = void 0;
var retriever_layer_1 = require("./retriever.layer");
var layers_interface_1 = require("../helpers/layers-interface");
var helpers_1 = require("../helpers");
var obj;
var GroupLayer = /** @class */ (function (_super) {
    __extends(GroupLayer, _super);
    function GroupLayer(page, session, options) {
        var _this = _super.call(this, page, session, options) || this;
        _this.page = page;
        return _this;
    }
    /**
     * Parameters to change group image
     * @param {string} groupId group number
     * @param {string} path of image
     */
    GroupLayer.prototype.setGroupImage = function (groupId, path) {
        return __awaiter(this, void 0, void 0, function () {
            var b64, buff, mimeInfo, _webb64_96, _webb64_640, obj_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, helpers_1.downloadFileToBase64)(path, [
                            'image/gif',
                            'image/png',
                            'image/jpg',
                            'image/jpeg',
                            'image/webp'
                        ])];
                    case 1:
                        b64 = _a.sent();
                        if (!!b64) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, helpers_1.fileToBase64)(path)];
                    case 2:
                        b64 = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!b64) return [3 /*break*/, 8];
                        buff = Buffer.from(b64.replace(/^data:image\/(png|jpe?g|webp);base64,/, ''), 'base64');
                        mimeInfo = (0, helpers_1.base64MimeType)(b64);
                        if (!(!mimeInfo || mimeInfo.includes('image'))) return [3 /*break*/, 7];
                        return [4 /*yield*/, (0, helpers_1.resizeImg)(buff, { width: 96, height: 96 })];
                    case 4:
                        _webb64_96 = _a.sent();
                        return [4 /*yield*/, (0, helpers_1.resizeImg)(buff, { width: 640, height: 640 })];
                    case 5:
                        _webb64_640 = _a.sent();
                        obj_1 = { a: _webb64_640, b: _webb64_96 };
                        return [4 /*yield*/, this.page.evaluate(function (_a) {
                                var obj = _a.obj, groupId = _a.groupId;
                                return WAPI.setProfilePic(obj, groupId);
                            }, {
                                obj: obj_1,
                                groupId: groupId
                            })];
                    case 6: return [2 /*return*/, _a.sent()];
                    case 7:
                        console.log('Not an image, allowed formats png, jpeg and webp');
                        return [2 /*return*/, false];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Parameters to change group title
     * @param {string} groupId group number
     * @param {string} title group title
     */
    GroupLayer.prototype.setGroupTitle = function (groupId, title) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var typeFunction, type, check, validating, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    typeFunction = 'setGroupTitle';
                                    type = 'string';
                                    check = [
                                        {
                                            param: 'groupId',
                                            type: type,
                                            value: groupId,
                                            function: typeFunction,
                                            isUser: true
                                        },
                                        {
                                            param: 'title',
                                            type: type,
                                            value: title,
                                            function: typeFunction,
                                            isUser: true
                                        }
                                    ];
                                    validating = (0, layers_interface_1.checkValuesSender)(check);
                                    if (typeof validating === 'object') {
                                        return [2 /*return*/, reject(validating)];
                                    }
                                    return [4 /*yield*/, this.page.evaluate(function (_a) {
                                            var groupId = _a.groupId, title = _a.title;
                                            return WAPI.setGroupTitle(groupId, title);
                                        }, { groupId: groupId, title: title })];
                                case 1:
                                    result = _a.sent();
                                    if (result['erro'] == true) {
                                        return [2 /*return*/, reject(result)];
                                    }
                                    else {
                                        return [2 /*return*/, resolve(result)];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * Parameters to change group description
     * @param {string} groupId group number
     * @param {string} description group description
     */
    GroupLayer.prototype.setGroupDescription = function (groupId, description) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var typeFunction, type, check, validating, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    typeFunction = 'setGroupDescription';
                                    type = 'string';
                                    check = [
                                        {
                                            param: 'groupId',
                                            type: type,
                                            value: groupId,
                                            function: typeFunction,
                                            isUser: true
                                        },
                                        {
                                            param: 'description',
                                            type: type,
                                            value: description,
                                            function: typeFunction,
                                            isUser: true
                                        }
                                    ];
                                    validating = (0, layers_interface_1.checkValuesSender)(check);
                                    if (typeof validating === 'object') {
                                        return [2 /*return*/, reject(validating)];
                                    }
                                    return [4 /*yield*/, this.page.evaluate(function (_a) {
                                            var groupId = _a.groupId, description = _a.description;
                                            return WAPI.setGroupDescription(groupId, description);
                                        }, { groupId: groupId, description: description })];
                                case 1:
                                    result = _a.sent();
                                    if (result['erro'] == true) {
                                        return [2 /*return*/, reject(result)];
                                    }
                                    else {
                                        return [2 /*return*/, resolve(result)];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * Parameters to change group settings, see {@link GroupSettings for details}
     * @param {string} groupId group number
     * @param {GroupSettings} settings
     * @param {boolean} value
     */
    GroupLayer.prototype.setGroupSettings = function (groupId, settings, value) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var typeFunction, type, check, validating, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    typeFunction = 'setGroupSettings';
                                    type = 'string';
                                    check = [
                                        {
                                            param: 'groupId',
                                            type: type,
                                            value: groupId,
                                            function: typeFunction,
                                            isUser: true
                                        },
                                        {
                                            param: 'settings',
                                            type: type,
                                            value: settings,
                                            function: typeFunction,
                                            isUser: true
                                        },
                                        {
                                            param: 'value',
                                            type: type,
                                            value: value,
                                            function: typeFunction,
                                            isUser: true
                                        }
                                    ];
                                    validating = (0, layers_interface_1.checkValuesSender)(check);
                                    if (typeof validating === 'object') {
                                        return [2 /*return*/, reject(validating)];
                                    }
                                    return [4 /*yield*/, this.page.evaluate(function (_a) {
                                            var groupId = _a.groupId, settings = _a.settings, value = _a.value;
                                            return WAPI.setGroupSettings(groupId, settings, value);
                                        }, { groupId: groupId, settings: settings, value: value })];
                                case 1:
                                    result = _a.sent();
                                    if (result['erro'] == true) {
                                        return [2 /*return*/, reject(result)];
                                    }
                                    else {
                                        return [2 /*return*/, resolve(result)];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * Retrieve all groups
     * @returns array of groups
     * @param groupId Chat id ('0000000000-00000000@g.us')
     */
    GroupLayer.prototype.getAllChatsGroups = function (groupId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.evaluate(function () {
                            var chats = WAPI.getAllChats();
                            return !groupId && !groupId.length && typeof groupId === 'string'
                                ? chats.filter(function (chat) { return chat.kind === 'group'; })
                                : chats.filter(function (chat) { return chat.kind === 'group' && groupId === chat.id._serialized; });
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieve all groups new messages
     * @returns array of groups
     */
    GroupLayer.prototype.getChatGroupNewMsg = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.evaluate(function () {
                            var chats = WAPI.getAllChatsWithNewMsg();
                            return chats.filter(function (chat) { return chat.kind === 'group'; });
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Removes the host device from the group
     * @param groupId group id
     */
    GroupLayer.prototype.leaveGroup = function (groupId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.page.evaluate(function (groupId) { return WAPI.leaveGroup(groupId); }, groupId)];
            });
        });
    };
    /**
     * Retrieves group members as [Id] objects
     * @param groupId group id
     */
    GroupLayer.prototype.getGroupMembersIds = function (groupId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.page.evaluate(function (groupId) { return WAPI.getGroupParticipantIDs(groupId); }, groupId)];
            });
        });
    };
    /**
     * Returns group members [Contact] objects
     * @param groupId
     */
    GroupLayer.prototype.getGroupMembers = function (groupId) {
        return __awaiter(this, void 0, void 0, function () {
            var membersIds, actions;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getGroupMembersIds(groupId)];
                    case 1:
                        membersIds = _a.sent();
                        actions = membersIds.map(function (memberId) {
                            return _this.getContact(memberId._serialized);
                        });
                        return [2 /*return*/, Promise.all(actions)];
                }
            });
        });
    };
    /**
     * Reset group invitation link
     * @param chatId
     * @returns boolean
     */
    GroupLayer.prototype.revokeGroupInviteLink = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.evaluate(function (chatId) { return WAPI.revokeGroupInviteLink(chatId); }, chatId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Generates group-invite link
     * @param chatId
     * @returns Invitation link
     */
    GroupLayer.prototype.getGroupInviteLink = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.evaluate(function (chatId) { return WAPI.getGroupInviteLink(chatId); }, chatId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Generates group-invite link
     * @param inviteCode
     * @returns Invite code from group link. Example: CMJYfPFqRyE2GxrnkldYED
     */
    GroupLayer.prototype.getGroupInfoFromInviteLink = function (inviteCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        inviteCode = inviteCode.replace('chat.whatsapp.com/', '');
                        inviteCode = inviteCode.replace('invite/', '');
                        inviteCode = inviteCode.replace('https://', '');
                        inviteCode = inviteCode.replace('http://', '');
                        return [4 /*yield*/, this.page.evaluate(function (inviteCode) { return WAPI.getGroupInfoFromInviteLink(inviteCode); }, inviteCode)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Creates a new chat group
     * @param groupName Group name
     * @param contacts Contacts that should be added.
     */
    GroupLayer.prototype.createGroup = function (groupName, contacts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.evaluate(function (_a) {
                            var groupName = _a.groupName, contacts = _a.contacts;
                            return WAPI.createGroup(groupName, contacts);
                        }, { groupName: groupName, contacts: contacts })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Removes participant from group
     * @param groupId Chat id ('0000000000-00000000@g.us')
     * @param participantId Participant id'000000000000@c.us'
     */
    GroupLayer.prototype.removeParticipant = function (groupId, participantId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.evaluate(function (_a) {
                            var groupId = _a.groupId, participantId = _a.participantId;
                            return WAPI.removeParticipant(groupId, participantId);
                        }, { groupId: groupId, participantId: participantId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Adds participant to Group
     * @param groupId Chat id ('0000000000-00000000@g.us')
     * @param participantId Participant id'000000000000@c.us'
     */
    GroupLayer.prototype.addParticipant = function (groupId, participantId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.evaluate(function (_a) {
                            var groupId = _a.groupId, participantId = _a.participantId;
                            return WAPI.addParticipant(groupId, participantId);
                        }, { groupId: groupId, participantId: participantId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Promotes participant as Admin in given group
     * @param groupId Chat id ('0000000000-00000000@g.us')
     * @param participantId Participant id'000000000000@c.us'
     */
    GroupLayer.prototype.promoteParticipant = function (groupId, participantId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.evaluate(function (_a) {
                            var groupId = _a.groupId, participantId = _a.participantId;
                            return WAPI.promoteParticipant(groupId, participantId);
                        }, { groupId: groupId, participantId: participantId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Demotes admin privileges of participant
     * @param groupId Chat id ('0000000000-00000000@g.us')
     * @param participantId Participant id'000000000000@c.us'
     */
    GroupLayer.prototype.demoteParticipant = function (groupId, participantId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.evaluate(function (_a) {
                            var groupId = _a.groupId, participantId = _a.participantId;
                            return WAPI.demoteParticipant(groupId, participantId);
                        }, { groupId: groupId, participantId: participantId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves group admins
     * @param chatId Group/Chat id ('0000000000-00000000@g.us')
     */
    GroupLayer.prototype.getGroupAdmins = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.evaluate(function (chatId) { return WAPI.getGroupAdmins(chatId); }, chatId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Join a group with invite code
     * @param inviteCode
     */
    GroupLayer.prototype.joinGroup = function (inviteCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        inviteCode = inviteCode.replace('chat.whatsapp.com/', '');
                        inviteCode = inviteCode.replace('invite/', '');
                        inviteCode = inviteCode.replace('https://', '');
                        inviteCode = inviteCode.replace('http://', '');
                        return [4 /*yield*/, this.page.evaluate(function (inviteCode) { return WAPI.joinGroup(inviteCode); }, inviteCode)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return GroupLayer;
}(retriever_layer_1.RetrieverLayer));
exports.GroupLayer = GroupLayer;
//# sourceMappingURL=group.layer.js.map