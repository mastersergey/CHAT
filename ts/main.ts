import { settingsModal, authorizationModal, acceptModal } from "./modal";
import {setUsername, saveToken, codeResponse} from './formActions';
import { loadOnScroll, loadMessageHistory, renderMessageHistory } from "./load";
import {SOCKET, getMessage, postMessage} from './socket'
import {chatSpaceWrapper, FORM} from './message'


document.addEventListener('DOMContentLoaded', loadMessageHistory);

chatSpaceWrapper.addEventListener('scroll', loadOnScroll);

SOCKET.connectedSocket.addEventListener('message', getMessage);
FORM.CURRENT.addEventListener('submit', postMessage);

authorizationModal.UI_ELEMENTS.form.addEventListener('submit', codeResponse);
authorizationModal.UI_ELEMENTS.openButton.addEventListener('click', authorizationModal.openHandler);
authorizationModal.UI_ELEMENTS.main.addEventListener('click', authorizationModal.closeHandler);

settingsModal.UI_ELEMENTS.form.addEventListener('submit', setUsername);
settingsModal.UI_ELEMENTS.openButton.addEventListener('click', settingsModal.openHandler);
settingsModal.UI_ELEMENTS.main.addEventListener('click', settingsModal.closeHandler);

acceptModal.UI_ELEMENTS.form.addEventListener('submit', saveToken);
acceptModal.UI_ELEMENTS.openButton.addEventListener('click', acceptModal.open);

