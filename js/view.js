import Cookies from "js-cookie";
const token = Cookies.get('token')

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
        OPEN_BUTTON: document.querySelector('.authorization__inner-enter'),
        INPUT: document.querySelector('.accept__inner-form-input'),
        FORM: document.querySelector('.accept__inner-form')
    },

    OPEN(event) {
        event.preventDefault();
        const isAuthorizationButton = event.target.classList.contains('authorization__btn');
        const isSettingsButton = event.target.classList.contains('settings__btn');
        const isAcceptButton = event.target.classList.contains('authorization__inner-enter');
        if (isSettingsButton) {
        MODALS.SETTINGS.MODAL.classList.add('settings__active');
        } else if (isAuthorizationButton) {

            if (token) {
                Cookies.remove('token');
                Cookies.remove('email');
                MODALS.AUTHORIZATION.OPEN_BUTTON.textContent = 'Войти'
            } else {
                MODALS.AUTHORIZATION.MODAL.classList.add('authorization__active');
            }

        } else if(isAcceptButton) {
            MODALS.ACCEPT.MODAL.classList.add('accept__active');
        }
    },
    CLOSE(event) {
        const targetClasses = event.target.classList;
        const isSettingsModal =  targetClasses.contains('settings__active') || targetClasses.contains('settings__inner-header-close');
        const isAuthorizationModal = targetClasses.contains('authorization__active') || targetClasses.contains('authorization__inner-header-close');
        if(isSettingsModal) {
            MODALS.SETTINGS.MODAL.classList.remove('settings__active');
        } else if (isAuthorizationModal) {
            if (token === 'undefined') return;
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