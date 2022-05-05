import Cookies from "js-cookie";
import { format } from 'date-fns';
import { MESSAGE_TEMPLATES, chatSpace } from './view.js';
import {Message} from './message.js';


const URL = {
    USER: 'https://mighty-cove-31255.herokuapp.com/api/user',
    ME: 'https://mighty-cove-31255.herokuapp.com/api/user/me',
    MESSAGES: 'https://mighty-cove-31255.herokuapp.com/api/messages',
    WEBSOCKET: 'wss://mighty-cove-31255.herokuapp.com/websockets'
}

const connectSocket = new WebSocket(`${URL.WEBSOCKET}?${Cookies.get('token')}`);

const SOCKET = {

    sendMessage(message) {
        connectSocket.send(JSON.stringify({text: message}))
    },
}

connectSocket.onclose = function(event) {
    SOCKET.reconnect()
    console.log('CLOSED')
}

function getMessage(event) {
    const data = JSON.parse(event.data)
    const text = data.text;
    const userName = data.user.name;
    const date = format(new Date(data.createdAt), 'kk:mm');
    const isCurrentUserMessage = data.user.email === Cookies.get('email');
    const template = isCurrentUserMessage ? MESSAGE_TEMPLATES.POST : MESSAGE_TEMPLATES.GET;
    const message = new Message(template, text, date, userName)

    message.createMessage()
    chatSpace.append(message.template);
    chatSpace.scrollIntoView(!isCurrentUserMessage);
}


function postEmail(email) {
    Cookies.set('email', email, {expires: 30});
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

export {postEmail, patchUsername, getMessage, connectSocket, SOCKET, URL}