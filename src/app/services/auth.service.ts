import { Injectable, inject, OnDestroy } from '@angular/core';
import { 
  Auth, 
  authState, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut
} from '@angular/fire/auth';
import { Form } from '../models/form';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private _storage$: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  private auth$: Auth = inject(Auth)
  authStateSubscription!: Subscription;
  authState$ = authState(this.auth$)
  userEmail: BehaviorSubject<string> = new BehaviorSubject<string>("")
  isloggedInGurd: boolean = false

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor( 
    private toastr: ToastrService,
    private router: Router
    ) { 
      this._storage$.next(localStorage)
      window.addEventListener('storage', event => {
        if(event.storageArea == localStorage){
          this._storage$.next(localStorage)
        }
      })
    }
  
    getItem(key: string): any {
      return localStorage.getItem(key);
    }
  
    setItem(key: string, value: any): void {
      localStorage.setItem(key, value);
      this._storage$.next(localStorage);
    }
  
    removeItem(key: string): void {
      localStorage.removeItem(key);
      this._storage$.next(localStorage);
    }

  async register({ email, password}: Form){
  
    const user = await createUserWithEmailAndPassword(this.auth$, email, password)
    .then((ref) => {
      if(ref.user?.email)
      {
        this.userEmail.next(ref.user.email)
        this.router.navigateByUrl('/', {replaceUrl: true})
        this.isloggedInGurd = true
        this.loggedIn.next(true)
        this.toastr.success("You register successfully")
      }
      
    })
    .catch(() => {
      this.toastr.warning("Registeration failed..!Please try again!")
      return null
    })
    return user
  }

  loadUser(){
    this.authStateSubscription =  this.authState$.subscribe(user => {
      this.setItem('storage', user?.email)
    })    
  }

 


  async login({email, password}: Form){

    const user = await signInWithEmailAndPassword(this.auth$, email, password)
    .then((ref) => {
      if(ref.user?.email)
      {
        this.userEmail.next(ref.user.email)
        this.toastr.success("Login successfully..!")
        this.loadUser()
        this.isloggedInGurd = true
        this.loggedIn.next(true)
        this.router.navigateByUrl('/', {replaceUrl: true})
      }
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
      this.loggedIn.next(false)
      this.isloggedInGurd = false
      this.removeItem('storage')
      this.router.navigateByUrl('/login', {replaceUrl: true})
    })
  }

  isLoggedIn(){
    return this.loggedIn.asObservable()
  }

  ngOnDestroy(): void {
  }
}
