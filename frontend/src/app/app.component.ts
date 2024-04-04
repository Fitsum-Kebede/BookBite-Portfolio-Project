import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

// connect the component file  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
// class for appcomponent
export class AppComponent {
  isCollapsed = false;

  // declare library
  constructor(public _router: Router, private authService: AuthService) {}
  
  logout() {
    this.authService.logout();
    this._router.navigate(["/login"]);
  }
}
