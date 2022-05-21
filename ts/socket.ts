import ReconnectingWebSocket from "reconnecting-websocket";
import format from "date-fns/format";
import { LINK, token, currentUserEmail } from "./network";
import { MessageBuilder, MESSAGE_TEMPLATES, chatSpace, FORM } from "./message";

const socketConnection = new WebSocket(`${LINK.WEBSOCKET}?${token}`);

interface SocketSend {
    sendMessage(message: string): void;
}

class Socket  implements SocketSend {
    connectedSocket: WebSocket;

    constructor(connectedSocket: WebSocket) {
        this.connectedSocket = connectedSocket;
    }

    sendMessage(message: string): void {
        this.connectedSocket.send(JSON.stringify({text: message}))
    }
}

export const SOCKET = new Socket(socketConnection)

export function getMessage(event: { data: string; }): void {
    const data = JSON.parse(event.data)
    const text: string = data.text;
    const userName: string = data.user.name;
    const date = format(new Date(data.createdAt), 'kk:mm');
    const isCurrentUserMessage: boolean = data.user.email === currentUserEmail;
    const template: HTMLTemplateElement = isCurrentUserMessage ? MESSAGE_TEMPLATES.POST : MESSAGE_TEMPLATES.GET;
    const message = new MessageBuilder(template, text, date, userName)

    const messageUI = message.renderMessageHandler()
    chatSpace.append(message.template);
    if(isCurrentUserMessage) chatSpace.scrollIntoView(false);
}

export function postMessage(event: Event) {
    event.preventDefault();
    const input: HTMLInputElement = FORM.INPUT;
    if(!input.value) return;
    SOCKET.sendMessage(input.value);

    input.value = '';
}

