import { Injectable, inject, OnDestroy } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, } from '@angular/fire/auth';
import { Form } from '../models/form';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private auth$: Auth = inject(Auth)
  authStateSubscription!: Subscription;
  authState$ = authState(this.auth$)

  isloggedInGurd: boolean = false

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor( 
    private toastr: ToastrService,
    private router: Router
    ) { }

  async register({ email, password}: Form){
  
    const user = createUserWithEmailAndPassword(this.auth$, email, password)
    .then(() => {
      this.router.navigateByUrl('/', {replaceUrl: true})
      this.toastr.success("You register successfully")
    })
    .catch(() => {
      this.toastr.warning("Registeration failed..!Please try again!")
      return null
    })
    return user
  }

  loadUser(){
    this.authStateSubscription = this.authState$.subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user))
    })    
  }


  async login({email, password}: Form){

      const user = signInWithEmailAndPassword(this.auth$, email, password)
      .then(() => {
        this.toastr.success("Login successfully..!")
        this.loadUser()
        this.isloggedInGurd = true
        this.loggedIn.next(true)
        this.router.navigateByUrl('/', {replaceUrl: true})
      })
      .catch(() => {
        this.toastr.warning("Login Failed...!")
        return null
      })
      return user

  }

  logout() {
    return signOut(this.auth$).then(() => {
      this.toastr.success("User Logged Out Successfully...!")
      localStorage.removeItem("user")
      this.loggedIn.next(false)
      this.isloggedInGurd = false
      this.router.navigateByUrl('/login', {replaceUrl: true})
    })
  }

  isLoggedIn(){
    return this.loggedIn.asObservable()
  }

  ngOnDestroy(): void {
    this.authStateSubscription.unsubscribe()
  }
}
