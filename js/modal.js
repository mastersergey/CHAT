"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptModal = exports.authorizationModal = exports.settingsModal = exports.MODALS = void 0;
exports.MODALS = {
    SETTINGS: {
        main: document.querySelector('.settings'),
        openButton: document.querySelector('.settings__btn'),
        input: document.querySelector('.settings__inner-form-input'),
        form: document.querySelector('.settings__inner-form'),
        closeButton: document.querySelector('.settings__inner-header-close')
    },
    AUTHORIZATION: {
        main: document.querySelector('.authorization'),
        openButton: document.querySelector('.authorization__btn'),
        input: document.querySelector('.authorization__inner-form-input'),
        form: document.querySelector('.authorization__inner-form'),
        closeButton: document.querySelector('.authorization__inner-header-close')
    },
    ACCEPT: {
        main: document.querySelector('.accept'),
        openButton: document.querySelector('.authorization__inner-enter'),
        input: document.querySelector('.accept__inner-form-input'),
        form: document.querySelector('.accept__inner-form'),
        closeButton: document.querySelector('.accept__inner-header-close')
    }
};
class Modal {
    constructor(UI_ELEMENTS, modal) {
        this.UI_ELEMENTS = UI_ELEMENTS;
        this.modal = modal;
        this.openHandler = this.open.bind(this);
        this.closeHandler = this.close.bind(this);
    }
    open() {
        const activeModal = `${this.modal}__active`;
        this.UI_ELEMENTS.main.classList.add(activeModal);
    }
    close(event) {
        const target = event.target;
        const isEventClose = target.classList.contains(`${this.modal}__active`) || target.classList.contains(`${this.modal}__inner-header-close`);
        if (isEventClose)
            this.UI_ELEMENTS.main.classList.remove(`${this.modal}__active`);
        console.log(this.UI_ELEMENTS.main.classList);
    }
}
const settingsModal = new Modal(exports.MODALS.SETTINGS, 'settings');
exports.settingsModal = settingsModal;
const authorizationModal = new Modal(exports.MODALS.AUTHORIZATION, 'authorization');
exports.authorizationModal = authorizationModal;
const acceptModal = new Modal(exports.MODALS.ACCEPT, 'accept');
exports.acceptModal = acceptModal;
