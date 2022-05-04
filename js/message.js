export class Message {
    constructor(template, text, time, name) {
        this.template = template.cloneNode(true);
        this.text = text;
        this.time = time;
        this.name = name;
    }

    createMessage() {
        this.template.querySelector('.message__inner').textContent = `${this.name}: ${this.text}`;
        this.template.querySelector('.message__time').textContent = this.time;
    }
}

export const MESSAGE = {
    STORAGE: [],
    START: 0,
    COUNT: 20
}