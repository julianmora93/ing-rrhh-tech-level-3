import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RootPage } from '../root.page/root.page';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LocalAuth } from '../../../2.repository/2.2.local/local.auth';
import { NetworkingAccount } from '../../../2.repository/2.3.networking/networking.account';
import { ContractNetworkingAccountOutput } from '../../../2.repository/2.1.contract/contract.networking.account';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AlertSnackbarComponent } from '../../1.0.component/alert.snackbar.component/alert.snackbar.component';
import { UtilDefaultAlertSnackbarDuration } from '../../../3.transversal/3.1.util/util.constant';
import { AlertSnackbarTypeEnumEntity } from '../../../3.transversal/3.0.entity/alert.snackbar.entity';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    standalone: true,
    imports: [
        FormsModule, 
        ReactiveFormsModule,
        MatFormFieldModule, 
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        RouterModule,
        RootPage,
        MatSnackBarModule,
        MatCheckboxModule,
        MatTooltipModule
    ],
    templateUrl: './login.page.html',
    styleUrl: './login.page.scss'
})
export default class LoginPage implements ContractNetworkingAccountOutput {

    private _rootPage: RootPage;
    private _snackBar: MatSnackBar = inject(MatSnackBar);
    hidePassword: boolean = true;

    loginForm: FormGroup = this._formBuilder.group({
        // user: new FormControl('', Validators.required),
        // password: new FormControl('', Validators.required)
        user: new FormControl('ingeniansoftware_test_001@yopmail.com', Validators.required),
        password: new FormControl('Password123.*1', Validators.required)
    });

    constructor(
        @Inject(RootPage) _rootPageInject: RootPage,
        private _spinner: NgxSpinnerService,
        private _formBuilder: FormBuilder,
        private _route: ActivatedRoute,
        private _router: Router,
        private _localAuth: LocalAuth,
        private _networkingAccount: NetworkingAccount
    ){
        this._rootPage = _rootPageInject;
        this._rootPage.isLogged = this._localAuth.getIsAuthenticated();

        this._networkingAccount.loginOutput = this;
        if(this._localAuth.getIsAuthenticated()){
            const returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
            this._router.navigateByUrl(returnUrl);
        }
    }

    onLogin(){
        this.loginForm.markAllAsTouched();
        if(this.loginForm.valid){
            this._spinner.show();
            this._networkingAccount.login(
                this.loginForm.value.user,
                this.loginForm.value.password
            );
        }else{
            this._snackBar.openFromComponent(AlertSnackbarComponent, {
                duration: UtilDefaultAlertSnackbarDuration,
                data: {
                    buttonText: 'OK',
                    dialogType: AlertSnackbarTypeEnumEntity.ERROR,
                    informationText: 'Debe ingresar los datos para iniciar sesión.'
                }
            });
        }
    }

    loginOutputSuccessful(): void {
        this._rootPage.isLogged = true;
        this._spinner.hide();
        const returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
        this._router.navigateByUrl(returnUrl);
    }
    
    loginOutputFailure(): void {
        this._rootPage.isLogged = false;
        this._spinner.hide();
        this._snackBar.openFromComponent(AlertSnackbarComponent, {
            duration: UtilDefaultAlertSnackbarDuration,
            data: {
                buttonText: 'OK',
                dialogType: AlertSnackbarTypeEnumEntity.ERROR,
                informationText: 'Usuario o contraseña incorrectta.'
            }
        });
    }
}