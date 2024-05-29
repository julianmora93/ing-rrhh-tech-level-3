import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
    MAT_SNACK_BAR_DATA,
    MatSnackBarAction,
    MatSnackBarActions,
    MatSnackBarLabel,
    MatSnackBarRef,
  } from '@angular/material/snack-bar';
import { AlertSnackbarDataEntity, AlertSnackbarTypeEnumEntity } from "../../../3.transversal/3.0.entity/alert.snackbar.entity";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'alert-snackbar-component',
    templateUrl: './alert.snackbar.component.html',
    styleUrl: './alert.snackbar.component.scss',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule, 
        MatSnackBarLabel, 
        MatSnackBarActions, 
        MatSnackBarAction,
        MatTooltipModule,
        MatIconModule
    ]
})
export class AlertSnackbarComponent {

    iconMessage: string = 'cancel';

    data: AlertSnackbarDataEntity = inject(MAT_SNACK_BAR_DATA);

    snackBarRef = inject(MatSnackBarRef);

    constructor(){
        if(this.data.dialogType === AlertSnackbarTypeEnumEntity.ERROR){
            this.iconMessage = 'cancel';
        }else if(this.data.dialogType === AlertSnackbarTypeEnumEntity.SUCCESSFUL){
            this.iconMessage = 'check_circle';
        }
    }

}