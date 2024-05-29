import { Injectable } from "@angular/core";
import { NetworkingBase } from "../2.0.common/networking.base";
import { UtilMessages } from "../../3.transversal/3.1.util/util.labels";
import { AlertSnackbarTypeEnumEntity } from "../../3.transversal/3.0.entity/alert.snackbar.entity";
import { ContractNetworkingCollision, ContractNetworkingCollisionOutput } from "../2.1.contract/contract.networking.collision";

@Injectable({
    providedIn: 'root'
})
export class NetworkingCollision extends NetworkingBase implements ContractNetworkingCollision {

    executionOutput?: ContractNetworkingCollisionOutput | undefined;

    constructor(){
        super();
    }
    
    execution(sequence: string): void {
        this._httpClient.post<any>(
            this._apiEndpoint.collision(),
            `"${sequence}"`
        ).subscribe({
            next: (response: any) => {
                try{
                    if(response !== null && response.Status){
                        this.executionOutput?.executionSuccessful(response.Data);
                    }else{
                        this.executionOutput?.executionFailure(UtilMessages.webServiceError, AlertSnackbarTypeEnumEntity.ERROR);
                    }
                }catch(_ : any){
                    this.executionOutput?.executionFailure(UtilMessages.webServiceError, AlertSnackbarTypeEnumEntity.ERROR);
                }
            }, error: (_value: any) => {
                this.executionOutput?.executionFailure(UtilMessages.webServiceError, AlertSnackbarTypeEnumEntity.ERROR);
            }
        });
    }
    
}