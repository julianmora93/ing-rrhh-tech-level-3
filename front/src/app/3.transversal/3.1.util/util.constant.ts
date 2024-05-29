import { PaginationEntity, PaginationQueryEntity } from "../3.0.entity/pagination.entity"

export const UtilLocalStorageKeys = {
    authenticationKey: 'AuthenticationData',
    authenticationUserKey: 'AuthenticationData_User',
    authenticationNameKey: 'AuthenticationData_Name'
}

export const UtilDefaultPagination: PaginationQueryEntity = {
    page: 1,
    pageSize: 15
}

export const UtilDefaultPageOptions: PaginationEntity = {
    length: 0,
    pageIndex: 0,
    pageSize: 15,
    pageSizeOptions: [5, 10, 15, 20],
    showFirstLastButtons: true
}

export const UtilDefaultAlertSnackbarDuration: number = 3000;

export const UtilDefaultFormatDate: string = 'yyyy-MM-dd hh:mm a';