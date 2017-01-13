import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular';

@Injectable()
export class ModalUtil {

    modal: any

    constructor(
        private modalCtrl: ModalController 
    ){
        this.modal = null
    }

    create(page: any , params: Object = {}){
        this.modal = this.modalCtrl.create(page , params)
    }

    present(){
        if(this.modal !== null) this.modal.present()
    }

    dismiss() {
        if(this.modal !== null) this.modal.dismiss()
    }

    onDismiss(fn) {
        if(this.modal !== null && typeof fn === 'function') this.modal.onDidDismiss(fn) 
    }
}