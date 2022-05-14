import { MODALS, FORM } from './view.js';
import Cookies from 'js-cookie';
import {postEmail, patchUsername, SOCKET, token, emailResponse} from './network.js'
import { loadMessageHistory } from './load.js';



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

function saveToken(event) {
    event.preventDefault();
    const input = MODALS.ACCEPT.INPUT;
    Cookies.set('token', input.value, {expires: 30});
    emailResponse(input.value);
    loadMessageHistory()
    MODALS.ACCEPT.MODAL.classList.toggle('accept__active');
}

function setUsername(event) {
    event.preventDefault();
    const input = MODALS.SETTINGS.INPUT;
    const username = input.value;
    patchUsername(username, token)
}


export {postMessage, setUsername, saveToken, codeResponse}