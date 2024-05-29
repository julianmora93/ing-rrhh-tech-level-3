import { AlertSnackbarTypeEnumEntity } from "../../3.transversal/3.0.entity/alert.snackbar.entity";

export interface ContractNetworkingCollision {
    executionOutput?: ContractNetworkingCollisionOutput;
    execution(sequence: string): void;
}

export interface ContractNetworkingCollisionOutput {
    executionSuccessful(data: string): void;
    executionFailure(message: string, type: AlertSnackbarTypeEnumEntity): void;
}