import { UserAction } from '../actions/user';
import { User } from '../models/user';

export interface UserState {
    user : User
}

const InitState : UserState = {
    user : {}
}

export function UserReducer (state = InitState , action ) {
    switch(action.type) {
        case UserAction.ADD_USER_TO_STORAGE :
            return Object.assign({} , state , { user: action.payload })
        default :
            return state
    }
}