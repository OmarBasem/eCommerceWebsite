import _ from 'lodash'

export default function (state = {user: null}, action) {
    switch (action.type) {

        case 'FETCH_ITEMS':
            return {...state, [action.payload.category]: {..._.mapKeys(action.payload.items, 'id')}}

        default:
            return state;
    }

}