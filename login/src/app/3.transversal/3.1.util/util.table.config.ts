import { MatPaginator } from "@angular/material/paginator";
import { PaginationEntity } from "../3.0.entity/pagination.entity";

export abstract class UtilTableConfig {
    public static configPaginator(paginator: MatPaginator, options: PaginationEntity, totalRows: number){
        paginator.length = totalRows;
        paginator.pageIndex = options.pageIndex;
        paginator.pageSize = options.pageSize;
        paginator.pageSizeOptions = options.pageSizeOptions;
        paginator.showFirstLastButtons = options.showFirstLastButtons;
        
        paginator._intl.itemsPerPageLabel = 'Por página';
        paginator._intl.nextPageLabel = 'Siguiente página';
        paginator._intl.previousPageLabel = 'Página anterior';
        paginator._intl.firstPageLabel = 'Primera página';
        paginator._intl.lastPageLabel = 'Última página';
    }
}