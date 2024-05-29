import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RootPage } from '../../1.view/1.1.pages/root.page/root.page';
import { LocalAuth } from '../../2.repository/2.2.local/local.auth';

export const authGuard: CanActivateFn = (_route, _state) => {
    const _rootPage = inject(RootPage);
    const _router = inject(Router);
    const _localAuth = inject(LocalAuth)
    
    _rootPage.isLogged = _localAuth.getIsAuthenticated();
    
    if(_localAuth.getIsAuthenticated()){
        return true;
    }

    _router.navigate(['/login']);
    
    return false;
};