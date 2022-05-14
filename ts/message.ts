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
    template: HTMLTemplateElement;
    text: string;
    time: any;
    name: string;

    constructor(template: HTMLTemplateElement, text: string, time: any, name: string) {
        this.template = template;
        this.text = text;
        this.time = time;
        this.name = name;
    }

    renderMessage() {
        const currentTemplate: any = this.template.content.cloneNode(true);
        currentTemplate.querySelector('.message__inner').textContent = `${this.name}: ${this.text}`;
        currentTemplate.querySelector('.message__time').textContent = this.time;
    }
}

export const MESSAGE_STORAGE = {
    STORAGE: [],
    START: 0,
    COUNT: 20
}


