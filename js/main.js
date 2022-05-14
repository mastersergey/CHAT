import { MODALS, FORM, chatSpaceWrapper } from './view.js';
import { postMessage, setUsername, saveToken, codeResponse } from './formActions.js';
import { init, loadOnScroll } from './load.js';
import { connectSocket, getMessage} from './network.js';





document.addEventListener('DOMContentLoaded', init)
chatSpaceWrapper.addEventListener('scroll', loadOnScroll)
MODALS.ACCEPT.FORM.addEventListener('submit', saveToken);
MODALS.SETTINGS.FORM.addEventListener('submit', setUsername);
MODALS.AUTHORIZATION.FORM.addEventListener('submit', codeResponse);
connectSocket.addEventListener('message', getMessage);
FORM.CURRENT.addEventListener('submit', postMessage);
MODALS.ACCEPT.OPEN_BUTTON.addEventListener('click', MODALS.OPEN)
MODALS.SETTINGS.OPEN_BUTTON.addEventListener('click', MODALS.OPEN);
MODALS.AUTHORIZATION.OPEN_BUTTON.addEventListener('click', MODALS.OPEN);
MODALS.SETTINGS.MODAL.addEventListener('click', MODALS.CLOSE);
MODALS.AUTHORIZATION.MODAL.addEventListener('click', MODALS.CLOSE);

