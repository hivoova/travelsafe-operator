import { Injectable } from '@angular/core';
import { Store , Action} from '@ngrx/store';
import { AppState } from '../reducers';

@Injectable()
export class StoreUtil {
    constructor(
        private _store: Store<AppState>
    ){}

    select(key: string) {
        return this._store.select(state => state[key])
    }

    dispatch(action: Action) {
        this._store.dispatch(action)
        console.log(action)
    } 

}