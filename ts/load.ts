import format from "date-fns/format";
import { MESSAGE_STORAGE, MESSAGE_TEMPLATES, chatSpace, chatSpaceWrapper } from "./message";
import { currentUserEmail, saveMessageHistory, token, LINK } from "./network";


function renderMessageHistory(storage = MESSAGE_STORAGE.STORAGE, start = MESSAGE_STORAGE.START, end = MESSAGE_STORAGE.COUNT) {
    if (MESSAGE_STORAGE.COUNT >= MESSAGE_STORAGE.STORAGE.length) return;
    for(let message = start; message < end; message++) {
         const messageText = storage[message].text;
        const messageTime = format(new Date(storage[message].createdAt), 'kk:mm')
        const name: string = storage[message].user.name;
        const email:string = storage[message].user.email;
        
        const isCurrentUserMessage = email === currentUserEmail;
        const template: any = isCurrentUserMessage ? MESSAGE_TEMPLATES.POST.content.cloneNode(true) : MESSAGE_TEMPLATES.GET.content.cloneNode(true);

        template.querySelector('.message__inner').textContent = `${name}: ${messageText}`;
        template.querySelector('.message__time').textContent = messageTime;

        chatSpace.prepend(template); 
    }
    MESSAGE_STORAGE.START += 20;
    MESSAGE_STORAGE.COUNT += 20;
}

async function loadMessageHistory() {
    const response = await fetch(LINK.MESSAGES, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const history = await response.json();
    const messages = history.messages;
    for (let item of messages) {
        MESSAGE_STORAGE.STORAGE.push(item);
    }
    MESSAGE_STORAGE.STORAGE.reverse();
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