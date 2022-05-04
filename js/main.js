import { MODALS, FORM, chatSpaceWrapper } from './view.js';
import { postMessage, setUsername, saveToken, codeResponse } from './formActions.js';
import { loadMessageHistory, loadOnScroll } from './load.js';
import { connectSocket, getMessage} from './network.js';





document.addEventListener('DOMContentLoaded', loadMessageHistory)
chatSpaceWrapper.addEventListener('scroll', loadOnScroll)
connectSocket.addEventListener('message', getMessage)
MODALS.ACCEPT.FORM.addEventListener('submit', saveToken);
MODALS.SETTINGS.FORM.addEventListener('submit', setUsername);
MODALS.AUTHORIZATION.FORM.addEventListener('submit', codeResponse);
FORM.CURRENT.addEventListener('submit', postMessage);
MODALS.SETTINGS.OPEN_BUTTON.addEventListener('click', MODALS.OPEN);
MODALS.AUTHORIZATION.OPEN_BUTTON.addEventListener('click', MODALS.OPEN);
MODALS.SETTINGS.MODAL.addEventListener('click', MODALS.CLOSE);
MODALS.AUTHORIZATION.MODAL.addEventListener('click', MODALS.CLOSE);

