import { Component, OnInit } from '@angular/core';
import { LoginAuth } from './login.auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: LoginAuth) {}

  ngOnInit(): void {
  }

}
