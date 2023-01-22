import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EletricGo';
  constructor(private authService: SocialAuthService, private loginService: LoginService) { }
  user:any;
  loggedIn:any;
  role:any;
  ngOnInit() {
    
    
    if(this.authService)
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.role= 'warehouseManager';
      console.log(this.role);
      //this.loginService.loginSSO(user.email,user.authToken);
      console.log(this.user.name);
    });
    if(this.user == null){
    localStorage.setItem('user',"yasu");
    console.log(localStorage.getItem('user'));
    }
  }
}
