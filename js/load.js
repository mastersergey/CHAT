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
exports.loadMessageHistory = exports.renderMessageHistory = exports.loadOnScroll = void 0;
const format_1 = __importDefault(require("date-fns/format"));
const message_1 = require("./message");
const network_1 = require("./network");
function renderMessageHistory(storage = message_1.MESSAGE_STORAGE.STORAGE, start = message_1.MESSAGE_STORAGE.START, end = message_1.MESSAGE_STORAGE.COUNT) {
    if (message_1.MESSAGE_STORAGE.COUNT >= message_1.MESSAGE_STORAGE.STORAGE.length)
        return;
    for (let message = start; message < end; message++) {
        const messageText = storage[message].text;
        const messageTime = (0, format_1.default)(new Date(storage[message].createdAt), 'kk:mm');
        const name = storage[message].user.name;
        const email = storage[message].user.email;
        const isCurrentUserMessage = email === network_1.currentUserEmail;
        const template = isCurrentUserMessage ? message_1.MESSAGE_TEMPLATES.POST.content.cloneNode(true) : message_1.MESSAGE_TEMPLATES.GET.content.cloneNode(true);
        template.querySelector('.message__inner').textContent = `${name}: ${messageText}`;
        template.querySelector('.message__time').textContent = messageTime;
        message_1.chatSpace.prepend(template);
    }
    message_1.MESSAGE_STORAGE.START += 20;
    message_1.MESSAGE_STORAGE.COUNT += 20;
}
exports.renderMessageHistory = renderMessageHistory;
function loadMessageHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(network_1.LINK.MESSAGES, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${network_1.token}`
            }
        });
        const history = yield response.json();
        const messages = history.messages;
        for (let item of messages) {
            message_1.MESSAGE_STORAGE.STORAGE.push(item);
        }
        message_1.MESSAGE_STORAGE.STORAGE.reverse();
        renderMessageHistory();
    });
}
exports.loadMessageHistory = loadMessageHistory;
function loadOnScroll() {
    if (message_1.chatSpaceWrapper.scrollTop === 0) {
        const currentHeigth = message_1.chatSpace.offsetHeight;
        renderMessageHistory();
        message_1.chatSpaceWrapper.scrollTop = message_1.chatSpace.offsetHeight - currentHeigth;
        if (message_1.MESSAGE_STORAGE.COUNT >= message_1.MESSAGE_STORAGE.STORAGE.length)
            alert('Вся история загружена');
    }
}
exports.loadOnScroll = loadOnScroll;
