export default function (state = {items: [], q: ''}, action) {
    switch (action.type) {

        case 'SEARCH':
            return {items: action.payload.items, q: action.payload.q};

        case 'SEARCH_EMPTY':
            return {items: [], q: ''}


        default:
            return state;
    }

}