import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userEmail!: string
  isloggedIn$!: Observable<boolean>

  constructor(
    private authService: AuthService
  ){}

  ngOnInit(): void {
    // console.log(JSON.parse(localStorage.getItem("user")))
    const user = localStorage.getItem("user");
    if(user){
      this.userEmail = JSON.parse(user).email
    }

    this.isloggedIn$ = this.authService.isLoggedIn();
  }

  logout(){
    this.authService.logout()
  }
}
