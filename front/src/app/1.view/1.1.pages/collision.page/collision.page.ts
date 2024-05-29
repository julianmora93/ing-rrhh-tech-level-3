import { Component, WritableSignal, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { RootPage } from '../root.page/root.page';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AlertSnackbarComponent } from '../../1.0.component/alert.snackbar.component/alert.snackbar.component';
import { UtilDefaultAlertSnackbarDuration } from '../../../3.transversal/3.1.util/util.constant';
import { AlertSnackbarTypeEnumEntity } from '../../../3.transversal/3.0.entity/alert.snackbar.entity';
import { ContractNetworkingCollisionOutput } from '../../../2.repository/2.1.contract/contract.networking.collision';
import { NetworkingCollision } from '../../../2.repository/2.3.networking/networking.collision';

@Component({
    selector: 'products-page-list',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatTooltipModule,
        MatIconModule,
        MatSelectModule,
        MatNativeDateModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        MatSnackBarModule,
        AlertSnackbarComponent,
        MatProgressBarModule
    ],
    templateUrl: './collision.page.html',
    styleUrl: './collision.page.scss'
})
export default class CollisionsPage implements ContractNetworkingCollisionOutput {

    showProgressBar: WritableSignal<boolean> = signal(false);
    responseText: WritableSignal<string> = signal('');

    private _rootPage: RootPage = inject(RootPage);
    private _formBuilder: FormBuilder = inject(FormBuilder);
    private _dialog: MatDialog = inject(MatDialog);
    private _snackBar: MatSnackBar = inject(MatSnackBar);
    private _regex: RegExp = /^[RL]*$/;
    private _networkingCollision: NetworkingCollision = inject(NetworkingCollision);

    form: FormGroup = this._formBuilder.group({
        sequence: new FormControl('', [Validators.required, Validators.pattern(this._regex)])
    });

    constructor(){
        this._networkingCollision.executionOutput = this;
        this._rootPage.rootTitle = 'Collisions';
        this._rootPage.setMenuById(2);
    }

    onExecute(){
        this.form.markAllAsTouched();
        if(this.form.valid){
            this.showProgressBar.set(true);
            this._networkingCollision.execution(this.form.value.sequence);
        }
    }

    onInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        const transformedValue = input.value.toUpperCase().replace(/[^RL]/g, '');
        this.form.get('sequence')?.setValue(transformedValue, { emitEvent: false });
    }

    executionSuccessful(data: string): void {
        this.showProgressBar.set(false);
        this.responseText.set(`Collisions: ${data}`);
    }
    executionFailure(message: string, type: AlertSnackbarTypeEnumEntity): void {
        this.showProgressBar.set(false);
        this.responseText.set('');
        this._snackBar.openFromComponent(AlertSnackbarComponent, {
            duration: UtilDefaultAlertSnackbarDuration,
            data: {
                buttonText: 'OK',
                dialogType: type,
                informationText: message
            }
        });
    }

}