import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from "@angular/router";

export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
}

@Injectable({
    providedIn: 'root'
})

export class LoginAuth {
    userData: any;
    constructor(public auth: AngularFireAuth,
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth,
        public router: Router) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                const userStorage: any = localStorage.getItem('user');
                JSON.parse(userStorage);
            } else {
                localStorage.setItem('user', '{}');
                const userStorage: any = localStorage.getItem('user');
                JSON.parse(userStorage);
            }
        })
    }

    login() {
        this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(result => {
            this.SetUserData(result.user);
        }).catch((error) => {
            window.alert(error)
        })
    }

    logout() {
        this.auth.signOut();
    }

    isLoggedIn(): boolean {
        const userStorage: any = localStorage.getItem('user');
        if(userStorage.length>2){
            const user = JSON.parse(userStorage);
            return (user !== null && user.emailVerified !== false) ? true : false;
        } else {
            return false;
        }
        
    }

    SetUserData(user: any) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
        }
        return userRef.set(userData, {
            merge: true
        })
    }

}
