import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { Error404Component } from './components/error404/error404.component';
import { AuthGuard } from './guards/auth.guard';
import { EmployeeListComponent } from './components/employees/employee-list.component';
import { EmployeeComponent } from './components/employees/employee.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/layout/header.component';
import { NavigatorComponent } from './components/layout/navigator.component';
import { FooterComponent } from './components/layout/footer.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        realm: 'demo',
        url: 'http://localhost:8080',
        clientId: 'spring-boot-angular-keycloak'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    Error404Component,
    EmployeeListComponent,
    EmployeeComponent,
    HeaderComponent,
    NavigatorComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    KeycloakAngularModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
