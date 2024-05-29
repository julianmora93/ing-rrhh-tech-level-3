export enum AlertSnackbarTypeEnumEntity {
    INFO = 0,
    WARNING = 1,
    SUCCESSFUL = 2,
    ERROR = 3
}

export interface AlertSnackbarDataEntity {
    dialogType: AlertSnackbarTypeEnumEntity,
    informationText: string,
    buttonText: string
}