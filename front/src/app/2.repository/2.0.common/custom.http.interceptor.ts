import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { LocalAuth } from '../2.2.local/local.auth';
import { DefaultWsResponse } from '../../3.transversal/3.0.entity/default.webservice.response.entity';
import { UtilMessages } from '../../3.transversal/3.1.util/util.labels';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CustomHttpInterceptor implements HttpInterceptor {
    
    constructor(
        private _localAuthentication: LocalAuth
    ){ }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.showLog('CustomHttpInterceptor[001] IsAuthenticated => ', this._localAuthentication.getIsAuthenticated());
        let headers: any = {
            'Content-Type': 'application/json'
        };
        if(!request.url.includes("auth") && this._localAuthentication.getIsAuthenticated()){
            headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this._localAuthentication.getToken()}`
            };
            this.showLog('CustomHttpInterceptor[002]: => headers', headers);
            
        }
        request = request.clone({
            setHeaders: (headers),
        });
        return next.handle(request).pipe(
            timeout(180000),
            map(event => {
                this.showLog('CustomHttpInterceptor[003]: event =>', event);
                if(event instanceof HttpResponse){
                    try{
                        this.showLog('CustomHttpInterceptor[004]: event => ', event.body);
                        let objReturn: DefaultWsResponse<any> = event.body;
                        return event.clone({
                            body: objReturn
                        });
                    } catch(ex){
                        this.showLog('CustomHttpInterceptor[005]: ex => ', ex);
                        return event.clone({
                            body: {
                                Status: false,
                                StatusCode: '0x0a',
                                DescriptionStatus: 'Ocurrió un error al decodificar la información',
                                Data: null
                            }
                        });
                    }
                }else{
                    return event;
                }
            }),
            catchError((errorResponse: HttpErrorResponse) => {
                let message = 'Ocurrió un error al decodificar la información';
                if(errorResponse.status == 401){
                    this.showLog('CustomHttpInterceptor[006]: ex => ', errorResponse);
                    message = UtilMessages.webServiceTokenError;
                    this._localAuthentication.setToken('');


                    // this._httpClient.post<DefaultWebserviceResponseEntity<AuthenticationEntity>>(
                    //     this._apiEndpoint.authenticationEndpoint(), 
                    //     `{"email":"","password":""}`
                    // ).subscribe({
                    //     next: (value: DefaultWebserviceResponseEntity<AuthenticationEntity>) => {
                    //         console.log('===========================================================================================');
                    //         console.log('value::', value);
                    //     },
                    //     error: (error: any) => {
                    //         console.log('===========================================================================================');
                    //         console.log('error::', error);
                    //     }
                    // });

                    // var dataNewLogin = this._httpClient.post<DefaultWebserviceResponseEntity<AuthenticationEntity>>(
                    //     this._apiEndpoint.authenticationEndpoint(), 
                    //     `{"email":"","password":""}`
                    // ).subscribe({
                    //     next: (value: DefaultWebserviceResponseEntity<AuthenticationEntity>) => {
                    //         console.log('===========================================================================================');
                    //         console.log('value::', value);
                    //     },
                    //     error: (error: any) => {
                    //         console.log('===========================================================================================');
                    //         console.log('error::', error);
                    //     }
                    // });

                }
                return throwError(() => {
                    return {
                        Status: false,
                        StatusCode: `0x${errorResponse.status}`,
                        DescriptionStatus: message,
                        Data: errorResponse
                    }
                });
            })
        );
    }

    private showLog(message: string, data: any){
        if(environment.showLog){
            console.log('-----------------------------------------------------------------------');
            console.log('message', message)
            console.log('data', data);
        }
    }

}