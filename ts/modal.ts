export const MODALS = {
    SETTINGS: {
        main: document.querySelector('.settings') as HTMLDivElement,
        openButton: document.querySelector('.settings__btn') as HTMLButtonElement,
        input: document.querySelector('.settings__inner-form-input') as HTMLInputElement,
        form: document.querySelector('.settings__inner-form') as HTMLFormElement,
        closeButton: document.querySelector('.settings__inner-header-close') as HTMLButtonElement
    },
    AUTHORIZATION: {
        main: document.querySelector('.authorization') as HTMLDivElement,
        openButton: document.querySelector('.authorization__btn') as HTMLButtonElement,
        input: document.querySelector('.authorization__inner-form-input') as HTMLInputElement,
        form: document.querySelector('.authorization__inner-form') as HTMLFormElement,
        closeButton: document.querySelector('.authorization__inner-header-close') as HTMLButtonElement
    },
    ACCEPT: {
        main: document.querySelector('.accept') as HTMLDivElement,
        openButton: document.querySelector('.authorization__inner-enter') as HTMLButtonElement,
        input: document.querySelector('.accept__inner-form-input') as HTMLInputElement,
        form: document.querySelector('.accept__inner-form') as HTMLFormElement,
        closeButton: document.querySelector('.accept__inner-header-close') as HTMLButtonElement
    }
}

interface IModal {
    main: HTMLDivElement;
    openButton: HTMLButtonElement;
    input: HTMLInputElement;
    form: HTMLFormElement;
    closeButton: HTMLButtonElement;
}

interface ModalActions {
    open(): void;
    close(event: any): void;
}

class Modal implements ModalActions {
    UI_ELEMENTS: IModal;
    modal: string;
    openHandler
    closeHandler


    constructor(UI_ELEMENTS: IModal, modal: string) {
        this.UI_ELEMENTS = UI_ELEMENTS;
        this.modal = modal;
        this.openHandler = this.open.bind(this);
        this.closeHandler = this.close.bind(this);
    }

    open(): void {
        const activeModal: string = `${this.modal}__active`;
        this.UI_ELEMENTS.main.classList.add(activeModal);
    }

    close(event: any): void {
        const target = event.target;
        const isEventClose = target.classList.contains(`${this.modal}__active`) || target.classList.contains(`${this.modal}__inner-header-close`);
        if (isEventClose) this.UI_ELEMENTS.main.classList.remove(`${this.modal}__active`)
        console.log(this.UI_ELEMENTS.main.classList)
    }
}

const settingsModal = new Modal(MODALS.SETTINGS, 'settings');
const authorizationModal = new Modal(MODALS.AUTHORIZATION, 'authorization')
const acceptModal = new Modal(MODALS.ACCEPT, 'accept')

export {settingsModal, authorizationModal, acceptModal}