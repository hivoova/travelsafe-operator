import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Action } from '@ngrx/store';

@Injectable()
export class UserAction {
    static ADD_USER_TO_STORAGE = 'ADD_USER_TO_STORAGE';
    addUserToStorage(user: User) : Action {
        return {
            type: UserAction.ADD_USER_TO_STORAGE,
            payload: user
        }
    }
}