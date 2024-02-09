import {  HttpClient  } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone : true,
  imports:[FormsModule,HttpClientModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

    loginobj : login;

    constructor(private http:HttpClient,private router: Router){
      this.loginobj = new login();
    }

    onLogin(){
      this.http.post('http://localhost:7000/login',this.loginobj).subscribe((res:any) => {
        console.log(res);
        if(res.token){
          alert("Login Success");
          this.router.navigateByUrl('/layout');
        }
        else{
          alert("Invalid Username or Password");
        }
      });
    }
}
export class login{
  email : string;
  password: string;
  constructor(){
    this.email = '';
    this.password = '';
  }
}


