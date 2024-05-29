import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppProviderRepository } from '../0.2.provider/app.provider.repository';
import { RootPage } from '../../1.view/1.1.pages/root.page/root.page';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { UTIL_DATE_FORMAT } from '../../3.transversal/3.1.util/util.date.format';
import { AlertSnackbarComponent } from '../../1.view/1.0.component/alert.snackbar.component/alert.snackbar.component';
import { CustomHttpInterceptor } from '../../2.repository/2.0.common/custom.http.interceptor';
import CollisionsPage from '../../1.view/1.1.pages/collision.page/collision.page';

export const appConfig: ApplicationConfig = {
    providers: [{ 
            provide: MAT_DATE_LOCALE, 
            useValue: 'es-ES' 
        },
        {
            provide: MAT_DATE_FORMATS,
            useValue: UTIL_DATE_FORMAT
        },
        provideRouter(routes), 
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),  
        {
            provide:HTTP_INTERCEPTORS,
            useClass: CustomHttpInterceptor,
            multi:true
        },
        NgxSpinnerModule,
        AppProviderRepository,
        RootPage,
        CollisionsPage,
        AlertSnackbarComponent
    ]
};