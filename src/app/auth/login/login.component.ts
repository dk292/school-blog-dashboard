import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Form } from 'src/app/models/form';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formValue!: Form

  onSubmit(formValue: Form){
    this.formValue = formValue    
  }
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ){}

  async register(value: Form) {
    const user = await this.authService.register(value)
  }

  async login(value: Form){
    const user = await this.authService.login(value)
  }
  
}
