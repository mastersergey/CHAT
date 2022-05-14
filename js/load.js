import Cookies from "js-cookie";
import { chatSpaceWrapper, chatSpace } from "./view.js";
import { MESSAGE } from "./message.js";
import format from "date-fns/format";
import { MESSAGE_TEMPLATES, MODALS } from "./view.js";
import {token, currentUserEmail, SOCKET} from './network.js'


async function loadMessageHistory() {
    const url = 'https://mighty-cove-31255.herokuapp.com/api/messages'
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const history = await response.json();
    const messages = history.messages;
    for (let item of messages) {
        MESSAGE.STORAGE.push(item);
    }
    MESSAGE.STORAGE.reverse()
    renderMessageHistory()
    chatSpace.scrollIntoView(false);
}

function init() {
    const isUserAuthorized = !!token;
    MODALS.AUTHORIZATION.OPEN_BUTTON.textContent = isUserAuthorized ? 'Выйти' : 'Войти';
    if (isUserAuthorized) {
        loadMessageHistory()
    } else {
        MODALS.AUTHORIZATION.MODAL.classList.add('authorization__active');
    }
}


function renderMessageHistory(storage = MESSAGE.STORAGE, start = MESSAGE.START, end = MESSAGE.COUNT) {
    if (MESSAGE.COUNT >= MESSAGE.STORAGE.length) return;
    for(let message = start; message < end; message++) {
        const messageText = storage[message].text;
        const messageTime = format(new Date(storage[message].createdAt), 'kk:mm')
        const name = storage[message].user.name;
        const email = storage[message].user.email;
        
        const isCurrentUserMessage = email === currentUserEmail;
        const template = isCurrentUserMessage ? MESSAGE_TEMPLATES.POST.cloneNode(true) : MESSAGE_TEMPLATES.GET.cloneNode(true);

        template.querySelector('.message__inner').textContent = `${name}: ${messageText}`;
        template.querySelector('.message__time').textContent = messageTime;

        chatSpace.prepend(template);
    }
    MESSAGE.START += 20;
    MESSAGE.COUNT += 20;
}


function loadOnScroll() {
    if(chatSpaceWrapper.scrollTop === 0) {
        const currentHeigth = chatSpace.offsetHeight
        renderMessageHistory()
        chatSpaceWrapper.scrollTop = chatSpace.offsetHeight - currentHeigth
        if (MESSAGE.COUNT >= MESSAGE.STORAGE.length) alert('Вся история загружена')
    }  
}



export {loadOnScroll, init, loadMessageHistory}