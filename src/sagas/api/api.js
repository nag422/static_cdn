import axios from 'axios';
const url = 'http://127.0.0.1:8000/'
const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export const getUserProfilewithApiRequest = async (payload) => {

    let statuscode = ''
    let cancel
    // cancelToken.source()
    const config = {
        headers: {
            'content-type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        cancelToken: new axios.CancelToken(c => cancel = c)
    }


    const body = JSON.stringify({ user: payload.user })

    await axios
        .post(url + "auth/aboutme/", body, config)
        .then(resp => { statuscode = resp.data })
        .catch(e => {
            if (axios.isCancel(e)) return

        })

    return statuscode
}