import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService,
        private _router: Router) {
    }
    canActivate() {
        if (this.authService.isLoggedIn())
          return true;
        // imperative navigation
        this._router.navigate(['login'])
        return false;
    }
}