export const chatSpace = document.querySelector('.chat__space') as HTMLDivElement;
export const chatSpaceWrapper = document.querySelector('.wrapper') as HTMLDivElement;



export const FORM = {
    INPUT: document.querySelector('.message__input') as HTMLInputElement,
    CURRENT: document.querySelector('.message__form') as HTMLFormElement,
}

export const MESSAGE_TEMPLATES = {
    POST: document.getElementById('post__template') as HTMLTemplateElement,
    GET: document.getElementById('get__template') as HTMLTemplateElement
}

interface RenderMessage {
    renderMessage(): void;
}

export class MessageBuilder implements RenderMessage {
    template: Node;
    text: string;
    time: any;
    name: string;
    renderMessageHandler

    constructor(template: HTMLTemplateElement, text: string, time: any, name: string) {
        this.template = template.content.cloneNode(true);;
        this.text = text;
        this.time = time;
        this.name = name;
        this.renderMessageHandler = this.renderMessage.bind(this);
    }

    renderMessage() {
        const currentTemplate: any = this.template
        currentTemplate.querySelector('.message__inner').textContent = `${this.name}: ${this.text}`;
        currentTemplate.querySelector('.message__time').textContent = this.time;
    }
}


interface IMessageStorage {
    createdAt: string;
    text: string;
    updatedAt: string;
    user: {
        email: string;
        name: string;
    };
}

export const MESSAGE_STORAGE = {
    STORAGE: [] as any,
    START: 0 as number,
    COUNT: 20 as number
}


