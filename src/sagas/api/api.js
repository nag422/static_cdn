import axios from 'axios';
// const url = 'http://127.0.0.1:8000/'
const url = 'https://app.contentbond.com/'
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


    const body = JSON.stringify({ user: payload.user, action: 'get' })

    await axios
        .post(url + "auth/aboutme/", body, config)
        .then(resp => { statuscode = resp.data })
        .catch(e => {
            if (axios.isCancel(e)) return

        })

    return statuscode
}

export const updateUserProfilewithApiRequest = async (payload) => {
    
    console.log("UpdateProfile api step saga called..");
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


    const body = JSON.stringify({ user: payload.data, action: 'update' })

    await axios
        .post(url + "auth/aboutme/", body, config)
        .then(resp => { statuscode = resp.data })
        .catch(e => {
            if (axios.isCancel(e)) return

        })

    return statuscode

}

export const getProductById = async (payload) => {
    
    
    let statuscode = ''
    let cancel
    // cancelToken.source()

    const config = {
        headers: {
            'content-type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),
            // 'Authorization':'Token ae2e376c0781973c42fc3e261d854ea6b9532cb3'
        },
        cancelToken: new axios.CancelToken(c => cancel = c)
    }


    const body = JSON.stringify({ productid: payload, action: 'all' })

    await axios
        .post(url + "admin/getproductbyid/", body, config)
        .then(resp => { statuscode = resp.data })
        .catch(e => {
            if (axios.isCancel(e)) return

        })

    return statuscode

}

