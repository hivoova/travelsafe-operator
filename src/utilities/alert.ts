import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

interface PromptInput {
    name: string;
    placeholder: string;
}

interface ConfirmButton {
    text: string;
    handler: Function;
}

@Injectable()
export class AlertUtil {
    constructor(
        private _alert: AlertController
    ){}

    basicAlert(title: string, subTitle: string) {
        let alert = this._alert.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
        });
        alert.present();
    }

    promptAlert(title:string , message: string , inputs: Array<PromptInput> ) {
        return new Promise((resolve , reject)=>{
            var prompt = this._alert.create({
                title: title,
                message: message,
                inputs: inputs,
                buttons: [
                    {
                        text: 'Cancel',
                        handler: data => {
                            console.log('Cancel clicked');
                            resolve({cancel: true})
                        }
                    },
                    {
                        text: 'Save',
                        handler: data => {
                            console.log('Saved clicked');
                            resolve(data)
                        }
                    }
                ]
            });
            prompt.present();
        })  
    }

    confirmAlert(title: string , message: string ) {
        return new Promise((resolve , reject) => {
            let confirm = this._alert.create({
                title: title,
                message: message,
                buttons: [
                    {
                        text: 'Cancel' ,
                        handler: ()=> {
                            resolve({confirm:false,cancel:true})
                        }
                    },
                    {
                        text: 'Confirm',
                        handler: () => {
                            resolve({confirm:true,cancel:false})
                        }
                    }
                ]
            });
            confirm.present();
        })
    }
}