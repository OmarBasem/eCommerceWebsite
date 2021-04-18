const initialState = {user: null, cart: {}, address: {}, purchased: [], categories: [], sortParam: 'PHL'}
export default function (state = initialState, action) {
    switch (action.type) {

        case 'USER_LOADED':
            return {...state, user: action.payload}

        case 'ADD_TO_CART':
            return {...state, cart: {...state.cart, [action.payload.id]: action.payload}}

        case 'PURCHASED':
            let purchased = []
            const cart = Object.values(state.cart)
            for (let i=0; i<cart.length; i++) {
                purchased.push({item: cart[i], refNum: action.payload})
            }
            return {...state, purchased: state.purchased.concat(purchased), cart: {}}

        case 'FETCH_PURCHASES':
            return {...state, purchased: Object.values(action.payload)}

        case 'REMOVE_FROM_CART':
            delete state.cart[action.payload]
            return {...state}

        case 'SAVE_ADDRESS':
            return {...state, address: action.payload}

        case 'FETCH_CATEGORIES':
            return {...state, categories: action.payload}

        case 'SORT':
            return {...state, sortParam: action.payload}


        case 'LOGOUT':
            return {...state, user: null, cart: {}, address: {}, purchased: [], sortParam: 'PHL'}


        default:
            return state;
    }

}