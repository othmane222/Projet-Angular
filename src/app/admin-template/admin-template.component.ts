import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-template',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent implements OnInit{
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
