import axios from 'axios'

export function register(name, email, password, callback, callback2) {
    return async function (dispatch) {
        const res = await axios.post('/api/register/', {name, email, password})
        console.log('REGISTER RESPONSE: ', res.data)
        if (res.data.success) {
            localStorage.setItem("token", res.data.token);
            dispatch({type: 'USER_LOADED', payload: {name, email}})
            await callback()
            setTimeout(() => alert("Account created successfully!"), 500)
        } else {
            alert('This email is already in use!')
            callback2()
        }

    }
}

export function login(email, password, callback, callback2) {
    return async function (dispatch) {
        const res = await axios.post('/api/login/', {email, password})
        console.log('LOGIN RESPONSE: ', res.data)
        if (!res.data.exists) {
            alert('No user exists with that email!')
            callback2()
        } else if (!res.data.correctPass) {
            alert('Incorrect password!')
            callback2()
        } else {
            localStorage.setItem("token", res.data.token);
            dispatch({type: 'USER_LOADED', payload: {name: res.data.user.name, email}})
            if (res.data.user.address)
                dispatch({type: 'SAVE_ADDRESS', payload: res.data.user.address})
            await callback()
            setTimeout(() => alert("Logged in successfully!"), 500)
        }
    }
}

export function fetchCategoryItems(category) {
    return async function (dispatch) {
        const res = await axios.get(`/api/fetch-category-items/?category=${category}`)
        console.log('FETCH CATEGORY ITEMS RESPONSE: ', res.data)
        dispatch({type: 'FETCH_ITEMS', payload: {category, items: res.data}})
    }
}

export function fetchCategories() {
    return async function (dispatch) {
        const res = await axios.get('/api/fetch-categories/')
        console.log('FETCH CATEGORIES RESPONSE: ', res.data)
        dispatch({type: 'FETCH_CATEGORIES', payload: res.data})
    }
}

export function addToCart(item) {
    return async function (dispatch) {
        dispatch({type: 'ADD_TO_CART', payload: item})
    }
}

export function removeItem(item) {
    return async function (dispatch) {
        dispatch({type: 'REMOVE_FROM_CART', payload: item.id})
    }
}

export function makePayment(ids, deviceFingerprintingId, amount, cardDetails, address, callback, errCallback) {
    return async function (dispatch) {
        dispatch({type: 'SAVE_ADDRESS', payload: address})
        const {country, city, street, building} = address;
        let {cardNum, expDate, holderName} = cardDetails;
        expDate = expDate.split('/')
        const config = {headers: {"Authorization": `Token ${localStorage.token}`}};
        axios.post('/api/make-payment/', {
            ids,
            deviceFingerprintingId,
            amount,
            country,
            city,
            street,
            building,
            cardNum,
            holderName,
            expMonth: expDate[0],
            expYear: '20' + expDate[1]
        }, config).then(res => {
            console.log('PAYMENT RESPONSE: ', res.data)
            if (res.data.status === 'COMPLETED') {
                dispatch({type: 'PURCHASED', payload: res.data.RefNum})
                callback()
                setTimeout(() => alert("Payment Status: " + res.data.status), 300)
            } else {
                errCallback()
                alert("Payment Status: " + res.data.status)
            }

        }).catch(err => {
            errCallback()
            alert('An error has occurred: ', err.response.data)
            console.log('PAYMENT ERROR1: ', err)
            console.log('PAYMENT ERROR2: ', err.response)
            console.log('PAYMENT ERROR3: ', err.response.data)
        })

    }
}

// export function makePayment(ids, paymentToken, amount, address, callback) {
//     return async function (dispatch) {
//         console.log('WILL MAKE PAYMENT')
//         dispatch({type: 'SAVE_ADDRESS', payload: address})
//         const {country, city, street, building} = address;
//         const config = {headers: {"Authorization": `Token ${localStorage.token}`}};
//         axios.post('/api/make-payment/', {
//             ids,
//             paymentToken,
//             amount,
//             country,
//             city,
//             street,
//             building
//         }, config).then(res => {
//             console.log('PAYMENT RESPONSE: ', res.data)
//             dispatch({type: 'PURCHASED', payload: res.data.RefNum})
//             callback()
//             setTimeout(() => alert("Payment: " + res.data.status), 300)
//         }).catch(err => {
//             console.log('PAYMENT ERROR1: ', err)
//             console.log('PAYMENT ERROR2: ', err.response)
//             console.log('PAYMENT ERROR3: ', err.response.data)
//         })
//
//     }
// }

export function fetchPurchases() {
    return async function (dispatch) {
        const config = {headers: {"Authorization": `Token ${localStorage.token}`}};
        const res = await axios.get('/api/fetch-purchases/', config)
        console.log('FETCH PURCHASES RESPONSE: ', res.data)
        dispatch({type: 'FETCH_PURCHASES', payload: res.data})
    }
}

export function search(q, callback) {
    return async function (dispatch) {
        const res = await axios.get(`/api/search/?q=${q}`)
        console.log('SEARCH RESPONSE: ', res.data)
        dispatch({type: 'SEARCH', payload: {items: res.data, q}})
        callback()
    }
}

export function logout(callback) {
    return async function (dispatch) {
        const config = {headers: {"Authorization": `Token ${localStorage.token}`}};
        axios.post('/api/auth/logout/', {}, config).then(async () => {
            console.log('LOGGED OUT SUCCESSFULLY!')
            await callback()
            dispatch({type: 'LOGOUT'})
            setTimeout(() => alert('LOGGED OUT!'), 300)
        }).catch(async () => {
            console.log('LOGGED OUT SUCCESSFULLY!')
            await callback()
            dispatch({type: 'LOGOUT'})
            setTimeout(() => alert('LOGGED OUT!'), 300)
        })
    }
}

export function sort(param) {
    return function (dispatch) {
        dispatch({type: 'SORT', payload: param})
    }
}