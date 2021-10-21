"use strict";
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
// Supports ES6
var venom_bot_1 = require("venom-bot");
var dockStart = require('@nlpjs/basic').dockStart;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var dock, nlp, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dockStart({ use: ['Basic'] })];
            case 1:
                dock = _a.sent();
                nlp = dock.get('nlp');
                nlp.addLanguage('en');
                // Adds the utterances and intents for the NLP
                nlp.addDocument('en', 'goodbye for now', 'greetings.bye');
                nlp.addDocument('en', 'bye bye take care', 'greetings.bye');
                nlp.addDocument('en', 'okay see you later', 'greetings.bye');
                nlp.addDocument('en', 'bye for now', 'greetings.bye');
                nlp.addDocument('en', 'i must go', 'greetings.bye');
                nlp.addDocument('en', 'hello', 'greetings.hello');
                nlp.addDocument('en', 'hi', 'greetings.hello');
                nlp.addDocument('en', 'howdy', 'greetings.hello');
                // Train also the NLG
                nlp.addAnswer('en', 'greetings.bye', 'Till next time');
                nlp.addAnswer('en', 'greetings.bye', 'see you soon!');
                nlp.addAnswer('en', 'greetings.hello', 'Hey there!');
                nlp.addAnswer('en', 'greetings.hello', 'Greetings!');
                return [4 /*yield*/, nlp.train()];
            case 2:
                _a.sent();
                return [4 /*yield*/, nlp.process('en', 'I should go now')];
            case 3:
                response = _a.sent();
                console.log(response);
                return [2 /*return*/];
        }
    });
}); })();
(0, venom_bot_1.create)('boot')
    .then(function (client) { return start(client); })
    .catch(function (erro) {
    console.log(erro);
});
function start(client) {
    client.onMessage(function (message) {
        if (message.body === 'Hi' && message.isGroupMsg === false) {
            client
                .sendText(message.from, 'uhuuuu funcionou xuxu🕷')
                .then(function (result) {
                console.log('Result: ', result); //return object success
            })
                .catch(function (erro) {
                console.error('Error when sending: ', erro); //return object error
            });
        }
    });
}
