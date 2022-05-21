"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMessage = exports.getMessage = exports.SOCKET = void 0;
const format_1 = __importDefault(require("date-fns/format"));
const network_1 = require("./network");
const message_1 = require("./message");
const socketConnection = new WebSocket(`${network_1.LINK.WEBSOCKET}?${network_1.token}`);
class Socket {
    constructor(connectedSocket) {
        this.connectedSocket = connectedSocket;
    }
    sendMessage(message) {
        this.connectedSocket.send(JSON.stringify({ text: message }));
    }
}
exports.SOCKET = new Socket(socketConnection);
function getMessage(event) {
    const data = JSON.parse(event.data);
    const text = data.text;
    const userName = data.user.name;
    const date = (0, format_1.default)(new Date(data.createdAt), 'kk:mm');
    const isCurrentUserMessage = data.user.email === network_1.currentUserEmail;
    const template = isCurrentUserMessage ? message_1.MESSAGE_TEMPLATES.POST : message_1.MESSAGE_TEMPLATES.GET;
    const message = new message_1.MessageBuilder(template, text, date, userName);
    const messageUI = message.renderMessageHandler();
    message_1.chatSpace.append(message.template);
    if (isCurrentUserMessage)
        message_1.chatSpace.scrollIntoView(false);
}
exports.getMessage = getMessage;
function postMessage(event) {
    event.preventDefault();
    const input = message_1.FORM.INPUT;
    if (!input.value)
        return;
    exports.SOCKET.sendMessage(input.value);
    input.value = '';
}
exports.postMessage = postMessage;
