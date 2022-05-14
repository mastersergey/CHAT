import { postEmail, patchUsername } from "./network";
import { MODALS } from "./modal";
import Cookies from "js-cookie";
import { token } from "./network";

function codeResponse(event: { preventDefault: () => void; }) {
    event.preventDefault()
    const input = MODALS.AUTHORIZATION.input;
    postEmail(input.value)
    input.value = '';
    MODALS.AUTHORIZATION.main.classList.toggle('authorization__active')
    MODALS.ACCEPT.main.classList.toggle('accept__active');
}

function saveToken(event: { preventDefault: () => void; }) {
    event.preventDefault();
    const input = MODALS.ACCEPT.input;
    Cookies.set('token', input.value, {expires: 30});
    MODALS.ACCEPT.main.classList.toggle('accept__active');
}

function setUsername(event: { preventDefault: () => void; }) {
    event.preventDefault();
    const input = MODALS.SETTINGS.input;
    const username = input.value;
    patchUsername(username, token)
}

export {setUsername, saveToken, codeResponse}