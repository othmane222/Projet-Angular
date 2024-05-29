import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";


@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        RouterLink,
        RouterOutlet
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(public authService : AuthenticationService, private router : Router,private route: ActivatedRoute) {
  }
  usernameActuel:string|undefined;
ngOnInit(): void {
  this.usernameActuel = this.authService.usernameActuel;

  
}
  handleLogout() {
    this.authService.logout().subscribe({
      next:(data)=>{
        this.router.navigateByUrl("/login");
      }
    });
  }

}
