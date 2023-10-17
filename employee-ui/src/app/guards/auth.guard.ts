import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { KeycloakAuthService } from "../services/keycloak.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private keycloakService : KeycloakAuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return new Observable<boolean>(observer => {
            this.keycloakService.isUserLoggedIn()
            .then(res => {
                if(!res) {
                    this.keycloakService.openLoginPage();
                }

                observer.next(res);
                observer.complete();
            });
        });
    }
}