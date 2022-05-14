import Cookies from "js-cookie";
import { format } from 'date-fns';
import ReconnectingWebSocket from "reconnecting-websocket";
import { MESSAGE_TEMPLATES, MODALS ,chatSpace } from './view.js';
import {Message} from './message.js';
import { EmailError } from "./error.js";


const URL = {
    USER: 'https://mighty-cove-31255.herokuapp.com/api/user',
    ME: 'https://mighty-cove-31255.herokuapp.com/api/user/me',
    MESSAGES: 'https://mighty-cove-31255.herokuapp.com/api/messages',
    WEBSOCKET: 'wss://mighty-cove-31255.herokuapp.com/websockets'
}

const token = Cookies.get('token');
const currentUserEmail = Cookies.get('email');
const connectSocket = new ReconnectingWebSocket(`${URL.WEBSOCKET}?${token}`);

const SOCKET = {
    sendMessage(message) {
        connectSocket.send(JSON.stringify({text: message}))
    },
}



function getMessage(event) {
    const data = JSON.parse(event.data)
    const text = data.text;
    const userName = data.user.name;
    const date = format(new Date(data.createdAt), 'kk:mm');
    const isCurrentUserMessage = data.user.email === currentUserEmail;
    const template = isCurrentUserMessage ? MESSAGE_TEMPLATES.POST : MESSAGE_TEMPLATES.GET;
    const message = new Message(template, text, date, userName)

    message.createMessage()
    chatSpace.append(message.template);
    if(isCurrentUserMessage) chatSpace.scrollIntoView(false);
}


function postEmail(email) {
    Cookies.set('email', email,{expires: 30});
    try {
        fetch(URL.USER, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({email: email})
        })
    } catch(e) {
        alert(e.name);
    }
}

async function emailResponse(token) {
    try {
    const response = await fetch(URL.ME, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
    const user = await response.json(); 
    const userEmail = user.email;
        if (userEmail) {
            Cookies.set('email', userEmail, {expires: 30})
        } else {
            throw new EmailError('Не удалось получить почту');
        }
    } catch(e) {
        alert(`${e.name}:${e.text}`);
    }
}

function patchUsername(username, token) {
    try {
        fetch(URL.USER, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({name: username})
        })
    } catch(e) {
        alert(e.name);
    }
}


export {postEmail, patchUsername, getMessage, emailResponse, currentUserEmail, connectSocket, SOCKET, URL, token}