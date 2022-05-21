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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveMessageHistory = exports.patchUsername = exports.postEmail = exports.currentUserEmail = exports.token = exports.LINK = void 0;
const js_cookie_1 = __importDefault(require("js-cookie"));
const message_1 = require("./message");
const LINK = {
    USER: 'https://mighty-cove-31255.herokuapp.com/api/user',
    ME: 'https://mighty-cove-31255.herokuapp.com/api/user/me',
    MESSAGES: 'https://mighty-cove-31255.herokuapp.com/api/messages',
    WEBSOCKET: 'wss://mighty-cove-31255.herokuapp.com/websockets'
};
exports.LINK = LINK;
const token = js_cookie_1.default.get('token');
exports.token = token;
const currentUserEmail = js_cookie_1.default.get('email');
exports.currentUserEmail = currentUserEmail;
function postEmail(email) {
    js_cookie_1.default.set('email', email, { expires: 30 });
    try {
        fetch(LINK.USER, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ email: email })
        });
    }
    catch (e) {
        alert(e.name);
    }
}
exports.postEmail = postEmail;
function patchUsername(username, token) {
    try {
        fetch(LINK.USER, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name: username })
        });
    }
    catch (e) {
        alert(e.name);
    }
}
exports.patchUsername = patchUsername;
function saveMessageHistory(url, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const history = yield response.json();
        const messages = history.messages;
        for (let item of messages) {
            message_1.MESSAGE_STORAGE.STORAGE.push(item);
        }
        console.log(messages[0]);
    });
}
exports.saveMessageHistory = saveMessageHistory;
