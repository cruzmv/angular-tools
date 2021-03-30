import { Component, OnInit } from '@angular/core';
import { LoginAuth } from './login/login.auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css']
})
export class GoogleComponent implements OnInit {
  items: Observable<any[]>;
  constructor(public auth: LoginAuth,
              firestore: AngularFirestore) {
    this.items = firestore.collection('users').valueChanges();
  }

  ngOnInit(): void {
  }

}
