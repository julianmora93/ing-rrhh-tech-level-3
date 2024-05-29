import { AlertSnackbarTypeEnumEntity } from "../../3.transversal/3.0.entity/alert.snackbar.entity";

export interface ContractNetworkingAccount {
    loginOutput?: ContractNetworkingAccountOutput;
    login(email: string, password: string): void;
}

export interface ContractNetworkingAccountOutput {
    loginOutputSuccessful(name: string): void;
    loginOutputFailure(message: string, type: AlertSnackbarTypeEnumEntity): void;
}