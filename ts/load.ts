import format from "date-fns/format";
import { MESSAGE_STORAGE, MESSAGE_TEMPLATES, chatSpace, chatSpaceWrapper } from "./message";
import { currentUserEmail, saveMessageHistory, token, LINK } from "./network";


function renderMessageHistory(storage = MESSAGE_STORAGE.STORAGE, start = MESSAGE_STORAGE.START, end = MESSAGE_STORAGE.COUNT) {
    if (MESSAGE_STORAGE.COUNT >= MESSAGE_STORAGE.STORAGE.length) return;
    for(let message = start; message < end; message++) {
        const messageText = storage[message].text;
        const messageTime = format(new Date(storage[message].createdAt), 'kk:mm')
        const name = storage[message].user.name;
        const email = storage[message].user.email;
        
        const isCurrentUserMessage = email === currentUserEmail;
        const template: any = isCurrentUserMessage ? MESSAGE_TEMPLATES.POST.cloneNode(true) : MESSAGE_TEMPLATES.GET.cloneNode(true);

        template.querySelector('.message__inner').textContent = `${name}: ${messageText}`;
        template.querySelector('.message__time').textContent = messageTime;

        chatSpace.prepend(template);
    }
    MESSAGE_STORAGE.START += 20;
    MESSAGE_STORAGE.COUNT += 20;
}

function loadMessageHistory(): void {
    saveMessageHistory(LINK.MESSAGES, token);
    renderMessageHistory()
}

function loadOnScroll() {
    if(chatSpaceWrapper.scrollTop === 0) {
        const currentHeigth = chatSpace.offsetHeight
        renderMessageHistory()
        chatSpaceWrapper.scrollTop = chatSpace.offsetHeight - currentHeigth
        if (MESSAGE_STORAGE.COUNT >= MESSAGE_STORAGE.STORAGE.length) alert('Вся история загружена')
    }  
}

export {loadOnScroll, renderMessageHistory, loadMessageHistory}