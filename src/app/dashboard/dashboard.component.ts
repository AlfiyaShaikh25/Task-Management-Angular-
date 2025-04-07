import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../service/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink,NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent {

  isProfileOpen = false; 
  isDarkMode: boolean = false;

  toggleProfile() {
    this.isProfileOpen = !this.isProfileOpen; 
  }

userName:string|null=""
email:string|null=""
profileimg: string = 'assets/user-profile.png'; // fallback image
userId:string|null=""


  constructor (private route:ActivatedRoute,private userService:UserService){}

  ngOnInit():void{

    
    const userData = localStorage.getItem('loggedInUser');
   if (userData) {
    const user = JSON.parse(userData);
    this.userId = user.id;
    this.userName = user.username;
    this.email = user.email;
    this.profileimg = user.profileImage || this.profileimg; // fallback if not set
  } else {
    console.warn('No logged-in user found');
  }

  }


  

}
