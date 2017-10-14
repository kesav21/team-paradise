import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { DatabaseService } from '../database-service/database.service';

import { AngularFirestoreCollection } from 'angularfire2/firestore';

import { Officer, Editor, User } from '../models'

@Injectable()
export class AuthService {

	user: User;

	OfficerBoard: AngularFirestoreCollection<Officer>;

	Editors: Editor[] = [{
		Name: 'Kesav Kadalazhi',
		Email: 'kkadalazhi2@gmail.com'
	}, {
		Name: 'Kesav Kadalazhi',
		Email: 'kkadalazhi1@pvlearners.net'
	}];

	constructor(private af: AngularFireAuth, private db: DatabaseService) {
		this.OfficerBoard = db.getOfficerBoardFirestore();

		this.getUser();
	}

	checkUser(email: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.OfficerBoard.valueChanges().subscribe((Officers: Officer[]) => {
				for(let i: number = 0;i < Officers.length;i++) {
					if (Officers[i].Email === email) {
						resolve();
						return;
					}
				}
				for(let i: number = 0;i < this.Editors.length;i++) {
					if (this.Editors[i].Email === email) {
						resolve();
						return;
					}
				}
				reject();
			});
		});
	}

	login(): void {
		this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
			.then((credential: firebase.auth.UserCredential) => {
				this.checkUser(credential.user.email)
					.then(() => console.log('Logged in as ' + credential.user.email))
					.catch(() => {
						this.logout();
						console.log('Not logged in.')
					});
			});
	}

	logout(): void {
		this.af.auth.signOut();
	}

	getUser() {
		this.af.authState.subscribe((authData: firebase.User) => {
			if (authData) {
				this.user = {
					email: authData.email,
					name: authData.displayName,
					photoURL: authData.photoURL
				};
			} else {
				this.user = null;
			}
		});
	}

}
