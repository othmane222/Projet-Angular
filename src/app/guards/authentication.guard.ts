import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {state} from "@angular/animations";
import {promises} from "node:dns";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state:RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean |UrlTree{
   let authenticated = this.authService.isAuthenticated();
   if(authenticated == false){
     this.router.navigateByUrl("/login");
     return false;
   }else {
     return true;
   }

  }
}
