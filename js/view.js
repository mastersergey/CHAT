export const MODALS = {
    SETTINGS: {
        MODAL: document.querySelector('.settings'),
        OPEN_BUTTON: document.querySelector('.settings__btn'),
        INPUT: document.querySelector('.settings__inner-form-input'),
        FORM: document.querySelector('.settings__inner-form')
    },
    AUTHORIZATION: {
        MODAL: document.querySelector('.authorization'),
        OPEN_BUTTON: document.querySelector('.authorization__btn'),
        INPUT: document.querySelector('.authorization__inner-form-input'),
        FORM: document.querySelector('.authorization__inner-form')
    },
    ACCEPT: {
        MODAL: document.querySelector('.accept'),
        INPUT: document.querySelector('.accept__inner-form-input'),
        FORM: document.querySelector('.accept__inner-form')
    },

    OPEN(event) {
        event.preventDefault();
        if (event.target.classList.contains('settings__btn')) {
        MODALS.SETTINGS.MODAL.classList.add('settings__active');
        } else if (event.target.classList.contains('authorization__btn')) {
            MODALS.AUTHORIZATION.MODAL.classList.add('authorization__active');
        }
    },
    CLOSE(event) {
        const isSettingsModal =  event.target.classList.contains('settings__active') || event.target.classList.contains('settings__inner-header-close');
        const isAuthorizationModal = event.target.classList.contains('authorization__active') || event.target.classList.contains('authorization__inner-header-close');
        if(isSettingsModal) {
            MODALS.SETTINGS.MODAL.classList.remove('settings__active');
        } else if (isAuthorizationModal) {
            MODALS.AUTHORIZATION.MODAL.classList.remove('authorization__active');
        }
    }
}


export const chatSpace = document.querySelector('.chat__space');
export const chatSpaceWrapper = document.querySelector('.wrapper');

export const FORM = {
    INPUT: document.querySelector('.message__input'),
    CURRENT: document.querySelector('.message__form'),
}

export const MESSAGE_TEMPLATES = {
    POST: document.getElementById('post__template').content,
    GET: document.getElementById('get__template').content
}