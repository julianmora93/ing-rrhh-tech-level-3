export interface ProductsEntity {
    id: number;
    typeElaboration: string;
    name: string;
    status: string;
    creationDate: Date;
    updateDate?: Date | null;
    creationUser: "Admin";
}

export interface ProductsContextualMenuEntity extends ProductsEntity {
    disabledDefective: boolean;
    disabledCheckOutProcess: boolean;
}