import { settingsModal, authorizationModal, acceptModal } from "./modal";
import {setUsername, saveToken, codeResponse} from './formActions';
import { loadOnScroll, loadMessageHistory } from "./load";
import {SOCKET, getMessage, postMessage} from './socket'
import {chatSpaceWrapper, FORM} from './message'


document.addEventListener('DOMContentLoaded', loadMessageHistory);

chatSpaceWrapper.addEventListener('scroll', loadOnScroll);

SOCKET.connectedSocket.addEventListener('message', getMessage);
FORM.CURRENT.addEventListener('submit', postMessage);

authorizationModal.UI_ELEMENTS.form.addEventListener('submit', codeResponse);
authorizationModal.UI_ELEMENTS.openButton.addEventListener('click', authorizationModal.open);
authorizationModal.UI_ELEMENTS.main.addEventListener('click', authorizationModal.close);

settingsModal.UI_ELEMENTS.form.addEventListener('submit', setUsername);
settingsModal.UI_ELEMENTS.openButton.addEventListener('click', settingsModal.open);
settingsModal.UI_ELEMENTS.main.addEventListener('click', settingsModal.close);

acceptModal.UI_ELEMENTS.form.addEventListener('submit', saveToken);
acceptModal.UI_ELEMENTS.openButton.addEventListener('click', acceptModal.open);

