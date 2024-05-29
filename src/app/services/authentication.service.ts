import { Injectable } from '@angular/core';
import {AppUser} from "../model/user.model";
import {UUID} from "angular2-uuid";
import {Observable, of, throwError} from "rxjs";
import { User } from '../model/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  usernameActuel:string='';
  users : AppUser[]=[];
  authenticatedUser : AppUser | undefined;
  constructor(private http: HttpClient) {
    
  this.getAllUsers().subscribe((uszes)=>
  {
    this.users=uszes;
  })
  }

  public getAllUsers(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>('http://localhost:9090/api/v1/users');
  }
  public login(username : string , password:string):Observable<AppUser>{
    let appUser = this.users.find(u=> u.username==username );
    if(!appUser)return  throwError(()=>Error("User not found"));

    if(appUser.password != password){
      return  throwError(()=>Error("Bad credentials"));
    }
    return of(appUser);
  }

  public authenticateUser(appUser : AppUser):Observable<boolean>{
     this.authenticatedUser =appUser;
     localStorage.setItem("authUser",JSON.stringify({username:appUser.username, roles:appUser.roles,jwt:"JWT_TOKEN"}))
    return of(true);
  }

  public hasRole(role : string):boolean{
    return  this.authenticatedUser!.roles.includes(role);
  }

  public isAuthenticated(){
    return this.authenticatedUser!=undefined;
  }

   logout() : Observable<boolean>{
     this.authenticatedUser=undefined;
     localStorage.removeItem("authUser");
     return of(true);
  }
}
