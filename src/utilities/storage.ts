import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';


@Injectable()
export class StorageUtil {
    constructor(
        private _storage: Storage
    ){}

    setToStorage(key:string , value: any) {
        return this._storage.set(key , value)
    }

    getFromStorage(key:string) {
        return this._storage.get(key)
    }

    removeFromStorage(key: string) {
        return this._storage.remove(key)
    }

    removeAll(){
        return this._storage.clear()
    }

}