import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class LoaderUtil {

    loader : any
    constructor(private _loading: LoadingController) {
        this.loader = null
    }

    loading(content: string) {
        var preContent = 
        `<div class="align-center">
            <img src="assets/images/preloading.gif" class="loadingImg" />
        </div>
        <div class="margin-top-5">
            <span>${content}</span>
        </div>` 
        this.loader = this._loading.create({
            spinner: 'hide',
            content: preContent
        });
        this.loader.present();
    }

    loaded() {
        if(this.loader != null) this.loader.dismiss()
    }
}