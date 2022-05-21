import Cookies from "js-cookie";
import { MESSAGE_STORAGE } from "./message";

const LINK = {
    USER: 'https://mighty-cove-31255.herokuapp.com/api/user' as string,
    ME: 'https://mighty-cove-31255.herokuapp.com/api/user/me' as string,
    MESSAGES: 'https://mighty-cove-31255.herokuapp.com/api/messages' as string,
    WEBSOCKET: 'wss://mighty-cove-31255.herokuapp.com/websockets' as string
}


const token: any = Cookies.get('token');
const currentUserEmail: string | undefined = Cookies.get('email');

function postEmail(email: string) {
    Cookies.set('email', email,{expires: 30});
    try {
        fetch(LINK.USER, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({email: email})
        })
    } catch(e: any) {
        alert(e.name);
    }
}

function patchUsername(username: string, token: string) {
    try {
        fetch(LINK.USER, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({name: username})
        })
    } catch(e: any) {
        alert(e.name);
    }
}


async function saveMessageHistory(url: string, token: string) {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const history = await response.json();
    const messages = history.messages;
    for (let item of messages) {
        MESSAGE_STORAGE.STORAGE.push(item);
    }
    console.log(messages[0])
}

export {LINK, token, currentUserEmail, postEmail, patchUsername, saveMessageHistory}