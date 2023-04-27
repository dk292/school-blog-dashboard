import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isloggedIn$!: Observable<boolean>
  email!: string
  constructor(
    private authService: AuthService
  ){
    
  }


  ngOnInit(): void {

    this.authService.userEmail.asObservable().subscribe(val => {
      this.email = val
    })
    this.isloggedIn$ = this.authService.isLoggedIn();
  }


  logout(){
    this.authService.logout()
    location.reload()
  }
}
