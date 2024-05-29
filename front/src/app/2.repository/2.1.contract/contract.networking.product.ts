// import { AlertSnackbarTypeEnumEntity } from "../../3.transversal/3.0.entity/alert.snackbar.entity";
// import { ProductsEntity } from "../../3.transversal/3.0.entity/products.entity";

// export interface ContractNetworkingProduct {
//     getListOutput?: ContractNetworkingProductOutput;
//     getList(page: number, pageSize: number, status?: number | null | undefined): void;

//     updateStatusOutput?: ContractNetworkingUpdateProductStatusOutput;
//     updateStatus(id: number, status: number): void;

//     registryOutput?: ContractNetworkingRegistryProductOutput;
//     registry(elaborationType: number, name: string, status: number): void;
// }

// export interface ContractNetworkingProductOutput {
//     getListProductsSuccessful(data: ProductsEntity[], total: number): void;
//     getListProductsFailure(message: string, type: AlertSnackbarTypeEnumEntity): void;
// }

// export interface ContractNetworkingUpdateProductStatusOutput {
//     updateProductstatusSuccessful(id: number): void;
//     updateProductstatusFailure(message: string, type: AlertSnackbarTypeEnumEntity): void;
// }

// export interface ContractNetworkingRegistryProductOutput {
//     registryProductSuccessful(id: number): void;
//     registryProductFailure(message: string, type: AlertSnackbarTypeEnumEntity): void;
// }