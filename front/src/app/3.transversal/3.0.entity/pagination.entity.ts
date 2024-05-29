export interface PaginationEntity {
    length: number;
    pageIndex: number;
    pageSize: number;
    pageSizeOptions: number[];
    showFirstLastButtons: boolean;
}

export interface PaginationQueryEntity {
    page: number;
    pageSize: number;
}