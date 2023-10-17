import { Component, OnInit } from '@angular/core';
import { KeycloakAuthService } from './services/keycloak.service';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  currentUser! : KeycloakProfile;

  constructor(
    private keycloakService : KeycloakAuthService
  ) {}
  
  ngOnInit(): void {
    this.initialize();
  }

  handleLogout() : void {
    this.keycloakService.logout();
  }

  initialize() : void {
    this.keycloakService.getUserProfile()
    .then(res => {
      this.currentUser = res;
    })
    .catch(err => {
      console.log("Error fetching the current user.");
    });
  }
}
