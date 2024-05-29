import { Injectable } from "@angular/core";
import { NetworkingBase } from "../2.0.common/networking.base";
import { ContractNetworkingAccount, ContractNetworkingAccountOutput } from "../2.1.contract/contract.networking.account";
import { LocalAuth } from "../2.2.local/local.auth";
import { UtilMessages } from "../../3.transversal/3.1.util/util.labels";
import { AlertSnackbarTypeEnumEntity } from "../../3.transversal/3.0.entity/alert.snackbar.entity";

@Injectable({
    providedIn: 'root'
})
export class NetworkingAccount extends NetworkingBase implements ContractNetworkingAccount {

    loginOutput?: ContractNetworkingAccountOutput;

    constructor(private _localAuthentication: LocalAuth){ 
        super();
    }

    login(email: string, password: string): void {
        this._httpClient.post<any>(
            this._apiEndpoint.authenticationEndpoint(),
            `{"Email":"${email}","Password":"${password}"}`
        ).subscribe({
            next: (response: any) => {
                console.log('LOGIN => ', response);
                try{
                    if(response !== null && response.Status){
                        this._localAuthentication.setToken("abcdefghijk");
                        this._localAuthentication.setDataUser(email, response.Data.Name);
                        this.loginOutput?.loginOutputSuccessful(response.Data.Name);
                    }else{
                        this.loginOutput?.loginOutputFailure(UtilMessages.webServiceError, AlertSnackbarTypeEnumEntity.ERROR);
                    }
                }catch(_ : any){
                    this.loginOutput?.loginOutputFailure(UtilMessages.webServiceError, AlertSnackbarTypeEnumEntity.ERROR);
                }
            }, error: (_value: any) => {
                this.loginOutput?.loginOutputFailure(UtilMessages.webServiceError, AlertSnackbarTypeEnumEntity.ERROR);   
            }
        });
    }

}