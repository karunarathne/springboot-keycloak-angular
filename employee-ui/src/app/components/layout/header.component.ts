import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input()
  user? : KeycloakProfile;

  @Output()
  logout : EventEmitter<any> = new EventEmitter();

  logoutUser() : void {
    this.logout.emit();
  }
}
