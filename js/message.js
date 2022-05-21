"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGE_STORAGE = exports.MessageBuilder = exports.MESSAGE_TEMPLATES = exports.FORM = exports.chatSpaceWrapper = exports.chatSpace = void 0;
exports.chatSpace = document.querySelector('.chat__space');
exports.chatSpaceWrapper = document.querySelector('.wrapper');
exports.FORM = {
    INPUT: document.querySelector('.message__input'),
    CURRENT: document.querySelector('.message__form'),
};
exports.MESSAGE_TEMPLATES = {
    POST: document.getElementById('post__template'),
    GET: document.getElementById('get__template')
};
class MessageBuilder {
    constructor(template, text, time, name) {
        this.template = template.content.cloneNode(true);
        ;
        this.text = text;
        this.time = time;
        this.name = name;
        this.renderMessageHandler = this.renderMessage.bind(this);
    }
    renderMessage() {
        const currentTemplate = this.template;
        currentTemplate.querySelector('.message__inner').textContent = `${this.name}: ${this.text}`;
        currentTemplate.querySelector('.message__time').textContent = this.time;
    }
}
exports.MessageBuilder = MessageBuilder;
exports.MESSAGE_STORAGE = {
    STORAGE: [],
    START: 0,
    COUNT: 20
};
