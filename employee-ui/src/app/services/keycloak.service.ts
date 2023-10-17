import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloakAuthService {

  constructor(
    private readonly keycloak : KeycloakService
  ) { }

  public isUserLoggedIn() : Promise<boolean> {
    return this.keycloak.isLoggedIn();
  }

  public getUserProfile() : Promise<KeycloakProfile> {
    return this.keycloak.loadUserProfile();
  }

  public openLoginPage() : void {
    this.keycloak.login();
  }

  public logout() : void {
    this.keycloak.logout();
  }
}
