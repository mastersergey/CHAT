"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeResponse = exports.saveToken = exports.setUsername = void 0;
const network_1 = require("./network");
const modal_1 = require("./modal");
const js_cookie_1 = __importDefault(require("js-cookie"));
const network_2 = require("./network");
function codeResponse(event) {
    event.preventDefault();
    const input = modal_1.MODALS.AUTHORIZATION.input;
    (0, network_1.postEmail)(input.value);
    input.value = '';
    modal_1.MODALS.AUTHORIZATION.main.classList.toggle('authorization__active');
    modal_1.MODALS.ACCEPT.main.classList.toggle('accept__active');
}
exports.codeResponse = codeResponse;
function saveToken(event) {
    event.preventDefault();
    const input = modal_1.MODALS.ACCEPT.input;
    js_cookie_1.default.set('token', input.value, { expires: 30 });
    modal_1.MODALS.ACCEPT.main.classList.toggle('accept__active');
}
exports.saveToken = saveToken;
function setUsername(event) {
    event.preventDefault();
    const input = modal_1.MODALS.SETTINGS.input;
    const username = input.value;
    (0, network_1.patchUsername)(username, network_2.token);
}
exports.setUsername = setUsername;
