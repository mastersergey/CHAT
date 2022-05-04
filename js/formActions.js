import { MODALS, FORM } from './view.js';
import Cookies from 'js-cookie';
import {postEmail, patchUsername, SOCKET} from './network.js'



function postMessage(event) {
    event.preventDefault();
    const input = FORM.INPUT;
    if(!input.value) return;
    SOCKET.sendMessage(input.value);

    input.value = '';
}

function codeResponse(event) {
    event.preventDefault()
    const input = MODALS.AUTHORIZATION.INPUT;
    postEmail(input.value)
    input.value = '';
    MODALS.AUTHORIZATION.MODAL.classList.toggle('authorization__active')
    MODALS.ACCEPT.MODAL.classList.toggle('accept__active');
}

function saveToken() {
    const input = MODALS.ACCEPT.INPUT;
    Cookies.set('token', input.value, {expires: 30});
    MODALS.ACCEPT.MODAL.classList.toggle('accept__active');
}

function setUsername(event) {
    event.preventDefault();
    const input = MODALS.SETTINGS.INPUT;
    const token = Cookies.get('token');
    const username = input.value;
    patchUsername(username, token)
}


export {postMessage, setUsername, saveToken, codeResponse}